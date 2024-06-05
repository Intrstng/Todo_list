import {combineReducers, createStore, compose} from 'redux';
import { todoListsReducer, tasksReducer } from './reducers';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const rootReducer = combineReducers({
    todolists: todoListsReducer,
    tasks: tasksReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// createStore deprecated change to -> configureStore
// import { legacy_createStore as createStore } from 'redux';

export const store = createStore(rootReducer, undefined, composeEnhancers());
// Or use:
// export const store = createStore(rootReducer, composeEnhancers());

export type AppRootState = ReturnType<typeof rootReducer>



Object.defineProperty(window, 'store', {
    value: store,
    writable: true,
});


// // @ts-ignore
// window.store = store;