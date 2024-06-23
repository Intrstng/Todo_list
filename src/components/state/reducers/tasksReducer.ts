import {v1} from 'uuid';
import {
    todolistID_1,
    todolistID_2,
    AddTodolistAC,
    RemoveTodolistAC,
    SetTodoListsAC,
    setTodoListsAC, changeTodoListTitleTC
} from '../reducers';
import { taskApi, TaskPriorities, TaskStatuses, TaskType, UpdateTaskType } from '../../../api/task-api';
import { AppRootState, AppThunkDispatch } from '../store';
import { todolistApi } from '../../../api/todolist-api';


export type TasksType = {
    [key: string]: TaskType[]
}

const tasksInit: TasksType = {
    // [todolistID_1]: [
    //     { id: v1(), title: "HTML&CSS", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low, startDate: new Date(), deadline: new Date(), todoListId: todolistID_1, order: 0, addedDate: new Date()},
    //     { id: v1(), title: "JS", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low, startDate: new Date(), deadline: new Date(), todoListId: todolistID_1, order: 0, addedDate: new Date()},
    //     { id: v1(), title: "ReactJS", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low, startDate: new Date(), deadline: new Date(), todoListId: todolistID_1, order: 0, addedDate: new Date()}
    // ],
    // [todolistID_2]: [
    //     { id: v1(), title: "Age", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low, startDate: new Date(), deadline: new Date(), todoListId: todolistID_2, order: 0, addedDate: new Date()},
    //     { id: v1(), title: "Weight", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low, startDate: new Date(), deadline: new Date(), todoListId: todolistID_2, order: 0, addedDate: new Date()},
    //     { id: v1(), title: "Height", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low, startDate: new Date(), deadline: new Date(), todoListId: todolistID_2, order: 0, addedDate: new Date()}
    // ]
}

export const tasksReducer = (state: TasksType = tasksInit, action: TasksReducer): TasksType => {
    const {type, payload} = action;
    switch (type) {
        case 'ADD-TASK': {
            const {data} = payload;
            const newTask: TaskType = {
                ...data,
            }
            return {...state, [data.todoListId]: [newTask, ...state[data.todoListId]]};
        }
        case 'REMOVE-TASK': {
            const {todolistID, taskID} = payload;
            return {...state, [todolistID]: state[todolistID].filter(t => t.id !== taskID)};
        }
        // case 'CHANGE-STATUS': {
        //     const {todolistID, taskID, status} = payload;
        //     return {...state, [todolistID]: state[todolistID].map(t => t.id === taskID ? {...t, status} : t)};
        // }
        case 'UPDATE-TASK': {
            const {todolistID, taskID, model} = payload;
            return {...state, [todolistID]: state[todolistID].map(t => t.id === taskID ? {...t, ...model} : t)};
        }
        case 'ADD-TODOLIST': {
            const {newTodolistData} = payload;
            return {...state, [newTodolistData.id]: []};
        }
        case 'REMOVE-TODOLIST': {
            const {todolistID} = payload;
            // const copyState = {...state};
            // delete copyState[todolistID];
            // return copyState;

            const {[todolistID]: [], ...rest} = state;
            return rest;
        }
        case 'SET-TODOLISTS': {
            const {todolists} = payload;
            const copyState = {...state}
            todolists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState
        }
        case 'SET-TASKS': {
            const {todolistID, tasks} = payload;
            // return {...state, [payload.todolistID]: [...state[todolistID], ...tasks]}
            return {...state, [todolistID]: tasks}
        }
        default: return state;
    }
}


type TasksReducer = AddTaskAC
    | RemoveTask
    // | ChangeStatus
    | UpdateTaskAC
    | AddTodolistAC
    | RemoveTodolistAC
    | SetTodoListsAC
    | SetTasksAC

type AddTaskAC = ReturnType<typeof addTaskAC>

export const addTaskAC = (data: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            data
        }
    } as const
}


type RemoveTask = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID,
            taskID
        }
    } as const
}


// type ChangeStatus = ReturnType<typeof changeStatusAC>

// export const changeStatusAC = (todolistID: string, taskID: string, status: TaskStatuses) => {
//     return {
//         type: 'CHANGE-STATUS',
//         payload: {
//             todolistID,
//             taskID,
//             status
//         }
//     } as const
// }


type UpdateTaskAC = ReturnType<typeof updateTaskAC>

export const updateTaskAC = (todolistID: string, taskID: string, model: UpdateTaskDomainModelType) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistID,
            taskID,
            model,
        }
    } as const
}

type SetTasksAC = ReturnType<typeof setTasksAC>

export const setTasksAC = (todolistID: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todolistID,
            tasks
        }
    } as const
}

// THUNK CREATORS

export const fetchTasksTC = (todolistID: string) => (dispatch: AppThunkDispatch) => {
    taskApi.getAllTasks(todolistID)
        .then(response => {
            dispatch(setTasksAC(todolistID, response.data.items));
        });
};

export const removeTaskTC = (todolistID: string, taskID: string) => (dispatch: AppThunkDispatch) => {
    taskApi.deleteTask(todolistID, taskID)
        .then(response => {
            dispatch(removeTaskAC(todolistID, taskID));
        });
};

export const addTaskTC = (todolistID: string, title: string) => (dispatch: AppThunkDispatch) => {
    const newTaskData = {
        title
    }
    taskApi.createTask(todolistID, newTaskData)
        .then(response => {
           dispatch(addTaskAC(response.data.data.item))
        });
};

export type UpdateTaskDomainModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: Date
    deadline?: Date
}

// export const changeTaskTitleTC = (todolistID: string, taskID: string, newTitle: string) => (dispatch: AppThunkDispatch, getState: () => AppRootState) => {
//     const state = getState();
//     const currentTask = state.tasks[todolistID].find(t => t.id === taskID);
//     if (!currentTask) {
//         throw new Error('Task was not found in state');
//     }
//     const newTaskTitleModel: UpdateTaskType = {
//         title: newTitle,
//         description: currentTask.description,
//         status: currentTask.status,
//         priority: currentTask.priority,
//         startDate: currentTask.startDate,
//         deadline: currentTask.deadline,
//     }
//     taskApi.updateTask(todolistID, taskID, newTaskTitleModel)
//         .then(response => {
//            dispatch(updateTaskAC(todolistID, taskID, response.data.data.item.title))
//         });
// };
//
// export const changeTaskStatusTC = (todolistID: string, taskID: string, statusValue: TaskStatuses) => (dispatch: AppThunkDispatch, getState: () => AppRootState) => {
//     const state = getState();
//     const currentTask = state.tasks[todolistID].find(t => t.id === taskID);
//     if (!currentTask) {
//         throw new Error('Task was not found in state');
//     }
//     const newTaskStatusModel: UpdateTaskType = {
//         title: currentTask.title,
//         description: currentTask.description,
//         status: statusValue,
//         priority: currentTask.priority,
//         startDate: currentTask.startDate,
//         deadline: currentTask.deadline,
//     }
//     taskApi.updateTask(todolistID, taskID, newTaskStatusModel)
//         .then(response => {
//             dispatch(changeStatusAC(todolistID, taskID, response.data.data.item.status))
//         });
// };
export const updateTaskTC = (todolistID: string, taskID: string, model: UpdateTaskDomainModelType) => (dispatch: AppThunkDispatch, getState: () => AppRootState) => {
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
    }
    taskApi.updateTask(todolistID, taskID, newTaskModel)
        .then(response => {
            dispatch(updateTaskAC(todolistID, taskID, newTaskModel))
        });
};