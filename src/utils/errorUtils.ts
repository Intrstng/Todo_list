import { setAppErrorAC, setAppStatusAC } from '../app/reducers/appReducer';
import { AppDispatch } from '../app/store';
import { ResponseType } from '../api/todolist-api';


export const handleServerAppError = <D>(dispatch: AppDispatch, data: ResponseType<D>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]));
    } else {
        dispatch(setAppErrorAC('Some error occurred'));
    }
    dispatch(setAppStatusAC('failed'));
}

export const handleServerNetworkError = (dispatch: AppDispatch, error: Error) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'));
    dispatch(setAppStatusAC('failed'));
}