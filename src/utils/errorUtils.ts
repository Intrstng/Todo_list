import { AppDispatch } from '../app/store';
import { ResponseType } from '../api/todolist-api';
import { AxiosError } from 'axios';
import { ErrorType } from '../features/Todolists/slices';
import { appActions } from 'app/slices/appSlice';

export const handleServerAppError = <D>(dispatch: AppDispatch, data: ResponseType<D>) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setAppError({ error: 'Some error occurred' }));
  }
  dispatch(appActions.setAppStatus({ status: 'failed' }));
};

export const handleServerNetworkError = (dispatch: AppDispatch, error: AxiosError<ErrorType>) => {
  // error typization will not work with async/await try/catch
  dispatch(
    appActions.setAppError({
      error: error.message ? error.message : 'Some error occurred',
    }),
  );
  dispatch(appActions.setAppStatus({ status: 'failed' }));
};
