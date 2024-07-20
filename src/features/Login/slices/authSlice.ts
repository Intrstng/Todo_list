import { AppThunk } from 'app/store';
import { authApi, LoginParamsType } from 'api/auth-api';
import { handleServerAppError, handleServerNetworkError } from 'utils/errorUtils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appActions } from 'app/slices/appSlice';
import { todoListsActions } from 'features/Todolists/slices'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  } as LoginInitialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

// THUNKS
export const loginTC =
  (params: LoginParamsType): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    authApi
      .login(params)
      .then((response) => {
        if (response.data.resultCode === 0) {
          // Success
          dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
          dispatch(appActions.setAppStatus({ status: 'succeeded' }));
        } else {
          handleServerAppError(dispatch, response.data);
        }
      })
      .catch((error) => {
        handleServerNetworkError(dispatch, error);
      });
  };

export const logOutTC = (): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }));
  authApi
    .logout()
    .then((response) => {
      if (response.data.resultCode === 0) {
        // Success
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false })); // logout (kill cookie)
        dispatch(appActions.setAppStatus({ status: 'succeeded' }));
        dispatch(todoListsActions.clearTodosData());
      } else {
        handleServerAppError(dispatch, response.data);
      }
    })
    .catch((error) => {
      handleServerNetworkError(dispatch, error);
    });
};

// TYPES
export type LoginInitialState = {
  isLoggedIn: boolean;
};

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
