import { AppRootState } from '../store';
import { Status } from '../reducers/appReducer';

export const statusSelector = ((state: AppRootState): Status => state.app.status);
export const errorSelector = ((state: AppRootState): string | null => state.app.error);