import { setAppErrorAC, setAppStatusAC } from '../app/reducers/appReducer';
import { AppDispatch } from '../app/store';
import { ResponseType } from '../api/todolist-api';
import { AxiosError } from 'axios';
import { ErrorType } from '../features/Todolists/reducers';

export const handleServerAppError = <D>(dispatch: AppDispatch, data: ResponseType<D>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({ error: data.messages[0]}));
    } else {
        dispatch(setAppErrorAC({ error: 'Some error occurred'}));
    }
    dispatch(setAppStatusAC({ status: 'failed'}));
}

export const handleServerNetworkError = (dispatch: AppDispatch, error: AxiosError<ErrorType>) => { // error typization will not work with async/await try/catch
    dispatch(setAppErrorAC({ error: error.message ? error.message : 'Some error occurred'}));
    dispatch(setAppStatusAC({ status: 'failed'}));
}