import {
  AddTodolistAC,
  addTodolistAC,
  changeTodoListsEntityStatusAC, clearTodosDataAC,
  ErrorType,
  RemoveTodolistAC,
  removeTodolistAC,
  RESULT_CODE,
  SetTodoListsAC,
  setTodoListsAC,
} from './index';
import { taskApi, TaskDomainType, TaskPriorities, TaskStatuses, TaskType, UpdateTaskType } from '../../../api/task-api';
import { AppRootState, AppThunk } from '../../../app/store';
import { setAppStatusAC, Status } from '../../../app/reducers/appReducer';
import { handleServerAppError, handleServerNetworkError } from '../../../utils/errorUtils';
import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const tasksInit: TasksType = {
  // [todolistID_1]: [
  //     { id: v1(), title: "HTML&CSS", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low,
  //     startDate: new Date(), deadline: new Date(), todoListId: todolistID_1, order: 0, addedDate: new Date(), entityStatus: 'idle'},
  //     { id: v1(), title: "JS", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low,
  //     startDate: new Date(), deadline: new Date(), todoListId: todolistID_1, order: 0, addedDate: new Date(), entityStatus: 'idle'},
  //     { id: v1(), title: "ReactJS", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low,
  //     startDate: new Date(), deadline: new Date(), todoListId: todolistID_1, order: 0, addedDate: new Date(), entityStatus: 'idle'}
  // ],
  // [todolistID_2]: [
  //     { id: v1(), title: "Age", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low,
  //     startDate: new Date(), deadline: new Date(), todoListId: todolistID_2, order: 0, addedDate: new Date(), entityStatus: 'idle'},
  //     { id: v1(), title: "Weight", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low,
  //     startDate: new Date(), deadline: new Date(), todoListId: todolistID_2, order: 0, addedDate: new Date(), entityStatus: 'idle'},
  //     { id: v1(), title: "Height", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low,
  //     startDate: new Date(), deadline: new Date(), todoListId: todolistID_2, order: 0, addedDate: new Date(), entityStatus: 'idle'}
  // ]
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TasksType,
  reducers: {
    addTaskAC(state, action: PayloadAction<{ newTaskData: TaskType }>) {
      state[action.payload.newTaskData.todoListId].push({...action.payload.newTaskData, entityStatus: 'idle'});
    },
    removeTaskAC(state, action: PayloadAction<{ todolistID: string, taskID: string }>) {
      const tasks = state[action.payload.todolistID];
      const idx = tasks.findIndex(t => t.id === action.payload.taskID);
      if (idx !== -1) {
        tasks.splice(idx, 1);
      }
    },
    updateTaskAC(state, action: PayloadAction<{ todolistID: string, taskID: string, model: UpdateTaskDomainModelType }>) {
      const tasks = state[action.payload.todolistID];
      const idx = tasks.findIndex(t => t.id === action.payload.taskID);
      if (idx !== -1) {
        tasks[idx] = {...tasks[idx], ...action.payload.model};
      }
    },
    setTasksAC(state, action: PayloadAction<{ todolistID: string, tasks: TaskType[] }>) {
      state[action.payload.todolistID] = action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}));
    },
    changeTasksEntityStatusAC(state, action: PayloadAction<{ todolistID: string, taskID: string, entityStatus: Status }>) {
      const tasks = state[action.payload.todolistID];
      const task = tasks.find(t => t.id === action.payload.taskID);
      if (task) {
        task.entityStatus = action.payload.entityStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(addTodolistAC, (state, action) => {
          state[action.payload.newTodolistData.id] = [];
        })
        .addCase(removeTodolistAC, (state, action) => {
          delete state[action.payload.todolistID];
          // // Or:
          // const {[action.payload.todolistID]: [], ...rest} = state;
          // return rest;
        })
        .addCase(setTodoListsAC, (state, action) => {
          action.payload.todolists.forEach(tl => {
            state[tl.id] = [];
          })
        })
        .addCase(clearTodosDataAC, (state, action) => {
          Object.keys(state).forEach(key => {
            delete state[key];
          });
          // // Or:
          // return {}; // Return a new state object
        })
  }
});

export const {addTaskAC, removeTaskAC, updateTaskAC, setTasksAC, changeTasksEntityStatusAC} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;

