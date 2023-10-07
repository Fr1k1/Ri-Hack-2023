import { exec } from '../db.js'
import { AppError } from '../errors/appError.js'
import * as factory from './handlerFactory.js'

export const getAllTasks = factory.getAll('task')
export const getTask = factory.getOne('task')

export const createTask = async (req, res, next) => {
    const { statusId, difficultyId, name, reward, description, groupSize, lat, lng, startDate, endDate } = req.body

    if (!statusId || !difficultyId || !name || !reward || !description || !groupSize ||
        !lat || !lng || !startDate || !endDate)
        return next(new AppError('Insufficient parameters.', 422))

    const { lastID } = await exec('INSERT INTO task(name, reward, description, group_size, lat, lng, start_date, end_date, status_id, difficulty_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [name, reward, description, groupSize, lat, lng, startDate, endDate, statusId, difficultyId])
    const newTask = await exec("SELECT * FROM task WHERE id = ?;", [lastID])

    res.status(201).json({
        status: 'success',
        data: { newTask: newTask }
    })
}

// export const addUserToTask = (req, res, next) => {
//     const { taskId, userId } = req.params

//     const tasks = await exec("SELECT * FROM ")


// }

// // export const updateTask = (req, res, next) => {
// //     const { difficultyId, name, reward, description, groupSize, lat, lng, startDate, endDate } = req.body


// //     const numberOfGroupSize = 

// // }

export const deleteTask = async (req, res, next) => {
    const { id } = req.params

    const fetchedTask = await exec("SELECT * FROM task WHERE id = ?;", [id])

    if (fetchedTask.length == 0)
        return next(new AppError("Task doesn't exist.", 404))

    await exec("DELETE FROM task WHERE id = ?;", [id])

    res.status(200).json({
        status: 'success',
        data: { deletedTask: fetchedTask }
    })
}
export const getTasksWithin = (req, res) => 1
