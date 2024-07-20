import { TasksType } from '../slices';
import { AppRootState } from 'app/store';
import { TaskDomainType } from 'api/task-api'

export const tasksSelector = (state: AppRootState): TasksType => state.tasks.tasks;
