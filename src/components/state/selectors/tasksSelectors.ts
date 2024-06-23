import { TasksType } from '../reducers';
import { AppRootState } from '../store';

export const tasksSelector = ((state: AppRootState): TasksType => state.tasks);
// export const tasksSelector = (state: AppRootState, todolistID: string): TaskType[] => state.tasks[todolistID];