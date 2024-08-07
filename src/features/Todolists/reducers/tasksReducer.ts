import {
    AddTodolistAC,
    ADD_TODOLIST,
    RemoveTodolistAC,
    SetTodoListsAC,
    REMOVE_TODOLIST,
    SET_TODOLISTS, changeTodoListsEntityStatusAC, ErrorType, RESULT_CODE,
} from './index';
import { taskApi, TaskDomainType, TaskPriorities, TaskStatuses, TaskType, UpdateTaskType } from '../../../api/task-api';
import { AppRootState, AppThunk } from '../../../app/store';
import { setAppErrorAC, setAppStatusAC, Status } from '../../../app/reducers/appReducer';
import { handleServerAppError, handleServerNetworkError } from '../../../utils/errorUtils';
import { ResponseType } from '../../../api/todolist-api';
import { AxiosError } from 'axios';

const ADD_TASK = 'TASK/ADD-TASK';
const REMOVE_TASK = 'TASK/REMOVE-TASK';
const UPDATE_TASK = 'TASK/UPDATE-TASK';
const SET_TASKS = 'TASK/SET-TASKS';
export const CHANGE_TASK_ENTITY_STATUS = 'TASK/CHANGE-TASK-ENTITY-STATUS';

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

export const tasksReducer = (state: TasksType = tasksInit, action: TasksReducer): TasksType => {
    const {type, payload} = action;
    switch (type) {
        case ADD_TASK: {
            const {newTaskData} = payload;
            const newTask: TaskDomainType = {
                ...newTaskData,
                entityStatus: 'idle'
            }
            return {...state, [newTaskData.todoListId]: [newTask, ...state[newTaskData.todoListId]]};
        }
        case REMOVE_TASK: {
            const {todolistID, taskID} = payload;
            return {...state, [todolistID]: state[todolistID].filter(t => t.id !== taskID)};
        }
        case UPDATE_TASK: {
            const {todolistID, taskID, model} = payload;
            return {...state, [todolistID]: state[todolistID].map(t => t.id === taskID ? {...t, ...model} : t)};
        }
        case ADD_TODOLIST: {
            const {newTodolistData} = payload;
            return {...state, [newTodolistData.id]: []};
        }
        case REMOVE_TODOLIST: {
            const {todolistID} = payload;
            // const copyState = {...state};
            // delete copyState[todolistID];
            // return copyState;
            const {[todolistID]: [], ...rest} = state;
            return rest;
        }
        case SET_TODOLISTS: {
            const {todolists} = payload;
            // return todolists.reduce((acc, tl) => {
            //     acc[tl.id] = [];
            //     return acc;
            // }, {...state})
            // Or use:
            const copyState = {...state}
            todolists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState;
        }
        case SET_TASKS: {
            const {todolistID, tasks} = payload;
            return {...state, [todolistID]: tasks.map(t => ({...t, entityStatus: 'idle'}))}
        }
        case CHANGE_TASK_ENTITY_STATUS: {
            const {todolistID, taskID, entityStatus} = payload;
            return {...state, [todolistID]: state[todolistID].map(t => t.id === taskID ? {...t, entityStatus} : t)}
        }
        default:
            return state;
    }
}

// ACTION CREATORS
export const addTaskAC = (newTaskData: TaskType) => ({
    type: ADD_TASK,
    payload: {
        newTaskData
    }
}) as const

export const removeTaskAC = (todolistID: string, taskID: string) => ({
    type: REMOVE_TASK,
    payload: {
        todolistID,
        taskID
    }
}) as const

export const updateTaskAC = (todolistID: string, taskID: string, model: UpdateTaskDomainModelType) => ({
    type: UPDATE_TASK,
    payload: {
        todolistID,
        taskID,
        model,
    }
}) as const

export const setTasksAC = (todolistID: string, tasks: TaskType[]) => ({
    type: SET_TASKS,
    payload: {
        todolistID,
        tasks
    }
}) as const

