import {v1} from 'uuid';
import {TodolistType} from '../../App';
import {addTodolistAC, changeFilterAC, removeTodolistAC, todoListsReducer, updateTodolistAC} from './todoListsReducer';

// ------------------- 'CHANGE-FILTER' ------------------- //

test ('reducer todoLists should CHANGE FILTER', () => {
    // data
    const todolistID_1 = '1001';
    const todolistID_2 = '1002';
    const state: TodolistType[] = [
        {id: todolistID_1, title: 'Main tasks', filter: 'all'},
        {id: todolistID_2, title: 'Prepare to the exam', filter: 'active'}
    ]

    // action
    const newState_1 = todoListsReducer(state, changeFilterAC(todolistID_1, 'active'));

    const newState_2 = todoListsReducer(state, changeFilterAC(todolistID_2, 'completed'));

    // expectation
    expect(state.filter(tl => tl.id === todolistID_1)[0].filter).toBe('all');
    expect(newState_1.filter(tl => tl.id === todolistID_1)[0].filter).toBe('active');

    expect(state.filter(tl => tl.id === todolistID_2)[0].filter).toBe('active');
    expect(newState_2.filter(tl => tl.id === todolistID_2)[0].filter).toBe('completed');
})


/*
test ('reducer todoLists CHANGE FILTER should work with incorrect action set', () => {
    // data
    const todolistID_1 = '1001';
    const todolistID_2 = '1002';
    const state: TodolistType[] = [
        {id: todolistID_1, title: 'Main tasks', filter: 'all'},
        {id: todolistID_2, title: 'Prepare to the exam', filter: 'active'}
    ]

    // expectation
    expect(() => {
        todoListsReducer(state, changeFilterAC(todolistID_1, 'incorrect_action'))
    }).toBe(state);
})*/


// ------------------- 'ADD-TODOLIST' ------------------- //
test ('reducer todoLists should ADD-TODOLIST', () => {
    // data
    const todolistID_1 = '1001';
    const todolistID_2 = '1002';
    const todolistID_3 = '1003';
    const newTodolist: TodolistType = {
        id: todolistID_3,
        title: 'New added todolist',
        filter: 'all'
    };

    const state: TodolistType[] = [
        {id: todolistID_1, title: 'Main tasks', filter: 'all'},
        {id: todolistID_2, title: 'Prepare to the exam', filter: 'active'}
    ];

    // action
    const newState_1 = todoListsReducer(state, addTodolistAC(newTodolist));
    const newState_2 = todoListsReducer(state, addTodolistAC(newTodolist));

    // expectation
    expect(state.length).toBe(2);
    expect(newState_1.length).toBe(3);
    expect(newState_2.length).toBe(3);

    expect(newState_1[0]).toEqual(newTodolist);
    expect(newState_2[0]).toEqual(newTodolist);

    expect(newState_1[0].id).toEqual(todolistID_3);
    expect(newState_2[0].id).toEqual(todolistID_3);
})


// ------------------- 'REMOVE-TODOLIST' ------------------- //
test ('reducer todoLists should REMOVE-TODOLIST', () => {
    // data
    const todolistID_1 = '1001';
    const todolistID_2 = '1002';

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
    const todolistID_1 = '1001';
    const todolistID_2 = '1002';
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
