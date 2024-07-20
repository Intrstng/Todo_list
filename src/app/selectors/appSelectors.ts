import { AppRootState } from '../store';
import { Status } from 'app/slices/appSlice';

export const statusSelector = (state: AppRootState): Status => state.app.status;
export const errorSelector = (state: AppRootState): string | null => state.app.error;
export const isInitializedSelector = (state: AppRootState): boolean => state.app.isInitialized;
