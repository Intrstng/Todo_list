import axios from 'axios';
import { Status } from '../app/reducers/appReducer';
import { ResponseType, settings } from './todolist-api';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    ...settings
})

export const taskApi = {
    getAllTasks(todoID: string) {
        return instance.get<ResponseGetTasksType>(`/todo-lists/${todoID}/tasks`)
    },
    createTask(todoID: string, data: { title: string }) {
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todoID}/tasks`, data)
    },
    updateTask(todoID: string, taskID: string, data: UpdateTaskType) {
        return instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todoID}/tasks/${taskID}`, data)
    },
    deleteTask(todoID: string, taskID: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoID}/tasks/${taskID}`)
    },
}

// TYPES
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}
export type TaskDomainType =  TaskType & {
    entityStatus: Status
}

export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: Date
    deadline: Date
}

export type ResponseGetTasksType = {
    items: TaskType[]
    totalCount?: number
    error?: string | null
}