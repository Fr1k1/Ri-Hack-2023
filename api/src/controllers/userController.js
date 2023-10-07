import { catchAsync } from '../utils/catchAsync.js'

export const getCurrentUser = catchAsync(async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { user: req.user }
  })
})
