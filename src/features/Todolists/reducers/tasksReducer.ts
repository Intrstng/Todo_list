import { AddTodolistAC, ADD_TODOLIST, RemoveTodolistAC, SetTodoListsAC, REMOVE_TODOLIST, SET_TODOLISTS } from './index';
import { taskApi, TaskPriorities, TaskStatuses, TaskType, UpdateTaskType } from '../../../api/task-api';
import { AppRootState, AppDispatch, AppThunk } from '../../../app/store';

const ADD_TASK ='ADD-TASK';
const REMOVE_TASK = 'REMOVE-TASK';
const UPDATE_TASK = 'UPDATE-TASK';
const SET_TASKS = 'SET-TASKS';

const tasksInit: TasksType = {
    // [todolistID_1]: [
    //     { id: v1(), title: "HTML&CSS", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low,
    //     startDate: new Date(), deadline: new Date(), todoListId: todolistID_1, order: 0, addedDate: new Date()},
    //     { id: v1(), title: "JS", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low,
    //     startDate: new Date(), deadline: new Date(), todoListId: todolistID_1, order: 0, addedDate: new Date()},
    //     { id: v1(), title: "ReactJS", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low,
    //     startDate: new Date(), deadline: new Date(), todoListId: todolistID_1, order: 0, addedDate: new Date()}
    // ],
    // [todolistID_2]: [
    //     { id: v1(), title: "Age", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low,
    //     startDate: new Date(), deadline: new Date(), todoListId: todolistID_2, order: 0, addedDate: new Date()},
    //     { id: v1(), title: "Weight", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low,
    //     startDate: new Date(), deadline: new Date(), todoListId: todolistID_2, order: 0, addedDate: new Date()},
    //     { id: v1(), title: "Height", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low,
    //     startDate: new Date(), deadline: new Date(), todoListId: todolistID_2, order: 0, addedDate: new Date()}
    // ]
}

export const tasksReducer = (state: TasksType = tasksInit, action: TasksReducer): TasksType => {
    const {type, payload} = action;
    switch (type) {
        case ADD_TASK: {
            const {newTaskData} = payload;
            return {...state, [newTaskData.todoListId]: [newTaskData, ...state[newTaskData.todoListId]]};
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
            return {...state, [todolistID]: tasks}
        }
        default: return state;
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
    const response = await taskApi.getAllTasks(todolistID);
    dispatch(setTasksAC(todolistID, response.data.items));
};

export const removeTaskTC = (todolistID: string, taskID: string): AppThunk => async (dispatch) => {
    const response = await taskApi.deleteTask(todolistID, taskID);
    dispatch(removeTaskAC(todolistID, taskID));
};

export const addTaskTC = (todolistID: string, title: string): AppThunk => async (dispatch) => {
    const newTaskData = {
        title
    };
    const response = await taskApi.createTask(todolistID, newTaskData);
    dispatch(addTaskAC(response.data.data.item));
};

export const updateTaskTC = (todolistID: string, taskID: string, model: UpdateTaskDomainModelType): AppThunk =>
    async (dispatch, getState: () => AppRootState) => {
        const state = getState();
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
        const response = await taskApi.updateTask(todolistID, taskID, newTaskModel);
        dispatch(updateTaskAC(todolistID, taskID, response.data.data.item));
};

// TYPES
export type TasksType = {
    [key: string]: TaskType[]
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

type AddTaskAC = ReturnType<typeof addTaskAC>
type RemoveTask = ReturnType<typeof removeTaskAC>
type UpdateTaskAC = ReturnType<typeof updateTaskAC>
type SetTasksAC = ReturnType<typeof setTasksAC>