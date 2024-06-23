import { combineReducers, createStore, compose, applyMiddleware, AnyAction } from 'redux';
import { todoListsReducer, tasksReducer } from '../features/Todolists/reducers';
import { thunk } from 'redux-thunk';
import  {ThunkDispatch} from 'redux-thunk'
import { useDispatch } from 'react-redux';

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

export const store = createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(thunk)));

// Or use:
// export const store = createStore(rootReducer, composeEnhancers());

export type AppRootState = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();


Object.defineProperty(window, 'store', {
    value: store,
    writable: true,
});
// // @ts-ignore
// window.store = store;