import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux';
import { tasksReducer, TasksReducer, todoListsReducer, TodoListsReducer } from '../features/Todolists/reducers';
import { thunk, ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppReducer, appReducer } from './reducers/appReducer';
import { AuthReducer, authReducer } from '../features/Login/reducers/loginReducer';
import { configureStore, Tuple } from '@reduxjs/toolkit';
// import thunkMiddleware from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const rootReducer = combineReducers({
  todolists: todoListsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
  // middleware: () => new Tuple(thunk),
})

// export const store = legacy_createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(thunk)));
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootState = ReturnType<typeof rootReducer>
type AppActionsType = TasksReducer
    | TodoListsReducer
    | AppReducer
    | AuthReducer
export type AppDispatch = ThunkDispatch<AppRootState, unknown, AppActionsType>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>

export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppDispatch = useDispatch<AppDispatch>;

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector


Object.defineProperty(window, 'store', {
  value: store,
  writable: true,
});
// // @ts-ignore
// window.store = store;