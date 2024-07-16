import { v1 } from 'uuid';
import { DataType, todolistApi } from '../../../api/todolist-api';
import { AppDispatch, AppThunk, useAppDispatch, useAppSelector } from '../../../app/store';
import { AppInitialState, setAppErrorAC, setAppStatusAC, Status } from '../../../app/reducers/appReducer';
import { statusSelector } from '../../../app/selectors/appSelectors';
import { taskApi } from '../../../api/task-api';
import { addTaskAC, updateTaskAC } from './tasksReducer';
import { handleServerAppError, handleServerNetworkError } from '../../../utils/errorUtils';
import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export const todolistID_1 = v1();
export const todolistID_2 = v1();
export const ADD_TODOLIST = 'TODOLIST/ADD-TODOLIST';
export const REMOVE_TODOLIST = 'TODOLIST/REMOVE-TODOLIST';
export const SET_TODOLISTS = 'TODOLIST/SET-TODOLISTS';
export const CHANGE_TODOLIST_ENTITY_STATUS = 'TODOLIST/CHANGE-TODOLIST-ENTITY-STATUS';
const CHANGE_FILTER = 'TODOLIST/CHANGE-FILTER';
const UPDATE_TODOLIST = 'TODOLIST/UPDATE-TODOLIST';

const initialTodoListState: TodolistDomainType[] = [
    // {id: todolistID_1, title: 'What to do', filter: 'all', entityStatus: 'idle', addedDate: new Date(), order: 0},
    // {id: todolistID_2, title: 'What to ask', filter: 'all', entityStatus: 'idle', addedDate: new Date(), order: 0}
]

// export const todoListsReducer = (state: TodolistDomainType[] = initialTodoListState, action: TodoListsReducer): TodolistDomainType[] => {
//     const {type, payload} = action;
//     switch (type) {
//         case ADD_TODOLIST: {
//             const {newTodolistData} = payload;
//             const newTodoList: TodolistDomainType = {
//                 ...newTodolistData,
//                 filter: 'all',
//                 entityStatus: 'idle'
//             };
//             return [...state, newTodoList];
//         }
//         case REMOVE_TODOLIST: {
//             const {todolistID} = payload;
//             return state.filter(tl => tl.id !== todolistID);
//         }
//         case SET_TODOLISTS: {
//             const {todolists} = payload;
//             return todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
//         }
//         case CHANGE_FILTER: {
//             const {todolistID, value} = payload;
//             return state.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl);
//         }
//         case UPDATE_TODOLIST: {
//             const {todolistID, newTitle} = payload;
//             return state.map(tl => tl.id === todolistID ? {...tl, title: newTitle} : tl);
//         }
//         case CHANGE_TODOLIST_ENTITY_STATUS: {
//             const {todolistID, entityStatus} = payload;
//             return state.map(tl => tl.id === todolistID ? {...tl, entityStatus} : tl);
//         }
//         default:
//             return state;
//     }
// }

const todoListsSlice = createSlice({
    name: 'todoLists',
    initialState: [] as TodolistDomainType[],
    reducers: {
        addTodolistAC(state, action: PayloadAction<{ newTodolistData: TodolistType }>) {
            state.push({...action.payload.newTodolistData, filter: 'all', entityStatus: 'idle'});
        },
        removeTodolistAC(state, action: PayloadAction<{ todolistID: string }>) {
            const idx = state.findIndex(tl => tl.id === action.payload.todolistID);
            if (idx !== -1) {
                state.splice(idx, 1);
            }
        },
        setTodoListsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
        },
        changeFilterAC(state, action: PayloadAction<{ todolistID: string, value: FilterValuesType }>) {
            const idx = state.findIndex(tl => tl.id === action.payload.todolistID);
            if (idx !== -1) {
                state[idx].filter = action.payload.value;
            }
        },
        updateTodolistAC(state, action: PayloadAction<{ todolistID: string, newTitle: string }>) {
            const idx = state.findIndex(tl => tl.id === action.payload.todolistID);
            if (idx !== -1) {
                state[idx].title = action.payload.newTitle;
            }
        },
        changeTodoListsEntityStatusAC(state, action: PayloadAction<{ todolistID: string, entityStatus: Status }>) {
            const idx = state.findIndex(tl => tl.id === action.payload.todolistID);
            if (idx !== -1) {
                state[idx].entityStatus = action.payload.entityStatus;
            }
        }
    },
});

export const {addTodolistAC, removeTodolistAC, setTodoListsAC, changeFilterAC, updateTodolistAC, changeTodoListsEntityStatusAC} = todoListsSlice.actions;
export const todoListsReducer =  todoListsSlice.reducer;