export const fetchTasksTC = (todolistID: string): AppThunk => async (dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}));
  taskApi.getAllTasks(todolistID)
      .then((response) => {
        dispatch(setTasksAC( { todolistID: todolistID, tasks: response.data.items } ));
        dispatch(setAppStatusAC({status: 'succeeded'}));
      })
      .catch((error: AxiosError<ErrorType>) => {
        handleServerNetworkError(dispatch, error);
      })
};

export const removeTaskTC = (todolistID: string, taskID: string): AppThunk => async (dispatch) => {
  dispatch(setAppStatusAC({ status: 'loading' }));
  dispatch(changeTasksEntityStatusAC( { todolistID, taskID, entityStatus: 'loading' } ));
  taskApi.deleteTask(todolistID, taskID)
      .then((response) => {
        if (response.data.resultCode === RESULT_CODE.SUCCEDED) { // Success
          dispatch(removeTaskAC({ todolistID, taskID }));
          dispatch(setAppStatusAC({ status: 'succeeded' }));
          // dispatch(changeTasksEntityStatusAC(todolistID, taskID, 'succeeded'));
        } else {
          handleServerAppError(dispatch, response.data);
        }
      })
      .catch((error: AxiosError<ErrorType>) => {
        handleServerNetworkError(dispatch, error);
        dispatch(changeTasksEntityStatusAC({ todolistID, taskID, entityStatus: 'idle' })); // Avoid deleting task without network
      })
};

export const addTaskTC = (todolistID: string, title: string): AppThunk => async (dispatch) => {
  const newTaskData = {
    title
  };
  dispatch(setAppStatusAC({status: 'loading'}));
  dispatch(changeTodoListsEntityStatusAC({todolistID, entityStatus: 'loading'}));
  taskApi.createTask(todolistID, newTaskData)
      .then((response) => {
        if (response.data.resultCode === RESULT_CODE.SUCCEDED) { // Success
          dispatch(addTaskAC({ newTaskData: response.data.data.item }));
          dispatch(setAppStatusAC({status: 'succeeded'}));
          dispatch(changeTodoListsEntityStatusAC({todolistID, entityStatus: 'succeeded'}));
        } else {
          handleServerAppError<{ item: TaskType }>(dispatch, response.data);
        }
      })
      .catch((error: AxiosError<ErrorType>) => {
        handleServerNetworkError(dispatch, error);
        dispatch(changeTodoListsEntityStatusAC({todolistID, entityStatus: 'idle'})); // Avoid adding task without network
      })
};

export const updateTaskTC = (todolistID: string, taskID: string, model: UpdateTaskDomainModelType): AppThunk =>
    async (dispatch, getState: () => AppRootState) => {
      const state = getState();
      dispatch(setAppStatusAC({status: 'loading'}));
      const currentTask = state.tasks[todolistID].find(t => t.id === taskID);
      if (!currentTask) {
        throw new Error('Task was not found in state');
      }
      const newTaskModel: UpdateTaskType = {
        title: currentTask.title,
        description: currentTask.description,
        status: currentTask.status,
        priority: currentTask.priority,
        startDate: currentTask.startDate,
        deadline: currentTask.deadline,
        ...model,
      };
      taskApi.updateTask(todolistID, taskID, newTaskModel)
          .then((response) => {
            if (response.data.resultCode === RESULT_CODE.SUCCEDED) { // Success
              dispatch(updateTaskAC({ todolistID, taskID, model: response.data.data.item })); // or just model instead of response.data.data.item
              dispatch(setAppStatusAC({status: 'succeeded'}));
            } else {
              handleServerAppError<{ item: TaskType }>(dispatch, response.data);
            }
          })
          .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(dispatch, error);
          })
    };

// TYPES
export type TasksType = {
  [key: string]: TaskDomainType[]
}

export type UpdateTaskDomainModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: Date
  deadline?: Date
}

export type TasksReducer = AddTaskAC
    | RemoveTask
    | UpdateTaskAC
    | AddTodolistAC
    | RemoveTodolistAC
    | SetTodoListsAC
    | SetTasksAC
    | ChangeTasksEntityStatusAC

type AddTaskAC = ReturnType<typeof addTaskAC>
type RemoveTask = ReturnType<typeof removeTaskAC>
type UpdateTaskAC = ReturnType<typeof updateTaskAC>
type SetTasksAC = ReturnType<typeof setTasksAC>
type ChangeTasksEntityStatusAC = ReturnType<typeof changeTasksEntityStatusAC>