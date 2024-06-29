import React, { memo } from 'react';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Todolist } from './TodoList/Todolist';
import { useAppSelector } from '../../app/store';
import { TodolistDomainType } from './reducers';
import { todoListsSelector } from './selectors';

export const Todolists = memo(() => {
    const todoLists = useAppSelector<TodolistDomainType[]>(todoListsSelector);
    return (
        <>
            { todoLists.map(tl => <Grid item key={tl.id}>
                    <Paper elevation={3}>
                        <Todolist todolist={tl}/>
                    </Paper>
                </Grid>
            ) }
        </>
    );
});