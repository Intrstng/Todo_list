import { AppRootState } from 'app/store';

export const authIsLoggedInSelector = (state: AppRootState): boolean => state.auth.isLoggedIn;
