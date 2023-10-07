import { exec } from '../db.js'
import { AppError } from '../errors/appError.js'
import * as factory from './handlerFactory.js'
import { catchAsync } from '../utils/catchAsync.js'

export const getAllTasks = factory.getAll('task')
export const getTask = factory.getOne('task')

export const createTask = catchAsync(async (req, res, next) => {
  const task = extractTaskFromReq(req)

  if (!task.statusId || !task.difficultyId || !task.name ||
    !task.reward || !task.description || !task.groupSize ||
    !task.lat || !task.lng || !task.startDate || !task.endDate) {
    return next(new AppError('Missing task info.', 422))
  }

  const { lastID } = await exec('INSERT INTO task(name, reward, description, group_size, lat, lng, start_date, end_date, status_id, difficulty_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [task.name, task.reward, task.description, task.groupSize, task.lat, task.lng, task.startDate, task.endDate, task.statusId, task.difficultyId, req.user.id])
  const newTask = (await exec('SELECT * FROM task WHERE id = ?;', [lastID]))[0]

  res.status(201).json({
    status: 'success',
    data: { task: newTask }
  })
})

/*export const addUserToTask = catchAsync(async (req, res, next) => {
  const { taskId, userId } = req.params

  const fetchedTask = await exec("SELECT * FROM task WHERE id = ?;", [taskId])

  const userTasks = await exec("SELECT * FROM task_user WHERE task_id = ? AND user_id = ?;", [taskId, userId])

  if (!taskId || !userId) {
    return next(new AppError('Insufficient parameters.', 422))
  }

  if (userTasks.length < fetchedTask.group_size) {
    await exec('INSERT INTO task_user(user_id, task_id) VALUES (?, ?);', [userId, taskId])
    userTasks.group_size++

    if (userTasks.length == fetchedTask.group_size)
      await exec('UPDATE task SET status = ? WHERE task_id = ?;', [2, taskId])
  }

  res.status(200).json({
    status: 'success',
    data: { groupSize: fetchedTask.group_size, remainingSlots: fetchedTask.group_size - userTasks.length }
  })
})*/

export const updateTask = catchAsync(async (req, res) => {
  const task = extractTaskFromReq(req)

  const query = `UPDATE task 
  SET 
    difficulty_id = COALESCE(?, difficulty_id),
    name = COALESCE(?, name),
    reward = COALESCE(?, reward),
    description = COALESCE(?, description),
    lat = COALESCE(?, lat),
    lng = COALESCE(?, lng),
    start_date = COALESCE(?, start_date),
    end_date = COALESCE(?, end_date)
  WHERE id = ?`;

  const { lastID } = await exec(query, [task.difficultyId, task.name, task.reward, task.description, task.lat, task.lng, task.startDate, task.endDate, task.id])
  const updatedTask = (await exec('SELECT * FROM task WHERE id = ?;', [lastID]))[0]

  res.status(200).json({
    status: 'success',
    data: { task: updatedTask }
  })
})

export const deleteTask = async (req, res, next) => {
  const { id } = req.params

  const fetchedTask = await exec('SELECT * FROM task WHERE id = ?;', [id])

  if (fetchedTask.length === 0) {
    return next(new AppError('Task doesn\'t exist.', 404))
  }

  await exec('DELETE FROM task WHERE id = ?;', [id])

  res.status(200).json({
    status: 'success',
    data: { task: fetchedTask }
  })
}

// TODO: implement
export const getTasksWithin = (req, res) => 1

const extractTaskFromReq = (req) => {
  const { id } = req.params
  const { statusId, difficultyId, name, reward, description, groupSize, lat, lng, startDate, endDate } = req.body

  return { id, statusId, difficultyId, name, reward, description, groupSize, lat, lng, startDate, endDate }
}
