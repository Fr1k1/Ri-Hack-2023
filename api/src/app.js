import express from 'express'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import ms from 'ms'
import cookieParser from 'cookie-parser'
import compression from 'compression'

import tasksRouter from './routes/tasksRouters.js'
import userRouter from './routes/userRoutes.js'
import { AppError } from './errors/appError.js'
import errorHandler from './errors/errorHandler.js'

const app = express()

// sets secure HTTP response headers
/*app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'script-src': ['\'self\'', 'https://unpkg.com/', 'https://js.stripe.com/'],
      'img-src': ['\'self\'', 'blob:', 'data:', 'https:'],
      'frame-src': ['\'self\'', 'https://js.stripe.com/']
    }
  }
}))*/

// sets API request limit
app.use('/api', rateLimit({
  max: process.env.REQUESTS_LIMIT,
  windowMs: ms(process.env.REQUESTS_LIMIT_WINDOW),
  message: `Too many requests, please try again in ${ms(ms(process.env.REQUESTS_LIMIT_WINDOW), { long: true })}`
}))

// parses request body
app.use(express.json({ limit: '10kb' }))

// parses cookies
app.use(cookieParser())

if (process.env.NODE_ENV === 'dev') {
  // adds HTTP request logger
  app.use(morgan('dev'))
}

// compresses text outputs
app.use(compression())

// adds resource routers
app.use('/api/v1/tasks', tasksRouter)
app.use('/api/v1/users', userRouter)

// matches unknown paths
app.all('*', (req, res, next) => {
  next(new AppError(`Not found: ${req.originalUrl}.`, 404))
})

// adds global error handler
app.use(errorHandler)

export default app
