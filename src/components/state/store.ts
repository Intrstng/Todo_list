import {combineReducers, createStore} from 'redux';
import { todoListsReducer, tasksReducer } from './reducers';

const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer
});

export type AppRootState = ReturnType<typeof rootReducer>

// createStore deprecated change to -> configureStore
// import { legacy_createStore as createStore } from 'redux';
export const store = createStore(rootReducer);




Object.defineProperty(window, 'store', {
    value: store,
    writable: true,
});


// // @ts-ignore
// window.store = store;