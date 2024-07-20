import axios from 'axios';
import { ResponseType, settings } from './todolist-api';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  ...settings,
});

export const authApi = {
  login(params: LoginParamsType) {
    return instance.post<ResponseType<{ userId?: number }>>('/auth/login', params);
  },
  logout() {
    return instance.delete<ResponseType>('/auth/login');
  },
  me() {
    return instance.get<ResponseType<AuthMeResponse>>('/auth/me');
  },
};

// TYPES
export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string; // boolean
};

type AuthMeResponse = {
  id: number;
  email: string;
  login: string;
};
