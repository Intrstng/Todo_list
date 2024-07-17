import { AppThunk } from '../../../app/store';
import { authApi, LoginParamsType } from '../../../api/auth-api';
import { setAppStatusAC } from '../../../app/reducers/appReducer';
import { handleServerAppError, handleServerNetworkError } from '../../../utils/errorUtils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearTodosDataAC } from '../../Todolists/reducers';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    },
});

export const {setIsLoggedInAC} = authSlice.actions;
export const authReducer =  authSlice.reducer;

// THUNKS
export const loginTC = (params: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    authApi.login(params)
        .then((response) => {
            if (response.data.resultCode === 0) { // Success
                dispatch(setIsLoggedInAC({isLoggedIn: true}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            } else {
                handleServerAppError(dispatch, response.data);
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error);
        })
}

export const logOutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    authApi.logout()
        .then((response) => {
            if (response.data.resultCode === 0) { // Success
                dispatch(setIsLoggedInAC({isLoggedIn: false})); // logout (kill cookie)
                dispatch(setAppStatusAC({status: 'succeeded'}));
                dispatch(clearTodosDataAC());
            } else {
                handleServerAppError(dispatch, response.data);
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error);
        })
}

// TYPES
export type LoginInitialState = {
    isLoggedIn: boolean
}

export type AuthReducer = SetIsLoggedInAC
type SetIsLoggedInAC = ReturnType<typeof setIsLoggedInAC>