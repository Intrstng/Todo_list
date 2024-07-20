import { DataType, todolistApi } from 'api/todolist-api';
import { AppThunk } from 'app/store';
import { appActions, Status } from 'app/slices/appSlice'
import { handleServerAppError, handleServerNetworkError } from 'utils/errorUtils';
import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTasksTC } from 'features/Todolists/slices/tasksSlice';

const initialTodoListState: TodolistDomainType[] = [
  // {id: todolistID_1, title: 'What to do', filter: 'all', entityStatus: 'idle', addedDate: new Date(), order: 0},
  // {id: todolistID_2, title: 'What to ask', filter: 'all', entityStatus: 'idle', addedDate: new Date(), order: 0}
];

const todoListsSlice = createSlice({
  name: 'todolists',
  initialState: {
    todolists: [] as TodolistDomainType[],
  },
  reducers: {
    addTodolist(state, action: PayloadAction<{ newTodolistData: TodolistType }>) {
      state.todolists.push({
        ...action.payload.newTodolistData,
        filter: 'all',
        entityStatus: 'idle',
      });
    },
    removeTodolist(state, action: PayloadAction<{ todolistID: string }>) {
      const idx = state.todolists.findIndex((tl) => tl.id === action.payload.todolistID);
      if (idx !== -1) {
        state.todolists.splice(idx, 1);
      }
    },
    setTodoLists(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
      // return action.payload.todolists.map((tl) => ({
      //   ...tl,
      //   filter: 'all',
      //   entityStatus: 'idle',
      // }));
      action.payload.todolists.forEach(tl => {
        state.todolists.push({...tl, filter: 'all', entityStatus: 'idle'})
      })
    },
    changeFilter(state, action: PayloadAction<{ todolistID: string; value: FilterValuesType }>) {
      const idx = state.todolists.findIndex((tl) => tl.id === action.payload.todolistID);
      if (idx !== -1) {
        state.todolists[idx].filter = action.payload.value;
      }
    },
    updateTodolist(state, action: PayloadAction<{ todolistID: string; newTitle: string }>) {
      const idx = state.todolists.findIndex((tl) => tl.id === action.payload.todolistID);
      if (idx !== -1) {
        state.todolists[idx].title = action.payload.newTitle;
      }
    },
    changeTodoListsEntityStatus(state, action: PayloadAction<{ todolistID: string; entityStatus: Status }>) {
      const idx = state.todolists.findIndex((tl) => tl.id === action.payload.todolistID);
      if (idx !== -1) {
        state.todolists[idx].entityStatus = action.payload.entityStatus;
      }
    },
    clearTodosData(state) {
      state.todolists = [];
      return state;
      // // Or:
      // return [];
    },
  },
});

export const fetchTodoListsTC = (): AppThunk => async (dispatch) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }));
  todolistApi
    .getTodolists()
    .then((response) => {
      dispatch(todoListsActions.setTodoLists({ todolists: response.data }));
      // dispatch(setAppStatusAC({status: 'succeeded'})); // moved to next then
      return response.data;
    })
    .then((todos) => {
      todos.forEach((tl) => dispatch(fetchTasksTC(tl.id)));
      dispatch(appActions.setAppStatus({ status: 'succeeded' }));
    })
    .catch((error: AxiosError<ErrorType>) => {
      handleServerNetworkError(dispatch, error);
    });
};

export const removeTodoListTC =
  (todolistID: string): AppThunk =>
  async (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    dispatch(todoListsActions.changeTodoListsEntityStatus({ todolistID, entityStatus: 'loading' }));
    todolistApi
      .deleteTodolist(todolistID)
      .then((response) => {
        if (response.data.resultCode === RESULT_CODE.SUCCEDED) {
          // Success
          dispatch(todoListsActions.removeTodolist({ todolistID }));
          dispatch(appActions.setAppStatus({ status: 'succeeded' }));
          // dispatch(changeTodoListsEntityStatusAC(todolistID, 'succeeded'));
        } else {
          handleServerAppError(dispatch, response.data);
        }
      })
      .catch((error: AxiosError<ErrorType>) => {
        handleServerNetworkError(dispatch, error);
        dispatch(todoListsActions.changeTodoListsEntityStatus({ todolistID, entityStatus: 'idle' })); // Avoid deleting TODO without network
      });
  };

// export const addTodoListTC = (title: string): AppThunk => async (dispatch) => {
//     const newTodoListData: DataType = {
//         title
//     };
//     dispatch(setAppStatusAC('loading'));
//     const response = await todolistApi.createTodolist(newTodoListData);
//     dispatch(addTodolistAC(response.data.data.item));
//     dispatch(setAppStatusAC('succeeded'));
// };

export const addTodoListTC =
  (title: string): AppThunk =>
  async (dispatch) => {
    const newTodoListData: DataType = {
      title,
    };
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    todolistApi
      .createTodolist(newTodoListData)
      .then((response) => {
        if (response.data.resultCode === RESULT_CODE.SUCCEDED) {
          // Success
          dispatch(todoListsActions.addTodolist({ newTodolistData: response.data.data.item }));
          dispatch(appActions.setAppStatus({ status: 'succeeded' }));
        } else {
          handleServerAppError<{ item: TodolistType }>(dispatch, response.data);
        }
      })
      .catch((error: AxiosError<ErrorType>) => {
        handleServerNetworkError(dispatch, error);
      });
  };

export const changeTodoListTitleTC =
  (todolistID: string, title: string): AppThunk =>
  async (dispatch) => {
    const newTodoListData: DataType = {
      title,
    };
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    todolistApi
      .updateTodolistTitle(todolistID, newTodoListData)
      .then((response) => {
        if (response.data.resultCode === RESULT_CODE.SUCCEDED) {
          // Success
          dispatch(todoListsActions.updateTodolist({ todolistID, newTitle: title }));
          dispatch(appActions.setAppStatus({ status: 'succeeded' }));
        } else {
          handleServerAppError(dispatch, response.data);
        }
      })
      .catch((error: AxiosError<ErrorType>) => {
        handleServerNetworkError(dispatch, error);
      });
  };

// TYPES
export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
  id: string;
  addedDate: Date;
  order: number;
  title: string;
};

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: Status;
};

export type ErrorType = {
  // 400 Error
  statusCode: number;
  messages: [ErrorMessageItem, string];
  error: string;
};

type ErrorMessageItem = {
  message: string;
  field: string;
};

export enum RESULT_CODE {
  SUCCEDED = 0,
  INVALID = 1,
  INVALID_CAPTCHA_REQUIRED = 10,
}

export const todoListsReducer = todoListsSlice.reducer;
export const todoListsActions = todoListsSlice.actions;
