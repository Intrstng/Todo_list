import React, { memo, useCallback, useEffect } from 'react';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Todolist } from './TodoList/Todolist';
import { useAppDispatch, useAppSelector } from 'app/store';
import { addTodoListTC, fetchTodoListsTC, TodolistDomainType } from './slices';
import { todoListsSelector } from './selectors';
import { AddItemForm } from '../../components/AddItemForm/AddItemForm';
import { authIsLoggedInSelector } from '../Login/selectors/authSelector';
import { Navigate } from 'react-router-dom';

export const Todolists = memo(() => {
  const dispatch = useAppDispatch();
  const todoLists = useAppSelector<TodolistDomainType[]>(todoListsSelector);
  const isLoggedIn = useAppSelector<boolean>(authIsLoggedInSelector);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(fetchTodoListsTC());
  }, []);

  const addTodolist = useCallback(
    (newTitle: string) => {
      // // For useReducer():
      // const action = removeTodolistAC(id); // !!!!!!!!!!!
      // dispatchTodolists(action); // we cannot use dispatchTodolists(removeTodolistAC(id)) here
      // dispatchTasks(action); // we cannot use dispatchTodolists((removeTodolistAC(id)) here
      //dispatch(addTodolistAC(newTitle));  // !!!!!!! один dispatch и action
      dispatch(addTodoListTC(newTitle));
    },
    [dispatch],
  ); // we can remove dispatch from deps

  if (!isLoggedIn) {
    // Conditional after ALL hooks
    return <Navigate to={'/login'} />;
  }
  // Добавить эти редиректы нужно непосредственно перед return, то есть после всех хуков, которые используются внутри компонент, иначе будет нарушено правило работы с хуками, говорящее, что нельзя использовать хуки внутри компоненты в условной логике.

  return (
    <>
      <AddItemForm addItem={addTodolist} className={'inputForm'} titleBtn={'Add todolist'} label={'Create TODO'} />
      {todoLists.map((tl) => (
        <Grid item key={tl.id}>
          <Paper elevation={3}>
            <Todolist todolist={tl} />
          </Paper>
        </Grid>
      ))}
    </>
  );
});
