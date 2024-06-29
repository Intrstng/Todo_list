import {
    addTodolistAC,
    changeFilterAC, changeTodoListsEntityStatusAC,
    FilterValuesType,
    removeTodolistAC, setTodoListsAC, TodolistDomainType,
    todoListsReducer,
    updateTodolistAC
} from './index';
import {v1} from 'uuid';
import { Status } from '../../../app/reducers/appReducer';


let todolistID_1: string;
let todolistID_2: string;
let state: TodolistDomainType[];
let todolistTitle: string;
let entityStatus: Status
let newFilter_1: FilterValuesType
let newFilter_2: FilterValuesType
let entityStatus_1: Status
let entityStatus_2: Status

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
    state = [
        {id: todolistID_1, title: 'Main tasks', filter: 'all', entityStatus: entityStatus, addedDate: new Date(), order: 0},
        {id: todolistID_2, title: 'Prepare to the exam', filter: 'active', entityStatus: entityStatus, addedDate: new Date(), order: 0}
    ]
})

// ------------------- 'CHANGE-FILTER' ------------------- //

test ('reducer todoLists should CHANGE FILTER', () => {
    // action
    const newState_1 = todoListsReducer(state, changeFilterAC(todolistID_1, newFilter_1));
    const newState_2 = todoListsReducer(state, changeFilterAC(todolistID_2, newFilter_2));

    // expectation
    expect(state.filter(tl => tl.id === todolistID_1)[0].filter).toBe('all');
    expect(newState_1.filter(tl => tl.id === todolistID_1)[0].filter).toBe(newFilter_1);

    expect(state.filter(tl => tl.id === todolistID_2)[0].filter).toBe('active');
    expect(newState_2.filter(tl => tl.id === todolistID_2)[0].filter).toBe(newFilter_2);
})


// ------------------- 'ADD-TODOLIST' ------------------- //

test ('reducer todoLists should ADD-TODOLIST', () => {
    // action
    const newTodoList = {
        id: todolistID_1,
        title: 'newTodoList',
        filter: 'all',
        addedDate: new Date(),
        order: 0,
    };
    const newState = todoListsReducer(state, addTodolistAC(newTodoList));

    // expectation
    expect(state.length).toBe(2);
    expect(newState.length).toBe(3);
    expect(newState[2].id).toBeDefined(); // index 2 is used because the new todolist adds to the end of todoLists array
    expect(newState[2].title).toBe(newTodoList.title);
    expect(newState[2].filter).toBe('all');
})


// ------------------- 'REMOVE-TODOLIST' ------------------- //

test ('reducer todoLists should REMOVE-TODOLIST', () => {
    // action
    const newState_1 = todoListsReducer(state, removeTodolistAC(todolistID_1));
    const newState_2 = todoListsReducer(state, removeTodolistAC(todolistID_2));

    // expectation
    expect(state.length).toBe(2);
    expect(newState_1.length).toBe(1);
    expect(newState_2.length).toBe(1);

    expect(newState_1[0]).toEqual(state[1]);
    expect(newState_2[0]).toEqual(state[0]);
})


// ------------------- 'UPDATE-TODOLIST' ------------------- //

test ('reducer todoLists should UPDATE-TODOLIST (change todoLists title)', () => {
    // action
    const newState_1 = todoListsReducer(state, updateTodolistAC(todolistID_1, todolistTitle));
    const newState_2 = todoListsReducer(state, updateTodolistAC(todolistID_2, todolistTitle));

    // expectation
    expect(state[0].title).toBe('Main tasks');
    expect(state[1].title).toBe('Prepare to the exam');

    expect(newState_1[0].title).toBe(todolistTitle);
    expect(newState_2[1].title).toBe(todolistTitle);
})

// ------------------- 'SET-TODOLISTS' ------------------- //

test ('reducer todoLists should SET-TODOLISTS to the state (action creator for REST API request)', () => {
    // action
    const newState = todoListsReducer([], setTodoListsAC(state));

    // expectation
    expect(newState.length).toBe(2);
    expect(newState[0].title).toBe('Main tasks');
    expect(newState[0].filter).toBe('all');
    expect(newState[1].filter).toBe('all');
    // expect(newState).toEqual(state);
})

// ------------------- 'CHANGE-TODOLIST-ENTITY-STATUS' ------------------- //

test ('reducer todoLists should CHANGE-TODOLIST-ENTITY-STATUS', () => {
    // action
    const newState_1 = todoListsReducer(state, changeTodoListsEntityStatusAC(todolistID_1, entityStatus_1));
    const newState_2 = todoListsReducer(state, changeTodoListsEntityStatusAC(todolistID_2, entityStatus_2));

    // expectation
    expect(state[0].entityStatus).toBe(entityStatus);
    expect(state[1].entityStatus).toBe(entityStatus);

    expect(newState_1[0].entityStatus).toBe(entityStatus_1);
    expect(newState_2[1].entityStatus).toBe(entityStatus_2);
})