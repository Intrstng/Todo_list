// ------------------- 'ADD-TASK' ------------------- //
import {v1} from 'uuid';
import {TasksType, TaskType} from '../../App';
import {addNewTasksListAC, addTaskAC, changeStatusAC, removeTaskAC, tasksReducer, updateTaskAC} from './tasksReducer';

test ('reducer taskList should ADD-TASK', () => {
    // data
    const todolistID_1 = '1001';
    const todolistID_2 = '1002';
    const tasksState: TasksType = {
        [todolistID_1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false }
        ],
        [todolistID_2]: [
            { id: v1(), title: "Age", isDone: true },
            { id: v1(), title: "Weight", isDone: true },
            { id: v1(), title: "Height", isDone: false }
        ]
    }

    const newTitle_1 = 'New-task-1';
    const newTitle_2 = 'New-task-2';

    const newTask_1: TaskType = {
        id: v1(),
        title: newTitle_1,
        isDone: false
    }
    const newTask_2: TaskType = {
        id: v1(),
        title: newTitle_2,
        isDone: false
    }
    // action
    const newState_1 = tasksReducer(tasksState, addTaskAC(todolistID_1, newTask_1));
    const newState_2 = tasksReducer(tasksState, addTaskAC(todolistID_2, newTask_2));

    // expectation
    expect(tasksState[todolistID_1].length).toBe(3);
    expect(tasksState[todolistID_2].length).toBe(3);
    expect(newState_1[todolistID_1].length).toBe(4);
    expect(newState_2[todolistID_2].length).toBe(4);
    expect(newState_1[todolistID_1][0]).toEqual(newTask_1);
    expect(newState_2[todolistID_2][0]).toEqual(newTask_2);
})

// ------------------- 'REMOVE-TASK' ------------------- //
test ('reducer taskList should REMOVE-TASK', () => {
    // data
    const todolistID_1 = '1001';
    const todolistID_2 = '1002';
    const tasksState: TasksType = {
        [todolistID_1]: [
            { id: '1', title: "HTML&CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "ReactJS", isDone: false }
        ],
        [todolistID_2]: [
            { id: '4', title: "Age", isDone: true },
            { id: '5', title: "Weight", isDone: true },
            { id: '6', title: "Height", isDone: false }
        ]
    }
    const taskID_1 = '3';
    const taskID_2 = '4';

    // action
    const newState_1 = tasksReducer(tasksState, removeTaskAC(todolistID_1, taskID_1));
    const newState_2 = tasksReducer(tasksState, removeTaskAC(todolistID_2, taskID_2));

    // expectation
    expect(tasksState[todolistID_1].length).toBe(3);
    expect(tasksState[todolistID_2].length).toBe(3);
    expect(newState_1[todolistID_1].length).toBe(2);
    expect(newState_1[todolistID_2].length).toBe(3);
    expect(newState_2[todolistID_1].length).toBe(3);
    expect(newState_2[todolistID_2].length).toBe(2);
})

// ------------------- 'CHANGE-STATUS' ------------------- //
test ('reducer taskList should CHANGE-STATUS', () => {
    // data
    const todolistID_1 = '1001';
    const todolistID_2 = '1002';
    const tasksState: TasksType = {
        [todolistID_1]: [
            { id: '1', title: "HTML&CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "ReactJS", isDone: false }
        ],
        [todolistID_2]: [
            { id: '4', title: "Age", isDone: true },
            { id: '5', title: "Weight", isDone: true },
            { id: '6', title: "Height", isDone: false }
        ]
    }
    const taskID_1 = '1';
    const taskID_2 = '4';
    // action
    const newState_1 = tasksReducer(tasksState, changeStatusAC(todolistID_1, taskID_1, false));
    const newState_2 = tasksReducer(tasksState, changeStatusAC(todolistID_2, taskID_2, false));

    // expectation
    expect(tasksState[todolistID_1].find(t => t.id === taskID_1)?.isDone).toBe(true);
    expect(newState_1[todolistID_1].find(t => t.id === taskID_1)?.isDone).toBe(false);
    expect(tasksState[todolistID_2].find(t => t.id === taskID_2)?.isDone).toBe(true);
    expect(newState_2[todolistID_2].find(t => t.id === taskID_2)?.isDone).toBe(false);
})

// ------------------- 'UPDATE-TASK' ------------------- //
test ('reducer taskList should UPDATE-TASK', () => {
    // data
    const todolistID_1 = '1001';
    const todolistID_2 = '1002';
    const tasksState: TasksType = {
        [todolistID_1]: [
            { id: '1', title: "HTML&CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "ReactJS", isDone: false }
        ],
        [todolistID_2]: [
            { id: '4', title: "Age", isDone: true },
            { id: '5', title: "Weight", isDone: true },
            { id: '6', title: "Height", isDone: false }
        ]
    }
    const taskID_1 = '1';
    const taskID_2 = '4';
    const newTitle_1 = "New-Title-1";
    const newTitle_2 = "New-Title-2";
    // action
    const newState_1 = tasksReducer(tasksState, updateTaskAC(todolistID_1, taskID_1, newTitle_1));
    const newState_2 = tasksReducer(tasksState, updateTaskAC(todolistID_2, taskID_2, newTitle_2));

    // expectation
    expect(tasksState[todolistID_1].find(t => t.id === taskID_1)?.title).toBe('HTML&CSS');
    expect(newState_1[todolistID_1].find(t => t.id === taskID_1)?.title).toBe(newTitle_1);
    expect(tasksState[todolistID_2].find(t => t.id === taskID_2)?.title).toBe('Age');
    expect(newState_2[todolistID_2].find(t => t.id === taskID_2)?.title).toBe(newTitle_2);
})

// ------------------- 'ADD-NEW-TASKS-LIST' ------------------- //
test ('reducer taskList should ADD-NEW-TASKS-LIST', () => {
    // data
    const todolistID_1 = '1001';
    const todolistID_2 = '1002';
    const newTodolistID = '1003';

    const tasksState: TasksType = {
        [todolistID_1]: [
            { id: '1', title: "HTML&CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "ReactJS", isDone: false }
        ],
        [todolistID_2]: [
            { id: '4', title: "Age", isDone: true },
            { id: '5', title: "Weight", isDone: true },
            { id: '6', title: "Height", isDone: false }
        ]
    }
    // action
    const newState = tasksReducer(tasksState, addNewTasksListAC(newTodolistID));

    // expectation
    expect(tasksState[newTodolistID]).toBe(undefined);
    expect(newState[newTodolistID].length).toBe(0);
})