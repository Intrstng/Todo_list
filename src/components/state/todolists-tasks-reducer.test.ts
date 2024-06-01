import {TasksType, TodolistType} from '../../AppWithRedux';
import { addTodolistAC, removeTodolistAC, todoListsReducer } from './todoListsReducer';
import {tasksReducer} from './tasksReducer';
import { v1 } from 'uuid';


// ------------------- 'ADD-NEW-TASKS-LIST' ------------------- //
test('reducer taskList should ADD-NEW-TASKS-LIST (new empty array for tasks should be added when new todolist is added)', () => {
    const startTasksState: TasksType = {};
    const startTodoListsState: TodolistType[] = [];
    const action = addTodolistAC("new todolist title");
    const endTasksState = tasksReducer(startTasksState, action);
    const endTodoListsState = todoListsReducer(startTodoListsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;
    expect(idFromTasks).toBe(action.payload.newTodolistID);
    expect(idFromTodoLists).toBe(action.payload.newTodolistID);
});


// ------------------- 'DELETE-TASKS-LIST' ------------------- //
test('reducer taskList should DELETE-TASKS-LIST (delete array of tasks with ID of deleted todoList)', () => {
    const todolistID_1 = v1();
    const todolistID_2 = v1();

    const startState: TasksType = {
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

    const action = removeTodolistAC(todolistID_2);
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState[todolistID_2]).not.toBeDefined();
});