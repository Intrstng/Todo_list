import {v1} from 'uuid';
import { addTaskAC, changeStatusAC, removeTaskAC, updateTaskAC,  tasksReducer, TasksType } from '../reducers';
import { TaskPriorities, TaskStatuses } from '../../../api/task-api';

let todolistID_1: string
let todolistID_2: string
let tasksState: TasksType
let newTitle_1: string
let newTitle_2: string
let taskID_1: string
let taskID_2: string
let date: Date

// We can use tests without beforeEach() because we work with PURE functions
beforeEach(() => {
    todolistID_1 = v1();
    todolistID_2 = v1();
    newTitle_1 = 'New-task-1';
    newTitle_2 = 'New-task-2';
    taskID_1 = '1';
    taskID_2 = '4';
    date: new Date();

    tasksState = {
        [todolistID_1]: [
            { id: '1', title: "HTML&CSS", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low, startDate: date, deadline: date, todoListId: todolistID_1, order: 0, addedDate: date},
            { id: '2', title: "JS", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low, startDate: date, deadline: date, todoListId: todolistID_1, order: 0, addedDate: date},
            { id: '3', title: "ReactJS", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low, startDate: date, deadline: date, todoListId: todolistID_1, order: 0, addedDate: date}
        ],
        [todolistID_2]: [
            { id: '4', title: "Age", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low, startDate: date, deadline: date, todoListId: todolistID_2, order: 0, addedDate: date},
            { id: '5', title: "Weight", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low, startDate: date, deadline: date, todoListId: todolistID_2, order: 0, addedDate: date},
            { id: '6', title: "Height", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low, startDate: date, deadline: date, todoListId: todolistID_2, order: 0, addedDate: date}
        ]
    }
})

// ------------------- 'ADD-TASK' ------------------- //

test ('reducer taskList should ADD-TASK', () => {
    // action
    const newState_1 = tasksReducer(tasksState, addTaskAC(todolistID_1, newTitle_1));
    const newState_2 = tasksReducer(tasksState, addTaskAC(todolistID_2, newTitle_2));

    // expectation
    expect(tasksState[todolistID_1].length).toBe(3);
    expect(tasksState[todolistID_2].length).toBe(3);
    expect(newState_1[todolistID_1].length).toBe(4);
    expect(newState_2[todolistID_2].length).toBe(4);
    expect(newState_1[todolistID_1][0].id).toBeDefined();
    expect(newState_2[todolistID_2][0].id).toBeDefined();
    expect(newState_1[todolistID_1][0].title).toBe(newTitle_1);
    expect(newState_2[todolistID_2][0].title).toBe(newTitle_2);
    expect(newState_1[todolistID_1][0].status).toBe(TaskStatuses.New);
    expect(newState_2[todolistID_2][0].status).toBe(TaskStatuses.New);
})

// ------------------- 'REMOVE-TASK' ------------------- //

test ('reducer taskList should REMOVE-TASK', () => {
    // action
    const newState_1 = tasksReducer(tasksState, removeTaskAC(todolistID_1, taskID_1));
    const newState_2 = tasksReducer(tasksState, removeTaskAC(todolistID_2, taskID_2));

    // expectation
    expect(tasksState[todolistID_1].length).toBe(3);
    expect(tasksState[todolistID_2].length).toBe(3);
    expect(newState_1).toEqual({
        [todolistID_1]: [
            { id: '2', title: "JS", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low, startDate: date, deadline: date, todoListId: todolistID_1, order: 0, addedDate: date},
            { id: '3', title: "ReactJS", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low, startDate: date, deadline: date, todoListId: todolistID_1, order: 0, addedDate: date}
        ],
            [todolistID_2]: [
                { id: '4', title: "Age", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low, startDate: date, deadline: date, todoListId: todolistID_2, order: 0, addedDate: date},
                { id: '5', title: "Weight", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low, startDate: date, deadline: date, todoListId: todolistID_2, order: 0, addedDate: date},
                { id: '6', title: "Height", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low, startDate: date, deadline: date, todoListId: todolistID_2, order: 0, addedDate: date}
        ]
    })
    expect(newState_2).toEqual({
        [todolistID_1]: [
            { id: '1', title: "HTML&CSS", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low, startDate: date, deadline: date, todoListId: todolistID_1, order: 0, addedDate: date},
            { id: '2', title: "JS", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low, startDate: date, deadline: date, todoListId: todolistID_1, order: 0, addedDate: date},
            { id: '3', title: "ReactJS", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low, startDate: date, deadline: date, todoListId: todolistID_1, order: 0, addedDate: date}
        ],
        [todolistID_2]: [
            { id: '5', title: "Weight", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low, startDate: date, deadline: date, todoListId: todolistID_2, order: 0, addedDate: date},
            { id: '6', title: "Height", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low, startDate: date, deadline: date, todoListId: todolistID_2, order: 0, addedDate: date}
        ]
    })
})

// ------------------- 'CHANGE-STATUS' ------------------- //

test ('reducer taskList should CHANGE-STATUS', () => {
    // action
    const newState_1 = tasksReducer(tasksState, changeStatusAC(todolistID_1, taskID_1, TaskStatuses.Completed));
    const newState_2 = tasksReducer(tasksState, changeStatusAC(todolistID_2, taskID_2, TaskStatuses.New));

    // expectation
    expect(tasksState[todolistID_1].find(t => t.id === taskID_1)?.status).toBe(TaskStatuses.New);
    expect(newState_1[todolistID_1].find(t => t.id === taskID_1)?.status).toBe(TaskStatuses.Completed);
    expect(tasksState[todolistID_2].find(t => t.id === taskID_2)?.status).toBe(TaskStatuses.Completed);
    expect(newState_2[todolistID_2].find(t => t.id === taskID_2)?.status).toBe(TaskStatuses.New);
})

// ------------------- 'UPDATE-TASK' ------------------- //

test ('reducer taskList should UPDATE-TASK', () => {
    // action
    const newState_1 = tasksReducer(tasksState, updateTaskAC(todolistID_1, taskID_1, newTitle_1));
    const newState_2 = tasksReducer(tasksState, updateTaskAC(todolistID_2, taskID_2, newTitle_2));

    // expectation
    expect(tasksState[todolistID_1].find(t => t.id === taskID_1)?.title).toBe('HTML&CSS');
    expect(newState_1[todolistID_1].find(t => t.id === taskID_1)?.title).toBe(newTitle_1);
    expect(tasksState[todolistID_2].find(t => t.id === taskID_2)?.title).toBe('Age');
    expect(newState_2[todolistID_2].find(t => t.id === taskID_2)?.title).toBe(newTitle_2);
})