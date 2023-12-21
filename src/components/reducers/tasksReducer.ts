import {TasksType, TaskType} from '../../App';

export const tasksReducer = (state: TasksType, action: TasksReducer): TasksType => {
    switch (action.type) {
        case 'ADD-TASK': {
            return {...state, [action.payload.todolistID]: [action.payload.newTask, ...state[action.payload.todolistID]]};
        }
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(t => t.id !== action.payload.taskID)};
        }
        case 'CHANGE-STATUS': {
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.taskID ? {...t, isDone: action.payload.isDone} : t)};
        }
        case 'UPDATE-TASK': {
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.taskID ? {...t, title: action.payload.newTitle} : t)};
        }
        case 'ADD-NEW-TASKS-LIST': {
            return {...state, [action.payload.newTodolistID]: []};
        }
        default: return state
    }
}


type TasksReducer = AddTaskAC | RemoveTask | ChangeStatus | UpdateTaskAC | AddNewTasksListAC

type AddTaskAC = ReturnType<typeof addTaskAC>

export const addTaskAC = (todolistID: string, newTask: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID,
            newTask
        }
    } as const
}


type RemoveTask = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID,
            taskID
        }
    } as const
}


type ChangeStatus = ReturnType<typeof changeStatusAC>

export const changeStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            todolistID,
            taskID,
            isDone
        }
    } as const
}


type UpdateTaskAC = ReturnType<typeof updateTaskAC>

export const updateTaskAC = (todolistID: string, taskID: string, newTitle: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistID,
            taskID,
            newTitle
        }
    } as const
}


type AddNewTasksListAC = ReturnType<typeof addNewTasksListAC>

export const addNewTasksListAC = (newTodolistID: string) => {
    return {
        type: 'ADD-NEW-TASKS-LIST',
        payload: {
            newTodolistID
        }
    } as const
}