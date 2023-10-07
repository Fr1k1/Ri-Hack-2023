import multer from 'multer'
import sharp from 'sharp'
import { catchAsync } from '../utils/catchAsync.js'
import { AppError } from '../errors/appError.js'
import { exec } from '../db.js'

const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new AppError('Only images are allowed.'), false)
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
})

export const uploadUserPhoto = upload.single('photo')

export const resizeUserPhoto = catchAsync(async (req, res, next) => {
  const { file } = req
  if (!file) return next()

  file.filename = `user-${req.user.id}.jpg`

  await sharp(file.buffer)
    .resize(500, 500)
    .toFormat('jpg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${file.filename}`)

  next()
})

export const updateCurrentUser = catchAsync(async (req, res) => {
  const { firstName, lastName } = req.body
  const { file } = req
  const fileName = file?.filename ? file.filename : null

  await exec('UPDATE user SET first_name = ?, last_name = ?, photo = ? WHERE id = ?', [firstName, lastName, fileName, req.user.id])
  const user = (await exec('SELECT * FROM user WHERE id = ?', [req.user.id]))[0]

  res.status(200).json({
    status: 'success',
    data: { user }
  })
})

export const getCurrentUser = catchAsync(async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { user: req.user }
  })
})
