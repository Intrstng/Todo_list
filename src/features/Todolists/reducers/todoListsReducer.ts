import { v1 } from 'uuid';
import { DataType, todolistApi } from '../../../api/todolist-api';
import { AppThunkDispatch } from '../../../app/store';


export const todolistID_1 = v1();
export const todolistID_2 = v1();
export const ADD_TODOLIST = 'ADD-TODOLIST';
export const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
export const SET_TODOLISTS = 'SET-TODOLISTS';
const CHANGE_FILTER = 'CHANGE-FILTER';
const UPDATE_TODOLIST = 'UPDATE-TODOLIST';

const initialTodoListState: TodolistDomainType[] = [
    // {id: todolistID_1, title: 'What to do', filter: 'all', addedDate: new Date(), order: 0},
    // {id: todolistID_2, title: 'What to ask', filter: 'all', addedDate: new Date(), order: 0}
]

export const todoListsReducer = (state: TodolistDomainType[] = initialTodoListState, action: TodoListsReducer): TodolistDomainType[] => {
    const {type, payload} = action;
    switch (type) {
        case ADD_TODOLIST: {
            const {newTodolistData} = payload;
            const newTodoList: TodolistDomainType = {
                ...newTodolistData,
                filter: 'all',
            };
            return [...state, newTodoList];
        }
        case REMOVE_TODOLIST: {
            const {todolistID} = payload;
            return state.filter(tl => tl.id !== todolistID);
        }
        case SET_TODOLISTS: {
            const {todolists} = payload;
            return todolists.map(tl => ({ ...tl, filter: 'all' }));
        }
        case CHANGE_FILTER: {
            const {todolistID, value} = payload;
            return state.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl);
        }
        case UPDATE_TODOLIST: {
            const {todolistID, newTitle} = payload;
            return state.map(tl => tl.id === todolistID ? {...tl, title: newTitle} : tl);
        }
        default: return state;
    }
}

// ACTION CREATORS
export const changeFilterAC = (todolistID: string, value: FilterValuesType) => ({
    type: CHANGE_FILTER,
    payload: {
        todolistID,
        value
    }
}) as const

export const addTodolistAC = (newTodolistData: TodolistType) => ({
    type: ADD_TODOLIST,
    payload: {
        newTodolistData
    }
}) as const

export const removeTodolistAC = (todolistID: string) => ({
    type: REMOVE_TODOLIST,
    payload: {
        todolistID
    }
}) as const

export const updateTodolistAC = (todolistID: string, newTitle: string) => ({
    type: UPDATE_TODOLIST,
    payload: {
        todolistID,
        newTitle
    }
}) as const

export const setTodoListsAC = (todolists: TodolistType[]) => ({
    type: SET_TODOLISTS,
    payload: {
        todolists
    }
}) as const

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

export const addTodoListTC = (title: string) => (dispatch: AppThunkDispatch) => {
    const newTodoListData: DataType = {
        title
    }
    todolistApi.createTodolist(newTodoListData)
        .then(response => {
            dispatch(addTodolistAC(response.data.data.item));
        });
};

export const changeTodoListTitleTC = (todolistID: string, title: string) => (dispatch: AppThunkDispatch) => {
    const newTodoListData: DataType = {
        title
    }
    todolistApi.updateTodolistTitle(todolistID, newTodoListData)
        .then(response => {
            dispatch(updateTodolistAC(todolistID, title));
        });
};

// TYPES
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

type TodoListsReducer = ChangeFilterAC
                        | AddTodolistAC
                        | RemoveTodolistAC
                        | UpdateTodolistAC
                        | SetTodoListsAC


type ChangeFilterAC = ReturnType<typeof changeFilterAC>
export type AddTodolistAC = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAC = ReturnType<typeof removeTodolistAC>
type UpdateTodolistAC = ReturnType<typeof updateTodolistAC>
export type SetTodoListsAC = ReturnType<typeof setTodoListsAC>