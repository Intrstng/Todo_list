import { TasksType } from '../reducers';
import { AppRootState } from '../../../app/store';

export const tasksSelector = ((state: AppRootState): TasksType => state.tasks);