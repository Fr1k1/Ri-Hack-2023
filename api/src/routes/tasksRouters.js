import express from 'express'
import * as tasksController from '../controllers/tasksController.js'
import * as authController from '../controllers/authController.js'

const router = express.Router()

router.get('/within/:distance/center/:latlng', tasksController.getTasksWithin)

router.route('/')
  .get(tasksController.getAllTasks)
  .post(
    authController.authenticate,
    tasksController.createTask
  )

router.route('/:id')
  .get(tasksController.getTask)
  .patch(
    authController.authenticate,
    tasksController.updateTask
  )
  .delete(
    authController.authenticate,
    tasksController.deleteTask
  )

router.route('/:taskId/users/:userId')
  .post(tasksController.addUserToTask)

export default router
