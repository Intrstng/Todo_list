import { AppRootState } from '../store';
import { TasksType, TaskType } from '../../../AppWithRedux';

export const tasksSelector = ((state: AppRootState): TasksType => state.tasks);
// export const tasksSelector = (state: AppRootState, todolistID: string): TaskType[] => state.tasks[todolistID];