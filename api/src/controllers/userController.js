import { catchAsync } from '../utils/catchAsync.js'
import * as factory from './handlerFactory.js'

export const getCurrentUser = (req, res, next) => {
  req.params.id = req.user.email
  next()
}

export const getUser = factory.getOne('user')
