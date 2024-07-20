import { todoListsActions, FilterValuesType, TodolistDomainType, todoListsReducer } from './index';
import { v1 } from 'uuid';
import { Status } from 'app/slices/appSlice';

let todolistID_1: string;
let todolistID_2: string;
let state: { todolists: TodolistDomainType[] };
let todolistTitle: string;
let entityStatus: Status;
let newFilter_1: FilterValuesType;
let newFilter_2: FilterValuesType;
let entityStatus_1: Status;
let entityStatus_2: Status;

// We can use tests without beforeEach() because we work with PURE functions
beforeEach(() => {
  todolistID_1 = v1();
  todolistID_2 = v1();
  todolistTitle = 'New todolist`s name';
  newFilter_1 = 'active';
  newFilter_2 = 'completed';
  entityStatus = 'idle';
  entityStatus_1 = 'loading';
  entityStatus_2 = 'succeeded';
  state = {
    todolists: [
      {
        id: todolistID_1,
        title: 'Main tasks',
        filter: 'all',
        entityStatus: entityStatus,
        addedDate: new Date(),
        order: 0,
      },
      {
        id: todolistID_2,
        title: 'Prepare to the exam',
        filter: 'active',
        entityStatus: entityStatus,
        addedDate: new Date(),
        order: 0,
      },
    ]
  }
});

// ------------------- 'CHANGE-FILTER' ------------------- //

test('reducer todoLists should CHANGE FILTER', () => {
  // action
  const newState_1 = todoListsReducer(
    state,
    todoListsActions.changeFilter({ todolistID: todolistID_1, value: newFilter_1 }),
  );
  const newState_2 = todoListsReducer(
    state,
    todoListsActions.changeFilter({ todolistID: todolistID_2, value: newFilter_2 }),
  );

  // expectation
  expect(state.todolists.filter((tl) => tl.id === todolistID_1)[0].filter).toBe('all');
  expect(newState_1.todolists.filter((tl) => tl.id === todolistID_1)[0].filter).toBe(newFilter_1);

  expect(state.todolists.filter((tl) => tl.id === todolistID_2)[0].filter).toBe('active');
  expect(newState_2.todolists.filter((tl) => tl.id === todolistID_2)[0].filter).toBe(newFilter_2);
});

// ------------------- 'ADD-TODOLIST' ------------------- //

test('reducer todoLists should ADD-TODOLIST', () => {
  // action
  const newTodoList = {
    id: todolistID_1,
    title: 'newTodoList',
    filter: 'all',
    addedDate: new Date(),
    order: 0,
  };
  const newState = todoListsReducer(state, todoListsActions.addTodolist({ newTodolistData: newTodoList }));

  // expectation
  expect(state.todolists.length).toBe(2);
  expect(newState.todolists.length).toBe(3);
  expect(newState.todolists[2].id).toBeDefined(); // index 2 is used because the new todolist adds to the end of todoLists array
  expect(newState.todolists[2].title).toBe(newTodoList.title);
  expect(newState.todolists[2].filter).toBe('all');
});

// ------------------- 'REMOVE-TODOLIST' ------------------- //

test('reducer todoLists should REMOVE-TODOLIST', () => {
  // action
  const newState_1 = todoListsReducer(state, todoListsActions.removeTodolist({ todolistID: todolistID_1 }));
  const newState_2 = todoListsReducer(state, todoListsActions.removeTodolist({ todolistID: todolistID_2 }));

  // expectation
  expect(state.todolists.length).toBe(2);
  expect(newState_1.todolists.length).toBe(1);
  expect(newState_2.todolists.length).toBe(1);

  expect(newState_1.todolists[0]).toEqual(state.todolists[1]);
  expect(newState_2.todolists[0]).toEqual(state.todolists[0]);
});

// ------------------- 'UPDATE-TODOLIST' ------------------- //

test('reducer todoLists should UPDATE-TODOLIST (change todoLists title)', () => {
  // action
  const newState_1 = todoListsReducer(
    state,
    todoListsActions.updateTodolist({ todolistID: todolistID_1, newTitle: todolistTitle }),
  );
  const newState_2 = todoListsReducer(
    state,
    todoListsActions.updateTodolist({ todolistID: todolistID_2, newTitle: todolistTitle }),
  );

  // expectation
  expect(state.todolists[0].title).toBe('Main tasks');
  expect(state.todolists[1].title).toBe('Prepare to the exam');

  expect(newState_1.todolists[0].title).toBe(todolistTitle);
  expect(newState_2.todolists[1].title).toBe(todolistTitle);
});

// ------------------- 'SET-TODOLISTS' ------------------- //

test('reducer todoLists should SET-TODOLISTS to the state (action creator for REST API request)', () => {
  // action
  const newState = todoListsReducer({todolists: []}, todoListsActions.setTodoLists({ todolists: state.todolists }));

  // expectation
  expect(newState.todolists.length).toBe(2);
  expect(newState.todolists[0].title).toBe('Main tasks');
  expect(newState.todolists[0].filter).toBe('all');
  expect(newState.todolists[1].filter).toBe('all');
  // expect(newState).toEqual(state);
});

// ------------------- 'CHANGE-TODOLIST-ENTITY-STATUS' ------------------- //

test('reducer todoLists should CHANGE-TODOLIST-ENTITY-STATUS', () => {
  // action
  const newState_1 = todoListsReducer(
    state,
    todoListsActions.changeTodoListsEntityStatus({
      todolistID: todolistID_1,
      entityStatus: entityStatus_1,
    }),
  );
  const newState_2 = todoListsReducer(
    state,
    todoListsActions.changeTodoListsEntityStatus({
      todolistID: todolistID_2,
      entityStatus: entityStatus_2,
    }),
  );

  // expectation
  expect(state.todolists[0].entityStatus).toBe(entityStatus);
  expect(state.todolists[1].entityStatus).toBe(entityStatus);

  expect(newState_1.todolists[0].entityStatus).toBe(entityStatus_1);
  expect(newState_2.todolists[1].entityStatus).toBe(entityStatus_2);
});
