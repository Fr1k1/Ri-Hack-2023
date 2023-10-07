import { catchAsync } from '../utils/catchAsync.js'
import { AppError } from '../errors/appError.js'

export const getOne = (resource) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params

    const document = { name: 'Hello world' }

    if (!document) {
      return next(new AppError(`No ${resource} found with id '${id}'.`, 404))
    }

    res.status(200).json({
      status: 'success',
      data: { [`${resource}`]: document }
    })
  })

export const getAll = (resource) =>
  catchAsync(async (req, res) => {

    const documents = ['Task1']

    res.status(200).json({
      status: 'success',
      results: documents.length,
      data: { [`${resource}`]: documents }
    })
  })
