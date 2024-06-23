import React, { memo } from 'react';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Todolist } from './TodoList/Todolist';
import { useSelector } from 'react-redux';
import { AppRootState } from '../../app/store';
import { TodolistDomainType } from './reducers';
import { todoListsSelector } from './selectors';

export const Todolists = memo(() => {
    const todoLists = useSelector<AppRootState, TodolistDomainType[]>(todoListsSelector);
    return (
        <>
            { todoLists.map(tl => <Grid item key={tl.id}>
                    <Paper elevation={3}>
                        <Todolist todolistID={tl.id}
                                  title={tl.title}
                                  filter={tl.filter} />
                    </Paper>
                </Grid>
            ) }
        </>
    );
});