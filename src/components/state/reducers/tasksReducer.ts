import {v1} from 'uuid';
import {todolistID_1, todolistID_2, AddTodolistAC, RemoveTodolistAC} from '../reducers';
import { TaskPriorities, TaskStatuses, TaskType } from '../../../api/task-api';


export type TasksType = {
    [key: string]: TaskType[]
}

const tasksInit: TasksType = {
    [todolistID_1]: [
        { id: v1(), title: "HTML&CSS", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low, startDate: new Date(), deadline: new Date(), todoListId: todolistID_1, order: 0, addedDate: new Date()},
        { id: v1(), title: "JS", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low, startDate: new Date(), deadline: new Date(), todoListId: todolistID_1, order: 0, addedDate: new Date()},
        { id: v1(), title: "ReactJS", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low, startDate: new Date(), deadline: new Date(), todoListId: todolistID_1, order: 0, addedDate: new Date()}
    ],
    [todolistID_2]: [
        { id: v1(), title: "Age", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low, startDate: new Date(), deadline: new Date(), todoListId: todolistID_2, order: 0, addedDate: new Date()},
        { id: v1(), title: "Weight", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low, startDate: new Date(), deadline: new Date(), todoListId: todolistID_2, order: 0, addedDate: new Date()},
        { id: v1(), title: "Height", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low, startDate: new Date(), deadline: new Date(), todoListId: todolistID_2, order: 0, addedDate: new Date()}
    ]
}

export const tasksReducer = (state: TasksType = tasksInit, action: TasksReducer): TasksType => {
    const {type, payload} = action;
    switch (type) {
        case 'ADD-TASK': {
            const {todolistID, title} = payload;
            const newTask: TaskType = {
                id: v1(),
                title: title,
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: new Date(),
                deadline: new Date(),
                todoListId: todolistID,
                order: 0,
                addedDate: new Date(),
            }
            return {...state, [todolistID]: [newTask, ...state[todolistID]]};
        }
        case 'REMOVE-TASK': {
            const {todolistID, taskID} = payload;
            return {...state, [todolistID]: state[todolistID].filter(t => t.id !== taskID)};
        }
        case 'CHANGE-STATUS': {
            const {todolistID, taskID, status} = payload;
            return {...state, [todolistID]: state[todolistID].map(t => t.id === taskID ? {...t, status} : t)};
        }
        case 'UPDATE-TASK': {
            const {todolistID, taskID, newTitle} = payload;
            return {...state, [todolistID]: state[todolistID].map(t => t.id === taskID ? {...t, title: newTitle} : t)};
        }
        case 'ADD-TODOLIST': {
            const {newTodolistID} = payload;
            return {...state, [newTodolistID]: []};
        }
        case 'REMOVE-TODOLIST': {
            const {todolistID} = payload;
            // const copyState = {...state};
            // delete copyState[todolistID];
            // return copyState;

            const {[todolistID]: [], ...rest} = state;
            return rest;
        }
        default: return state;
    }
}


type TasksReducer = AddTaskAC | RemoveTask | ChangeStatus | UpdateTaskAC | AddTodolistAC | RemoveTodolistAC

type AddTaskAC = ReturnType<typeof addTaskAC>

export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID,
            title
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

export const changeStatusAC = (todolistID: string, taskID: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            todolistID,
            taskID,
            status
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