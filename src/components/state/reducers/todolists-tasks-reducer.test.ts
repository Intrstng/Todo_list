import { tasksReducer, addTodolistAC, removeTodolistAC, todoListsReducer, TasksType, TodolistDomainType } from '../reducers';
import { v1 } from 'uuid';
import { TaskPriorities, TaskStatuses } from '../../../api/task-api';

let todolistID_1: string
let todolistID_2: string
let startTasksState: TasksType
let startTodoListsState: TodolistDomainType[]
let newTodoListTitle: string

// We can use tests without beforeEach() because we work with PURE functions
beforeEach(() => {
  todolistID_1 = v1();
  todolistID_2 = v1();
  startTasksState = {
    [todolistID_1]: [
        { id: v1(), title: "HTML&CSS", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low, startDate: new Date(), deadline: new Date(), todoListId: todolistID_1, order: 0, addedDate: new Date()},
        { id: v1(), title: "JS", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low, startDate: new Date(), deadline: new Date(), todoListId: todolistID_1, order: 0, addedDate: new Date()},
        { id: v1(), title: "ReactJS", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low, startDate: new Date(), deadline: new Date(), todoListId: todolistID_1, order: 0, addedDate: new Date()}
    ],
    [todolistID_2]: [
        { id: v1(), title: "Age", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low, startDate: new Date(), deadline: new Date(), todoListId: todolistID_2, order: 0, addedDate: new Date()},
        { id: v1(), title: "Weight", status: TaskStatuses.Completed, description:'', priority: TaskPriorities.Low, startDate: new Date(), deadline: new Date(), todoListId: todolistID_2, order: 0, addedDate: new Date()},
        { id: v1(), title: "Height", status: TaskStatuses.New, description:'', priority: TaskPriorities.Low, startDate: new Date(), deadline: new Date(), todoListId: todolistID_2, order: 0, addedDate: new Date()}
    ]
  };
  startTodoListsState = [
      {id: todolistID_1, title: 'Main tasks', filter: 'all', addedDate: new Date(), order: 0},
      {id: todolistID_2, title: 'Prepare to the exam', filter: 'active', addedDate: new Date(), order: 0}
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