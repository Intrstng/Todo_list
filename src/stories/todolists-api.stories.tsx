import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { todolistApi, ResponseType } from '../api/todolist-api';
import { taskApi } from '../api/task-api';
import { TodolistType } from 'features/Todolists/slices/todoListsSlice';

export default {
  title: 'API',
};

export const GetTodolists = () => {
  const [state, setState] = useState<TodolistType[] | null>(null);
  useEffect(() => {
    todolistApi.getTodolists().then((response) => setState(response.data));
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<ResponseType<{
    item: TodolistType;
  }> | null>(null);
  const [todoTitle, setTodoTitle] = useState<string>('');
  // useEffect(() => {
  //     const data = {
  //         title: 'Title for new TODO'
  //     }
  //     todolistApi.createTodolist(data)
  //         .then(response => setState(response.data))
  // }, [])

  const onChangeSetTodoTitle = (e: FocusEvent<HTMLInputElement>) => {
    setTodoTitle(e.currentTarget.value);
  };

  const onClickCreateTodoHandler = () => {
    const data = {
      title: todoTitle,
    };
    todolistApi.createTodolist(data).then((response) => setState(response.data));
    setTodoTitle('');
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input type={'text'} value={todoTitle} placeholder={'Enter todolist title...'} onChange={onChangeSetTodoTitle} />
      <button onClick={onClickCreateTodoHandler}>Create new todolist</button>
    </div>
  );
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<ResponseType | null>(null);
  const [todoID, setTodoID] = useState<string>('');
  const [todoTitle, setTodoTitle] = useState<string>('');
  // useEffect(() => {
  //     const todoID = '6d2baa9e-df57-451d-ab85-2039e0a94a4c';
  //     const data = {
  //         title: 'New title'
  //     }
  //     todolistApi.updateTodolistTitle(todoID, data)
  //         .then(response => setState(response.data))
  //         .catch(err => console.log(err.message))
  // }, [])

  const onChangeSetTodoTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.currentTarget.value);
  };

  const onChangeSetTodoID = (e: FocusEvent<HTMLInputElement>) => {
    setTodoID(e.currentTarget.value);
  };

  const onClickUpdateTodoHandler = () => {
    const data = {
      title: todoTitle,
    };
    todolistApi
      .updateTodolistTitle(todoID, data)
      .then((response) => setState(response.data))
      .catch((err) => console.log(err.message));
    setTodoID('');
    setTodoTitle('');
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input type={'text'} value={todoID} placeholder={'Enter todoList ID...'} onChange={onChangeSetTodoID} />
      <input
        type={'text'}
        value={todoTitle}
        placeholder={'Enter new todolist title...'}
        onChange={onChangeSetTodoTitle}
      />
      <button onClick={onClickUpdateTodoHandler}>Update todolist</button>
    </div>
  );
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<ResponseType | null>(null);
  const [todoID, setTodoID] = useState<string>('');
  // useEffect(() => {
  //     const todoID = 'a3295784-456f-4246-a056-3ada2a9dd32a'
  //     todolistApi.deleteTodolist(todoID)
  //         .then(response => setState(response.data))
  //         .catch(err => console.log(err.message))
  // }, [])

  const onChangeSetTodoID = (e: FocusEvent<HTMLInputElement>) => {
    setTodoID(e.currentTarget.value);
  };

  const onClickDeleteTodoHandler = () => {
    todolistApi
      .deleteTodolist(todoID)
      .then((response) => setState(response.data))
      .catch((err) => console.log(err.message));
    setTodoID('');
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input type={'text'} value={todoID} placeholder={'Enter todoList ID...'} onChange={onChangeSetTodoID} />
      <button onClick={onClickDeleteTodoHandler}>Delete todolist</button>
    </div>
  );
};
