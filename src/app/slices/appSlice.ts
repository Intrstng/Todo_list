import { AppThunk } from '../store';
import { authApi } from 'api/auth-api';
import { handleServerAppError, handleServerNetworkError } from 'utils/errorUtils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authActions } from 'features/Login/slices/authSlice';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle',
    error: null,
    isInitialized: false,
  } as AppInitialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<{ status: Status }>) {
      state.status = action.payload.status;
    },
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setAppInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized;
    },
  },
});

// TYPES
export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

export type AppInitialState = {
  status: Status;
  error: string | null;
  isInitialized: boolean;
};

// THUNKS
export const initializeAppTC = (): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }));
  authApi
    .me()
    .then((response) => {
      if (response.data.resultCode === 0) {
        // Success
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
        dispatch(appActions.setAppInitialized({ isInitialized: true }));
        dispatch(appActions.setAppStatus({ status: 'succeeded' }));
      } else {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
        handleServerAppError(dispatch, response.data);
      }
      dispatch(appActions.setAppInitialized({ isInitialized: true }));
    })
    .catch((error) => {
      handleServerNetworkError(dispatch, error);
    });
};

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;
