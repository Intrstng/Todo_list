import {TasksType, TaskType} from '../../../AppWithRedux';
import {v1} from 'uuid';
import {todolistID_1, todolistID_2, AddTodolistAC, RemoveTodolistAC} from '../reducers';


const tasksInit: TasksType = {
    [todolistID_1]: [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false }
    ],
    [todolistID_2]: [
        { id: v1(), title: "Age", isDone: true },
        { id: v1(), title: "Weight", isDone: true },
        { id: v1(), title: "Height", isDone: false }
    ]
}

export const tasksReducer = (state: TasksType = tasksInit, action: TasksReducer): TasksType => {
    const {type, payload} = action;
    switch (type) {
        case 'ADD-TASK': {
            const {todolistID, value} = payload;
            const newTask: TaskType = {
                id: v1(),
                title: value,
                isDone: false
            }
            return {...state, [todolistID]: [newTask, ...state[todolistID]]};
        }
        case 'REMOVE-TASK': {
            const {todolistID, taskID} = payload;
            return {...state, [todolistID]: state[todolistID].filter(t => t.id !== taskID)};
        }
        case 'CHANGE-STATUS': {
            const {todolistID, taskID, isDone} = payload;
            return {...state, [todolistID]: state[todolistID].map(t => t.id === taskID ? {...t, isDone} : t)};
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

export const addTaskAC = (todolistID: string, value: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID,
            value
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