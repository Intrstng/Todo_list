import {v1} from 'uuid';
import { Dispatch } from 'redux';
import { DataType, ResponseTodoType, todolistApi } from '../../../api/todolist-api';
import { AppThunkDispatch } from '../store';
export const todolistID_1 = v1();
export const todolistID_2 = v1();


export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialTodoListState: TodolistDomainType[] = [
    // {id: todolistID_1, title: 'What to do', filter: 'all', addedDate: new Date(), order: 0},
    // {id: todolistID_2, title: 'What to ask', filter: 'all', addedDate: new Date(), order: 0}
]

export const todoListsReducer = (state: TodolistDomainType[] = initialTodoListState, action: TodoListsReducer): TodolistDomainType[] => {
    const {type, payload} = action;
    switch (type) {
        case 'CHANGE-FILTER': {
            const {todolistID, value} = payload;
            return state.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl);
        }
        case 'ADD-TODOLIST': {
            const {newTodolistData} = payload;
            const newTodoList: TodolistDomainType = {
                ...newTodolistData,
                filter: 'all',
            };
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
        case 'SET-TODOLISTS': {
            const {todolists} = payload;
            return todolists.map(tl => {
                return {
                    ...tl, filter: 'all'
                }
            })
        }
        default: return state;
    }
}

type TodoListsReducer = ChangeFilterAC
    | AddTodolistAC
    | RemoveTodolistAC
    | UpdateTodolistAC
    | SetTodoListsAC


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

export const addTodolistAC = (newTodolistData: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistData
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

export type SetTodoListsAC = ReturnType<typeof setTodoListsAC>

export const setTodoListsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            todolists: todolists
        }
    } as const
}

// THUNK CREATORS

export const fetchTodoListsTC = () => (dispatch: AppThunkDispatch) => {
    todolistApi.getTodolists()
        .then(response => {
            dispatch(setTodoListsAC(response.data));
        });
};

export const removeTodoListTC = (todolistID: string) => (dispatch: AppThunkDispatch) => {
    todolistApi.deleteTodolist(todolistID)
        .then(response => {
            dispatch(removeTodolistAC(todolistID));
        });
};

export const addTodoListTC = (newTitle: string) => (dispatch: AppThunkDispatch) => {
    const newTodoListData: DataType = {
        title: newTitle
    }
    todolistApi.createTodolist(newTodoListData)
        .then(response => {
            dispatch(addTodolistAC(response.data.data.item));
        });
};

export const changeTodoListTitleTC = (todolistID: string, newTitle: string) => (dispatch: AppThunkDispatch) => {
    const newTodoListData: DataType = {
        title: newTitle
    }
    todolistApi.updateTodolistTitle(todolistID, newTodoListData)
        .then(response => {
            debugger
            console.log(response.data.data)
            dispatch(updateTodolistAC(todolistID, newTitle));
        });
};