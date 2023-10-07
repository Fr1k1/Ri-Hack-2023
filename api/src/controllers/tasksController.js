import * as factory from './handlerFactory.js'

export const getAllTasks = factory.getAll('tasks')
export const getTask = factory.getOne('task')

export const createTask = (req, res) => 1
export const updateTask = (req, res) => 1
export const deleteTask = (req, res) => 1
export const getTasksWithin = (req, res) => 1
