import axios from 'axios';
import { TodolistType } from 'features/Todolists/slices';

export const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '70e71a7e-5d1b-4284-82b3-3a6364ed9f2a',
  },
};

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  ...settings,
});

export const todolistApi = {
  getTodolists() {
    return instance.get<TodolistType[]>('/todo-lists');
  },
  createTodolist(data: DataType) {
    return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', data);
  },
  updateTodolistTitle(todoID: string, data: DataType) {
    return instance.put<ResponseType>(`/todo-lists/${todoID}`, data);
  },
  deleteTodolist(todoID: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todoID}`);
  },
};

// TYPES
// Generic for response
export type ResponseType<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
};

export type DataType = {
  title: string;
};
