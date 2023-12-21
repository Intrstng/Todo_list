import {FilterValuesType, TodolistType} from '../../App';
import {v1} from 'uuid';

export const todoListsReducer = (state: TodolistType[], action: TodoListsReducer): TodolistType[] => {
    switch (action.type) {
        case 'CHANGE-FILTER': {
            return state.map(tl => tl.id === action.payload.todolistID ? {...tl, filter: action.payload.value} : tl);
        }
        case 'ADD-TODOLIST': {
            return [action.payload.newTodoList, ...state];
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistID);
        }
        case 'UPDATE-TODOLIST': {
            return state.map(tl => tl.id === action.payload.todolistID ? {...tl, title: action.payload.newTitle} : tl);
        }
        default: return state;
    }
}

type TodoListsReducer = ChangeFilterAC | AddTodolistAC | RemoveTodolistAC | UpdateTodolistAC


type ChangeFilterAC = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todolistID,
            value
        }
    } as const
}


type AddTodolistAC = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (newTodoList: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodoList
        }
    } as const
}


type RemoveTodolistAC = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID
        }
    } as const
}


type UpdateTodolistAC = ReturnType<typeof updateTodolistAC>

export const updateTodolistAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'UPDATE-TODOLIST',
        payload: {
            todolistID,
            newTitle
        }
    } as const
}