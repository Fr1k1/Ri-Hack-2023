import { exec } from '../db.js'
import { AppError } from '../errors/appError.js'
import * as factory from './handlerFactory.js'
import { catchAsync } from '../utils/catchAsync.js'

export const getAllTasks = catchAsync(async (req, res, next) => {
    let startDate
    let endDate

    if (req.query.startDate) {
        startDate = getYearDateEntry(new Date(req.query.startDate))
        if (startDate == null)
            return next(new AppError("Invalid date."))
    }

    if (req.query.endDate) {
        endDate = getYearDateEntry(new Date(req.query.endDate))
        console.log(endDate)
        if (endDate == null)
            return next(new AppError("Invalid date."))
    }

    let documents

    if (startDate && !endDate) {
        documents = await exec("SELECT * FROM task WHERE ? >= strftime('%Y-%m-%d', start_date)", [startDate])
    } else if (!startDate && endDate) {
        documents = await exec("SELECT * FROM task WHERE ? <= strftime('%Y-%m-%d', end_date)", [endDate])
    } else if (startDate && endDate) {
        documents = await exec("SELECT * FROM task WHERE strftime('%Y-%m-%d', start_date) >= ? AND strftime('%Y-%m-%d', end_date) <= ?;", [startDate, endDate])
    } else {
        documents = await exec(`SELECT * FROM task`)
    }

    res.status(200).json({
        status: 'success',
        results: documents.length,
        data: { tasks: documents }
    })
})

function isValidDate(date) {
    if (Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date)) {
        return true;
    }
    return false;
}

function getYearDateEntry(date, next) {
    if (!isValidDate(date)) {
        return null
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`
}

export const getTask = factory.getOne('task')

export const createTask = catchAsync(async (req, res, next) => {
    const task = extractTaskFromReq(req)

    if (!task.statusId || !task.difficultyId || !task.name ||
        !task.reward || !task.description || !task.groupSize ||
        !task.lat || !task.lng || !task.startDate || !task.endDate) {
        return next(new AppError('Missing task info.', 422))
    }

    const { lastID } = await exec('INSERT INTO task(name, reward, description, group_size, lat, lng, start_date, end_date, status_id, difficulty_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [task.name, task.reward, task.description, task.groupSize, task.lat, task.lng, task.startDate, task.endDate, task.statusId, task.difficultyId, req.user.id])
    const newTask = (await exec('SELECT * FROM task WHERE id = ?', [lastID]))[0]

    res.status(201).json({
        status: 'success',
        data: { task: newTask }
    })
})

export const addUserToTask = catchAsync(async (req, res, next) => {
    const { taskId, userId } = req.params

    const fetchedTask = (await exec('SELECT * FROM task WHERE id = ?', [taskId]))[0]
    const userTasks = await exec('SELECT * FROM task_user WHERE task_id = ?', [taskId])

    if (!taskId || !userId) {
        return next(new AppError('Insufficient parameters.', 422))
    }

    if (userId == fetchedTask.user_id) {
        return next(new AppError('User who added task can\'t work in it.'))
    }

    if (userTasks.map(el => el.user_id.toString()).includes(userId)) {
        return next(new AppError('User already added.'))
    }

    if (userTasks.length < fetchedTask.group_size) {
        await exec('INSERT INTO task_user(user_id, task_id) VALUES (?, ?)', [userId, taskId])
        userTasks.length++

        if (userTasks.length == fetchedTask.group_size)
            await exec('UPDATE task SET status_id = ? WHERE id = ?', [2, taskId])
    }

    if (userTasks.length - fetchedTask.group_size == 0) {
        return next(new AppError('List of users for this task is full.'))
    }

    res.status(200).json({
        status: 'success'
    })
})

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
  WHERE id = ?`

    const { lastID } = await exec(query, [task.difficultyId, task.name, task.reward, task.description, task.lat, task.lng, task.startDate, task.endDate, task.id])
    const updatedTask = (await exec('SELECT * FROM task WHERE id = ?', [lastID]))[0]

    res.status(200).json({
        status: 'success',
        data: { task: updatedTask }
    })
})

export const deleteTask = async (req, res, next) => {
    const { id } = req.params

    const fetchedTask = await exec('SELECT * FROM task WHERE id = ?', [id])

    if (fetchedTask.length === 0) {
        return next(new AppError('Task doesn\'t exist.', 404))
    }

    await exec('DELETE FROM task WHERE id = ?', [id])

    res.status(200).json({
        status: 'success',
        data: { task: fetchedTask }
    })
}

export const getTasksWithin = catchAsync(async (req, res, next) => {
    const { distance, latlng } = req.params
    const [lat, lng] = latlng.split(',')

    if (!lat || !lng) {
        return next(new AppError('Please provide latitude and longitude in the lat,lng format.'))
    }

    const radius = 6378.1 // Earth radius in kilometers (use 3959 for miles)
    const latRad = lat * (Math.PI / 180)
    const lngRad = lng * (Math.PI / 180)

    const query = `SELECT id, name, lat, lng, (
      ${radius} * acos(
        cos(${latRad}) *
        cos(lat * (PI() / 180)) *
        cos(lng * (PI() / 180) - ${lngRad}) +
        sin(${latRad}) *
        sin(lat * (PI() / 180))
      )
    ) AS distance
    FROM task
    WHERE (
      ${radius} * acos(
        cos(${latRad}) *
        cos(lat * (PI() / 180)) *
        cos(lng * (PI() / 180) - ${lngRad}) +
        sin(${latRad}) *
        sin(lat * (PI() / 180))
      )
    ) <= ${distance}
  `

    console.info({ query })
    const tasks = await exec(query, [])

    res.status(200).json({
        status: 'success',
        results: tasks.length,
        data: { tasks }
    })
})

const extractTaskFromReq = (req) => {
    const { id } = req.params
    const { statusId, difficultyId, name, reward, description, groupSize, lat, lng, startDate, endDate } = req.body

    return { id, statusId, difficultyId, name, reward, description, groupSize, lat, lng, startDate, endDate }
}