// // ACTION CREATORS
// export const changeFilterAC = (todolistID: string, value: FilterValuesType) => ({
//     type: CHANGE_FILTER,
//     payload: {
//         todolistID,
//         value
//     }
// }) as const
//
// export const addTodolistAC = (newTodolistData: TodolistType) => ({
//     type: ADD_TODOLIST,
//     payload: {
//         newTodolistData
//     }
// }) as const
//
// export const removeTodolistAC = (todolistID: string) => ({
//     type: REMOVE_TODOLIST,
//     payload: {
//         todolistID
//     }
// }) as const
//
// export const updateTodolistAC = (todolistID: string, newTitle: string) => ({
//     type: UPDATE_TODOLIST,
//     payload: {
//         todolistID,
//         newTitle
//     }
// }) as const
//
// export const setTodoListsAC = (todolists: TodolistType[]) => ({
//     type: SET_TODOLISTS,
//     payload: {
//         todolists
//     }
// }) as const
//
// export const changeTodoListsEntityStatusAC = (todolistID: string, entityStatus: Status) => ({
//     type: CHANGE_TODOLIST_ENTITY_STATUS,
//     payload: {
//         todolistID,
//         entityStatus
//     }
// }) as const

// THUNK CREATORS
// export const fetchTodoListsTC = (): AppThunk => (dispatch) => {
//     todolistApi.getTodolists()
//         .then(response => {
//             dispatch(setTodoListsAC(response.data));
//         });
// };

export const fetchTodoListsTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistApi.getTodolists()
        .then((response) => {
            dispatch(setTodoListsAC({todolists: response.data}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(dispatch, error);
        })
};

export const removeTodoListTC = (todolistID: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    dispatch(changeTodoListsEntityStatusAC({todolistID, entityStatus: 'loading'}));
    todolistApi.deleteTodolist(todolistID)
        .then((response) => {
            if (response.data.resultCode === RESULT_CODE.SUCCEDED) { // Success
                dispatch(removeTodolistAC({todolistID}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
                // dispatch(changeTodoListsEntityStatusAC(todolistID, 'succeeded'));
            } else {
                handleServerAppError(dispatch, response.data);
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(dispatch, error);
            dispatch(changeTodoListsEntityStatusAC({todolistID, entityStatus: 'idle'})); // Avoid deleting TODO without network
        })
};

// export const addTodoListTC = (title: string): AppThunk => async (dispatch) => {
//     const newTodoListData: DataType = {
//         title
//     };
//     dispatch(setAppStatusAC('loading'));
//     const response = await todolistApi.createTodolist(newTodoListData);
//     dispatch(addTodolistAC(response.data.data.item));
//     dispatch(setAppStatusAC('succeeded'));
// };

export const addTodoListTC = (title: string): AppThunk => async (dispatch) => {
    const newTodoListData: DataType = {
        title
    };
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistApi.createTodolist(newTodoListData)
        .then((response) => {
            if (response.data.resultCode === RESULT_CODE.SUCCEDED) { // Success
                dispatch(addTodolistAC({ newTodolistData: response.data.data.item }));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            } else {
                handleServerAppError<{item: TodolistType}>(dispatch, response.data);
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(dispatch, error);
        })
};

export const changeTodoListTitleTC = (todolistID: string, title: string): AppThunk => async (dispatch) => {
    const newTodoListData: DataType = {
        title
    };
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistApi.updateTodolistTitle(todolistID, newTodoListData)
        .then((response) => {
            if (response.data.resultCode === RESULT_CODE.SUCCEDED) { // Success
                dispatch(updateTodolistAC({ todolistID, newTitle: title }));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            } else {
                handleServerAppError(dispatch, response.data);
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(dispatch, error);
        })
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
    entityStatus: Status
}

export type TodoListsReducer = ChangeFilterAC
    | AddTodolistAC
    | RemoveTodolistAC
    | UpdateTodolistAC
    | SetTodoListsAC
    | ChangeTodoListsEntityStatusAC

type ChangeFilterAC = ReturnType<typeof changeFilterAC>
export type AddTodolistAC = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAC = ReturnType<typeof removeTodolistAC>
type UpdateTodolistAC = ReturnType<typeof updateTodolistAC>
export type SetTodoListsAC = ReturnType<typeof setTodoListsAC>
type ChangeTodoListsEntityStatusAC = ReturnType<typeof changeTodoListsEntityStatusAC>

export type ErrorType = { // 400 Error
    statusCode: number
    messages: [
        ErrorMessageItem,
        string
    ]
    error: string
}

type ErrorMessageItem = {
    message: string
    field: string
}

export enum RESULT_CODE {
    SUCCEDED = 0,
    INVALID = 1,
    INVALID_CAPTCHA_REQUIRED = 10
}