import {FilterValuesType, TodolistType} from '../../AppWithRedux';
import {addTodolistAC, changeFilterAC, removeTodolistAC, todoListsReducer, updateTodolistAC} from './todoListsReducer';
import {v1} from 'uuid';

// ------------------- 'CHANGE-FILTER' ------------------- //

test ('reducer todoLists should CHANGE FILTER', () => {
    // data
    const todolistID_1 = v1();
    const todolistID_2 = v1();
    const newFilter_1: FilterValuesType = 'active';
    const newFilter_2: FilterValuesType = 'completed';

    const state: TodolistType[] = [
        {id: todolistID_1, title: 'Main tasks', filter: 'all'},
        {id: todolistID_2, title: 'Prepare to the exam', filter: 'active'}
    ]

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
    // data
    const todolistID_1 = v1();
    const todolistID_2 = v1();
    const todolistTitle = 'New added todolist';

    const state: TodolistType[] = [
        {id: todolistID_1, title: 'Main tasks', filter: 'all'},
        {id: todolistID_2, title: 'Prepare to the exam', filter: 'active'}
    ];

    // action
    const newState = todoListsReducer(state, addTodolistAC(todolistTitle));

    // expectation
    expect(state.length).toBe(2);
    expect(newState.length).toBe(3);
    expect(newState[0].id).toBeDefined();
    expect(newState[0].title).toBe(todolistTitle);
    expect(newState[0].filter).toBe('all');
})


// ------------------- 'REMOVE-TODOLIST' ------------------- //
test ('reducer todoLists should REMOVE-TODOLIST', () => {
    // data
    const todolistID_1 = v1();
    const todolistID_2 = v1();

    const state: TodolistType[] = [
        {id: todolistID_1, title: 'Main tasks', filter: 'all'},
        {id: todolistID_2, title: 'Prepare to the exam', filter: 'active'}
    ];

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
test ('reducer todoLists should UPDATE-TODOLIST', () => {
    // data
    const todolistID_1 = v1();
    const todolistID_2 = v1();
    const newTitle = 'Updated todolist title';

    const state: TodolistType[] = [
        {id: todolistID_1, title: 'Main tasks', filter: 'all'},
        {id: todolistID_2, title: 'Prepare to the exam', filter: 'active'}
    ];

    // action
    const newState_1 = todoListsReducer(state, updateTodolistAC(todolistID_1, newTitle));
    const newState_2 = todoListsReducer(state, updateTodolistAC(todolistID_2, newTitle));

    // expectation
    expect(state[0].title).toBe('Main tasks');
    expect(state[1].title).toBe('Prepare to the exam');

    expect(newState_1[0].title).toBe(newTitle);
    expect(newState_2[1].title).toBe(newTitle);
})