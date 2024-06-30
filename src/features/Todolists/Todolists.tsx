import React, { memo, useCallback } from 'react';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Todolist } from './TodoList/Todolist';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { addTodoListTC, TodolistDomainType } from './reducers';
import { todoListsSelector } from './selectors';
import { AddItemForm } from '../../components/AddItemForm/AddItemForm';

export const Todolists = memo(() => {
    const todoLists = useAppSelector<TodolistDomainType[]>(todoListsSelector);
    const dispatch = useAppDispatch();

    const addTodolist = useCallback((newTitle: string) => {
        // // For useReducer():
        // const action = removeTodolistAC(id); // !!!!!!!!!!!
        // dispatchTodolists(action); // we cannot use dispatchTodolists(removeTodolistAC(id)) here
        // dispatchTasks(action); // we cannot use dispatchTodolists((removeTodolistAC(id)) here
        //dispatch(addTodolistAC(newTitle));  // !!!!!!! один dispatch и action
        dispatch(addTodoListTC(newTitle));
    }, [dispatch]) // we can remove dispatch from deps

    return (
        <>
            <AddItemForm addItem={addTodolist}
                         className={'inputForm'}
                         titleBtn={'Add todolist'}
                         label={'Create TODO'} />
            { todoLists.map(tl => <Grid item key={tl.id}>
                    <Paper elevation={3}>
                        <Todolist todolist={tl}/>
                    </Paper>
                </Grid>
            ) }
        </>
    );
});