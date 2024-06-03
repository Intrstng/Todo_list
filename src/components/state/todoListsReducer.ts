import {FilterValuesType, TodolistType} from '../../AppWithRedux';
import {v1} from 'uuid';
export const todolistID_1 = v1();
export const todolistID_2 = v1();

const initialTodoListState: TodolistType[] = [
    {id: todolistID_1, title: 'What to do', filter: 'all'},
    {id: todolistID_2, title: 'What to ask', filter: 'all'}
]

export const todoListsReducer = (state: TodolistType[] = initialTodoListState, action: TodoListsReducer): TodolistType[] => {
    const {type, payload} = action;
    switch (type) {
        case 'CHANGE-FILTER': {
            const {todolistID, value} = payload;
            return state.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl);
        }
        case 'ADD-TODOLIST': {
            const {newTodolistID, newTitle} = payload;
            const newTodoList: TodolistType = {id: newTodolistID, title: newTitle, filter: 'all'};
            return [...state, newTodoList];
        }
        case 'REMOVE-TODOLIST': {
            const {todolistID} = payload;
            return state.filter(tl => tl.id !== todolistID);
        }
        case 'UPDATE-TODOLIST': {
            const {todolistID, newTitle} = payload;
            return state.map(tl => tl.id === todolistID ? {...tl, title: newTitle} : tl);
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


export type AddTodolistAC = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistID: v1(),
            newTitle
        }
    } as const
}


export type RemoveTodolistAC = ReturnType<typeof removeTodolistAC>

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