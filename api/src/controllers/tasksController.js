import * as factory from './handlerFactory.js'

export const getAllTasks = factory.getAll('tasks')
export const getTask = factory.getOne('task')

export const createTask = () => 1
export const updateTask = () => 1
export const deleteTask = () => 1
export const getTasksWithin = () => 1
