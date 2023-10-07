import { catchAsync } from '../utils/catchAsync.js'
import * as factory from './handlerFactory.js'

export const getCurrentUser = (req, res, next) => {
  req.params.id = req.user.email
  next()
}

export const getUser = factory.getOne('user')

export const deleteCurrentUser = catchAsync(async (req, res) => {
  const { email } = req.user

  // TODO: disable user
  // user.isActive = false

  res.status(204).json({
    status: 'success',
    data: null
  })
})
