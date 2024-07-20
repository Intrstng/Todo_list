import { taskApi, TaskDomainType, TaskPriorities, TaskStatuses, TaskType, UpdateTaskType } from 'api/task-api'
import { AppRootState, AppThunk } from 'app/store'
import { appActions, Status } from 'app/slices/appSlice'
import { handleServerAppError, handleServerNetworkError } from 'utils/errorUtils'
import { AxiosError } from 'axios'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ErrorType, RESULT_CODE, todoListsActions } from 'features/Todolists/slices/todoListsSlice'

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
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: {} as TasksType,
  },
  reducers: {
    addTask(state, action: PayloadAction<{ newTaskData: TaskType }>) {
      state.tasks[action.payload.newTaskData.todoListId].push({
        ...action.payload.newTaskData,
        entityStatus: 'idle',
      });
    },
    removeTask(state, action: PayloadAction<{ todolistID: string; taskID: string }>) {
      const tasks = state.tasks[action.payload.todolistID];
      const idx = tasks.findIndex((t) => t.id === action.payload.taskID);
      if (idx !== -1) {
        tasks.splice(idx, 1);
      }
    },
    updateTask(
      state,
      action: PayloadAction<{
        todolistID: string;
        taskID: string;
        model: UpdateTaskDomainModelType;
      }>,
    ) {
      const tasks = state.tasks[action.payload.todolistID];
      const idx = tasks.findIndex((t) => t.id === action.payload.taskID);
      if (idx !== -1) {
        tasks[idx] = { ...tasks[idx], ...action.payload.model };
      }
    },
    setTasks(state, action: PayloadAction<{ todolistID: string; tasks: TaskType[] }>) {
      state.tasks[action.payload.todolistID] = action.payload.tasks.map((t) => ({
        ...t,
        entityStatus: 'idle',
      }));
    },
    changeTasksEntityStatus(
      state,
      action: PayloadAction<{
        todolistID: string;
        taskID: string;
        entityStatus: Status;
      }>,
    ) {
      const tasks = state.tasks[action.payload.todolistID];
      const task = tasks.find((t) => t.id === action.payload.taskID);
      if (task) {
        task.entityStatus = action.payload.entityStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todoListsActions.addTodolist, (state, action) => {
        state.tasks[action.payload.newTodolistData.id] = [];
      })
      .addCase(todoListsActions.removeTodolist, (state, action) => {
        delete state.tasks[action.payload.todolistID];
        // // Or:
        // const {[action.payload.todolistID]: [], ...rest} = state;
        // return rest;
      })
      .addCase(todoListsActions.setTodoLists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state.tasks[tl.id] = [];
        });
      })
      .addCase(todoListsActions.clearTodosData, (state, action) => {
        Object.keys(state).forEach((key) => {
          delete state.tasks[key];
        });
        // // Or:
        // return {}; // Return a new state object
      });
  },
});

export const fetchTasksTC =
  (todolistID: string): AppThunk =>
  async (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    taskApi
      .getAllTasks(todolistID)
      .then((response) => {
        dispatch(tasksActions.setTasks({ todolistID: todolistID, tasks: response.data.items }));
        dispatch(appActions.setAppStatus({ status: 'succeeded' }));
      })
      .catch((error: AxiosError<ErrorType>) => {
        handleServerNetworkError(dispatch, error);
      });
  };

export const removeTaskTC =
  (todolistID: string, taskID: string): AppThunk =>
  async (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    dispatch(
      tasksActions.changeTasksEntityStatus({
        todolistID,
        taskID,
        entityStatus: 'loading',
      }),
    );
    taskApi
      .deleteTask(todolistID, taskID)
      .then((response) => {
        if (response.data.resultCode === RESULT_CODE.SUCCEDED) {
          // Success
          dispatch(tasksActions.removeTask({ todolistID, taskID }));
          dispatch(appActions.setAppStatus({ status: 'succeeded' }));
          // dispatch(changeTasksEntityStatusAC(todolistID, taskID, 'succeeded'));
        } else {
          handleServerAppError(dispatch, response.data);
        }
      })
      .catch((error: AxiosError<ErrorType>) => {
        handleServerNetworkError(dispatch, error);
        dispatch(
          tasksActions.changeTasksEntityStatus({
            todolistID,
            taskID,
            entityStatus: 'idle',
          }),
        ); // Avoid deleting task without network
      });
  };

export const addTaskTC =
  (todolistID: string, title: string): AppThunk =>
  async (dispatch) => {
    const newTaskData = {
      title,
    };
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    dispatch(todoListsActions.changeTodoListsEntityStatus({ todolistID, entityStatus: 'loading' }));
    taskApi
      .createTask(todolistID, newTaskData)
      .then((response) => {
        if (response.data.resultCode === RESULT_CODE.SUCCEDED) {
          // Success
          dispatch(tasksActions.addTask({ newTaskData: response.data.data.item }));
          dispatch(appActions.setAppStatus({ status: 'succeeded' }));
          dispatch(
            todoListsActions.changeTodoListsEntityStatus({
              todolistID,
              entityStatus: 'succeeded',
            }),
          );
        } else {
          handleServerAppError<{ item: TaskType }>(dispatch, response.data);
        }
      })
      .catch((error: AxiosError<ErrorType>) => {
        handleServerNetworkError(dispatch, error);
        dispatch(todoListsActions.changeTodoListsEntityStatus({ todolistID, entityStatus: 'idle' })); // Avoid adding task without network
      });
  };

export const updateTaskTC =
  (todolistID: string, taskID: string, model: UpdateTaskDomainModelType): AppThunk =>
  async (dispatch, getState: () => AppRootState) => {
    const state = getState();
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    const currentTask = state.tasks.tasks[todolistID].find((t) => t.id === taskID);
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
    taskApi
      .updateTask(todolistID, taskID, newTaskModel)
      .then((response) => {
        if (response.data.resultCode === RESULT_CODE.SUCCEDED) {
          // Success
          dispatch(
            tasksActions.updateTask({
              todolistID,
              taskID,
              model: response.data.data.item,
            }),
          ); // or just model instead of response.data.data.item
          dispatch(appActions.setAppStatus({ status: 'succeeded' }));
        } else {
          handleServerAppError<{ item: TaskType }>(dispatch, response.data);
        }
      })
      .catch((error: AxiosError<ErrorType>) => {
        handleServerNetworkError(dispatch, error);
      });
  };

// TYPES
export type TasksType = {
  [key: string]: TaskDomainType[];
};

export type UpdateTaskDomainModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: Date;
  deadline?: Date;
};

export const tasksReducer = tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;
