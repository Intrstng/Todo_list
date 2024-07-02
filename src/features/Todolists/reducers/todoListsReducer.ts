import { v1 } from 'uuid';
import { DataType, todolistApi } from '../../../api/todolist-api';
import { AppDispatch, AppThunk, useAppDispatch, useAppSelector } from '../../../app/store';
import { setAppErrorAC, setAppStatusAC, Status } from '../../../app/reducers/appReducer';
import { statusSelector } from '../../../app/selectors/appSelectors';
import { taskApi } from '../../../api/task-api';
import { addTaskAC, updateTaskAC } from './tasksReducer';
import { handleServerAppError, handleServerNetworkError } from '../../../utils/errorUtils';


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

export const todoListsReducer = (state: TodolistDomainType[] = initialTodoListState, action: TodoListsReducer): TodolistDomainType[] => {
    const {type, payload} = action;
    switch (type) {
        case ADD_TODOLIST: {
            const {newTodolistData} = payload;
            const newTodoList: TodolistDomainType = {
                ...newTodolistData,
                filter: 'all',
                entityStatus: 'idle'
            };
            return [...state, newTodoList];
        }
        case REMOVE_TODOLIST: {
            const {todolistID} = payload;
            return state.filter(tl => tl.id !== todolistID);
        }
        case SET_TODOLISTS: {
            const {todolists} = payload;
            return todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
        }
        case CHANGE_FILTER: {
            const {todolistID, value} = payload;
            return state.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl);
        }
        case UPDATE_TODOLIST: {
            const {todolistID, newTitle} = payload;
            return state.map(tl => tl.id === todolistID ? {...tl, title: newTitle} : tl);
        }
        case CHANGE_TODOLIST_ENTITY_STATUS: {
            const {todolistID, entityStatus} = payload;
            return state.map(tl => tl.id === todolistID ? {...tl, entityStatus} : tl);
        }
        default:
            return state;
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

export const changeTodoListsEntityStatusAC = (todolistID: string, entityStatus: Status) => ({
    type: CHANGE_TODOLIST_ENTITY_STATUS,
    payload: {
        todolistID,
        entityStatus
    }
}) as const

// THUNK CREATORS
// export const fetchTodoListsTC = (): AppThunk => (dispatch) => {
//     todolistApi.getTodolists()
//         .then(response => {
//             dispatch(setTodoListsAC(response.data));
//         });
// };

export const fetchTodoListsTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistApi.getTodolists()
        .then((response) => {
            dispatch(setTodoListsAC(response.data));
            dispatch(setAppStatusAC('succeeded'));
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error);
        })
};

export const removeTodoListTC = (todolistID: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTodoListsEntityStatusAC(todolistID, 'loading'));
    todolistApi.deleteTodolist(todolistID)
        .then((response) => {
            if (response.data.resultCode === 0) { // Success
                dispatch(removeTodolistAC(todolistID));
                dispatch(setAppStatusAC('succeeded'));
                dispatch(changeTodoListsEntityStatusAC(todolistID, 'succeeded'));
            } else {
                handleServerAppError(dispatch, response.data);
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error);
            dispatch(changeTodoListsEntityStatusAC(todolistID, 'idle')); // Avoid deleting TODO without network
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
    dispatch(setAppStatusAC('loading'));
    todolistApi.createTodolist(newTodoListData)
        .then((response) => {
            if (response.data.resultCode === 0) { // Success
                dispatch(addTodolistAC(response.data.data.item));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError<{item: TodolistType}>(dispatch, response.data);
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error);
        })
};

export const changeTodoListTitleTC = (todolistID: string, title: string): AppThunk => async (dispatch) => {
    const newTodoListData: DataType = {
        title
    };
    dispatch(setAppStatusAC('loading'));
    todolistApi.updateTodolistTitle(todolistID, newTodoListData)
        .then((response) => {
            if (response.data.resultCode === 0) { // Success
                dispatch(updateTodolistAC(todolistID, title));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(dispatch, response.data);
            }
        })
        .catch((error) => {
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