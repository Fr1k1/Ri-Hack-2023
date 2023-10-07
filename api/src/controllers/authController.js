import ms from 'ms'
import jwt from 'jsonwebtoken'
import { catchAsync } from '../utils/catchAsync.js'
import { AppError } from '../errors/appError.js'
import { Email } from '../utils/email.js'

const signJwt = ({ email }) => new Promise((resolve, reject) => {
  jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIMEOUT,
    issuer: process.env.JWT_ISSUER
  }, (err, token) => err ? reject(err) : resolve(token))
})

const verifyJwt = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.JWT_SECRET, {
    issuer: process.env.JWT_ISSUER
  }, (err, decoded) => err ? reject(err) : resolve(decoded))
})

const createSendJwt = async (user, req, res, statusCode = 200) => {
  const token = await signJwt(user)

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + ms(process.env.JWT_TIMEOUT)),
    secure: req.secure,
    httpOnly: true
  })

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user }
  })
}

export const signUp = catchAsync(async (req, res) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body

  // TODO: insert user, hash password, check password
  const user = { firstName, lastName, email, password, passwordConfirm }

  await new Email(user, `${req.protocol}://${req.get('host')}/me`).sendWelcome()

  await createSendJwt(user, req, res, 201)
})

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new AppError('Please provide email and password.'))
  }

  // TODO: find user
  // const user = await UserModel.findOne({ email }).select('+password')

  // TODO: check password
  // if (!user || !(await user.checkPassword(password))) {
  // return next(new AppError(`Incorrect email or password.`, 401))
  //

  await createSendJwt(user, req, res)
})

export const logout = (req, res) => {
  res.clearCookie('jwt')
  res.status(200).json({
    status: 'success',
    data: null
  })
}

export const authenticate = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers

  if (authorization && authorization.startsWith('Bearer')) {
    const token = authorization.split(' ')[1]

    if (token) {
      return await authenticateToken(token, req, next)
    }
  } else if (req.cookies.jwt) {
    return await authenticateToken(req.cookies.jwt, req, next)
  }

  next(new AppError('Unauthorized access.', 401))
})

const authenticateToken = async (token, req, next) => {
  const decoded = await verifyJwt(token)
  const email = decoded.email

  // TODO: find current user
  // const currentUser = await UserModel.findById(decoded.id)
  const currentUser = { email }

  if (currentUser) {
    req.user = currentUser
    return next()
  }

  return next(new AppError('The user no longer exists.', 401))
}
