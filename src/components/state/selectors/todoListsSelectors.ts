import { AppRootState } from '../store';
import { TodolistType } from '../../../AppWithRedux';

export const todoListsSelector = ((state: AppRootState): TodolistType[] => state.todolists);