// THUNK CREATORS
// export const fetchTasksTC = (todolistID: string): AppThunk => (dispatch) => {
//     taskApi.getAllTasks(todolistID)
//         .then(response => {
//             dispatch(setTasksAC(todolistID, response.data.items));
//         });
// };
export const fetchTasksTC = (todolistID: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    taskApi.getAllTasks(todolistID)
        .then((response) => {
            dispatch(setTasksAC(todolistID, response.data.items));
            dispatch(setAppStatusAC('succeeded'));
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(dispatch, error);
        })
};

export const removeTaskTC = (todolistID: string, taskID: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTasksEntityStatusAC(todolistID, taskID, 'loading'));
    taskApi.deleteTask(todolistID, taskID)
        .then((response) => {
            if (response.data.resultCode === RESULT_CODE.SUCCEDED) { // Success
                dispatch(removeTaskAC(todolistID, taskID));
                dispatch(setAppStatusAC('succeeded'));
                dispatch(changeTasksEntityStatusAC(todolistID, taskID, 'succeeded'));
            } else {
                handleServerAppError(dispatch, response.data);
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(dispatch, error);
            dispatch(changeTasksEntityStatusAC(todolistID, taskID, 'idle')); // Avoid deleting task without network
        })
};

// export const addTaskTC = (todolistID: string, title: string): AppThunk => async (dispatch) => {
//     const newTaskData = {
//         title
//     };
//     const response = await taskApi.createTask(todolistID, newTaskData);
//     dispatch(addTaskAC(response.data.data.item));
// };

// export const addTaskTC = (todolistID: string, title: string): AppThunk => async (dispatch) => {
//     const newTaskData = { title };
//
//     try {
//         const response = await taskApi.createTask(todolistID, newTaskData);
//
//         if (response.data.resultCode === 0) { // Success
//             dispatch(addTaskAC(response.data.data.item));
//         } else {
//             if (response.data.messages.length) {
//                 dispatch(setErrorAC(response.data.messages[0]));
//             }
//         }
//     } catch (error) {
//         console.error('Failed to add task:', error);
//         dispatch(setErrorAC('Failed to add task. Please try again.'));
//     }
// };

export const addTaskTC = (todolistID: string, title: string): AppThunk => async (dispatch) => {
    const newTaskData = {
        title
    };
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTodoListsEntityStatusAC(todolistID, 'loading'));
    taskApi.createTask(todolistID, newTaskData)
        .then((response) => {
            if (response.data.resultCode === RESULT_CODE.SUCCEDED) { // Success
                dispatch(addTaskAC(response.data.data.item));
                dispatch(setAppStatusAC('succeeded'));
                dispatch(changeTodoListsEntityStatusAC(todolistID, 'succeeded'));
            } else {
                handleServerAppError<{item: TaskType}>(dispatch, response.data);
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(dispatch, error);
            dispatch(changeTodoListsEntityStatusAC(todolistID, 'idle')); // Avoid adding task without network
        })
};

export const updateTaskTC = (todolistID: string, taskID: string, model: UpdateTaskDomainModelType): AppThunk =>
    async (dispatch, getState: () => AppRootState) => {
        const state = getState();
        dispatch(setAppStatusAC('loading'));
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
                    dispatch(updateTaskAC(todolistID, taskID, response.data.data.item));
                    dispatch(setAppStatusAC('succeeded'));
                } else {
                    handleServerAppError<{item: TaskType}>(dispatch, response.data);
                }
            })
            .catch((error: AxiosError<ErrorType>) => {
                handleServerNetworkError(dispatch, error);
            })
    };


export const changeTasksEntityStatusAC = (todolistID: string, taskID: string, entityStatus: Status) => ({
    type: CHANGE_TASK_ENTITY_STATUS,
    payload: {
        todolistID,
        taskID,
        entityStatus
    }
}) as const

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