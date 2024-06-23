import { AppRootState } from '../../../app/store';
import { TodolistDomainType } from '../reducers';

export const todoListsSelector = ((state: AppRootState): TodolistDomainType[] => state.todolists);