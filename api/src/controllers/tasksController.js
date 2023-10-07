import { exec } from '../db.js'
import { AppError } from '../errors/appError.js'
import * as factory from './handlerFactory.js'

export const getAllTasks = factory.getAll('task')
export const getTask = factory.getOne('task')

export const createTask = async (req, res, next) => {
  const task = extractTaskFromReqBody(req)

  if (!task.statusId || !task.difficultyId || !task.name ||
    !task.reward || !task.description || !task.groupSize ||
    !task.lat || !task.lng || !task.startDate || !task.endDate) {
    return next(new AppError('Missing task info.', 422))
  }

  const { lastID } = await exec('INSERT INTO task(name, reward, description, group_size, lat, lng, start_date, end_date, status_id, difficulty_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [task.name, task.reward, task.description, task.groupSize, task.lat, task.lng, task.startDate, task.endDate, task.statusId, task.difficultyId])
  const newTask = (await exec('SELECT * FROM task WHERE id = ?;', [lastID]))[0]

  res.status(201).json({
    status: 'success',
    data: { task: newTask }
  })
}

// export const addUserToTask = (req, res, next) => {
//     const { taskId, userId } = req.params

//     const tasks = await exec("SELECT * FROM ")


// }

export const updateTask = (req, res, next) => {
  const task = extractTaskFromReqBody(req)

}

export const deleteTask = async (req, res, next) => {
  const { id } = req.params

  const fetchedTask = await exec('SELECT * FROM task WHERE id = ?;', [id])

  if (fetchedTask.length === 0)
    return next(new AppError('Task doesn\'t exist.', 404))

  await exec('DELETE FROM task WHERE id = ?;', [id])

  res.status(200).json({
    status: 'success',
    data: { deletedTask: fetchedTask }
  })
}
export const getTasksWithin = (req, res) => 1

const extractTaskFromReqBody = (req) => {
  const { statusId, difficultyId, name, reward, description, groupSize, lat, lng, startDate, endDate } = req.body
  return { statusId, difficultyId, name, reward, description, groupSize, lat, lng, startDate, endDate }
}
