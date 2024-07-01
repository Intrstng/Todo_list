import { AppThunk } from '../../../app/store';
import { authApi, LoginParamsType } from '../../../api/auth-api';
import { setAppStatusAC } from '../../../app/reducers/appReducer';
import { handleServerAppError, handleServerNetworkError } from '../../../utils/errorUtils';

const SET_IS_LOGGED_IN = 'AUTH/SET-IS-LOGGED-IN';
const LOG_OUT = 'AUTH/LOG-OUT';

const loginInitialState: LoginInitialState = {
    isLoggedIn: false,
}

export const authReducer = (state:  LoginInitialState = loginInitialState, action: AuthReducer):  LoginInitialState => {
    switch (action.type) {
        case SET_IS_LOGGED_IN: {
            const {isLoggedIn} = action.payload;
            return {...state, isLoggedIn}
        }
        default: return state;
    }
}

// ACTION CREATORS
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
    type: SET_IS_LOGGED_IN,
    payload: {
        isLoggedIn
    }
}) as const

export const logOutAC = () => ({ type: LOG_OUT }) as const

// THUNKS
export const loginTC = (params: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    authApi.login(params)
        .then((response) => {
            if (response.data.resultCode === 0) { // Success
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(dispatch, response.data);
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error);
        })
}

export const logOutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    authApi.logout()
        .then((response) => {
            if (response.data.resultCode === 0) { // Success
                dispatch(setIsLoggedInAC(false)); // logout (kill cookie)
                dispatch(setAppStatusAC('succeeded'));
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