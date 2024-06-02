import {TasksType, TodolistType} from '../../AppWithRedux';
import { addTodolistAC, removeTodolistAC, todoListsReducer } from './todoListsReducer';
import {tasksReducer} from './tasksReducer';
import { v1 } from 'uuid';


let todolistID_1: string
let todolistID_2: string
let startTasksState: TasksType
let startTodoListsState: TodolistType[]
let newTodoListTitle: string

beforeEach(() => {
  todolistID_1 = v1();
  todolistID_2 = v1();
  startTasksState = {
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
  };
  startTodoListsState = [
    {id: todolistID_1, title: 'What to do', filter: 'all'},
    {id: todolistID_2, title: 'What to ask', filter: 'all'}
  ];
  newTodoListTitle = 'New TODO`s title'
})

// ------------------- 'ADD-NEW-TASKS-LIST' ------------------- //
test('reducer taskList should ADD-NEW-TASKS-LIST (new empty array for tasks should be added when new todolist is added)', () => {
    const action = addTodolistAC(newTodoListTitle);
    const endTasksState = tasksReducer(startTasksState, action);
    const endTodoListsState = todoListsReducer(startTodoListsState, action);
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[keys.length - 1];
    const idFromTodoLists = endTodoListsState[endTodoListsState.length - 1].id;
    expect(idFromTasks).toBe(action.payload.newTodolistID);
    expect(idFromTodoLists).toBe(action.payload.newTodolistID);
});


// ------------------- 'DELETE-TASKS-LIST' ------------------- //
test('reducer taskList should DELETE-TASKS-LIST (delete array of tasks with ID of deleted todoList)', () => {
    const action = removeTodolistAC(todolistID_2);
    const endState = tasksReducer(startTasksState, action)
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState[todolistID_2]).not.toBeDefined();
});