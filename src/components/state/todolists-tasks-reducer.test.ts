// ------------------- 'ADD-NEW-TASKS-LIST' ------------------- //
import {TasksType, TodolistType} from '../../AppWithRedux';
import {addTodolistAC, todoListsReducer} from './todoListsReducer';
import {tasksReducer} from './tasksReducer';

test('reducer taskList should ADD-NEW-TASKS-LIST', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: TodolistType[] = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.newTodolistID);
    expect(idFromTodoLists).toBe(action.payload.newTodolistID);
});