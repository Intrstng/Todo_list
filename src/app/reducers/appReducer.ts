import { AppThunk, useAppSelector } from "../store";
import { authApi } from '../../api/auth-api';
import { handleServerAppError, handleServerNetworkError } from '../../utils/errorUtils';
import { changeTodoListsEntityStatusAC, removeTodolistAC } from '../../features/Todolists/reducers';
import { setIsLoggedInAC } from '../../features/Login/reducers/loginReducer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// const SET_STATUS = 'APP/SET-STATUS';
// const SET_ERROR = 'APP/SET-ERROR';
// const SET_INITIALIZED = 'APP/SET-INITIALIZED';
//
// const appInitialState: AppInitialState = {
//     status: 'idle',
//     error: null,
//     isInitialized: false
// }

// export const appReducer = (state: AppInitialState = appInitialState, action: AppReducer): AppInitialState => {
//     const {type, payload} = action;
//     switch (type) {
//         case SET_STATUS: {
//             const {status} = payload;
//             return {...state, status};
//         }
//         case SET_ERROR: {
//             const {error} = payload;
//             return {...state, error};
//         }
//         case SET_INITIALIZED: {
//             const {isInitialized} = payload;
//             return {...state, isInitialized};
//         }
//         default: return state;
//     }
// }

const appSlice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false
    } as AppInitialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: Status }>) {
            state.status = action.payload.status;
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
        setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized;
        }
    },
});

export const {setAppStatusAC, setAppErrorAC, setAppInitializedAC} = appSlice.actions;
export const appReducer =  appSlice.reducer;

// // ACTION CREATORS
// export const setAppStatusAC = (status: Status) => ({
//     type: SET_STATUS,
//     payload: {
//         status
//     }
// }) as const
//
// export const setAppErrorAC = (error: string | null) => ({
//     type: SET_ERROR,
//     payload: {
//         error
//     }
// }) as const
//
// export const setAppInitializedAC = (isInitialized: boolean) => ({
//     type: SET_INITIALIZED,
//     payload: {
//         isInitialized
//     }
// }) as const

// TYPES
export type Status = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppInitialState = {
    status: Status
    error: string | null
    isInitialized: boolean
}

export type AppReducer = SetAppStatusAC
    | SetAppErrorAC
    | SetAppInitializedAC

type SetAppStatusAC = ReturnType<typeof setAppStatusAC>
type SetAppErrorAC = ReturnType<typeof setAppErrorAC>
type SetAppInitializedAC = ReturnType<typeof setAppInitializedAC>

// THUNKS
export const initializeAppTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    authApi.me()
        .then((response) => {
            if (response.data.resultCode === 0) { // Success
                dispatch(setIsLoggedInAC({isLoggedIn: true}));
                dispatch(setAppInitializedAC({ isInitialized: true}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            } else {
                dispatch(setIsLoggedInAC({isLoggedIn: false}));
                handleServerAppError(dispatch, response.data);
            }
            dispatch(setAppInitializedAC({ isInitialized: true}));
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error);
        })
}

