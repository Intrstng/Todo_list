import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { TasksList } from './TasksList/TasksList';
import { Button } from '../../../components/Button';
import S from './TodoList.module.css';
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { addTaskTC, changeTodoListTitleTC, fetchTasksTC, removeTodoListTC, TodolistDomainType } from '../slices';
import { TaskType } from '../../../api/task-api';
import { todoListSelector } from 'features/Todolists/selectors/todoListsSelectors'
import { tasksSelector } from 'features/Todolists/selectors'

type TodolistPropsType = {
  todolist: TodolistDomainType;
};

export const Todolist: FC<TodolistPropsType> = memo(({ todolist }) => {
  const [isTaskListCollapsed, setTaskListCollapsed] = useState<boolean>(true);
  const dispatch = useAppDispatch();
 const tasks = useAppSelector<TaskType[]>((state) => state.tasks.tasks[todolist.id]);

  // const tasks = useSelector<AppRootState, TaskType[]>( state => tasksSelector(state, todolist.id)); // see tasksSelector.ts

  // useEffect(() => { // moved to fetchTodoListsTC
  //   dispatch(fetchTasksTC(todolist.id));
  // }, [todolist.id])

  const onClickRemoveTodolist = useCallback(() => {
    dispatch(removeTodoListTC(todolist.id));
  }, [dispatch, todolist.id]);

  const onClickTasksListCollapseToggle = useCallback(() => {
    setTaskListCollapsed(!isTaskListCollapsed);
  }, [setTaskListCollapsed, isTaskListCollapsed]);

  const unCollapseTasksList = useCallback(() => {
    setTaskListCollapsed(true);
  }, [setTaskListCollapsed]);

  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskTC(todolist.id, title));
      unCollapseTasksList();
    },
    [dispatch, unCollapseTasksList, todolist.id],
  );

  const updateTodolistHandler = useCallback(
    (newTitle: string) => {
      dispatch(changeTodoListTitleTC(todolist.id, newTitle));
    },
    [dispatch, todolist.id],
  );

  const tasksList = (
    <Paper elevation={4} sx={{ backgroundColor: 'rgba(240,239,239,0.74)' }}>
      <TasksList todolist={todolist} />
    </Paper>
  );

  const inputFieldStyle = useMemo(
    () => ({
      maxWidth: '220px',
      maxHeight: '30px',
      minWidth: '220px',
      minHeight: '30px',
      overflow: 'hidden',
    }),
    [],
  );

  const buttonAdditionalStyles = useMemo(
    () => ({
      maxWidth: '26px',
      maxHeight: '26px',
      minWidth: '26px',
      minHeight: '26px',
      fontSize: '14px',
    }),
    [],
  );

  const toggleShowTasksListBtnName = isTaskListCollapsed ? 'Hide tasks list' : 'Show tasks list';

  return (
    <div className={S.todolist}>
      <div className={S.todolist__titleContent}>
        <h2 className={S.todolist__title}>
          <EditableSpan
            oldTitle={todolist.title}
            style={inputFieldStyle}
            onBlurCallBack={updateTodolistHandler}
            disabled={todolist.entityStatus === 'loading'}
          />
        </h2>
        <Button
          variant={'outlined'}
          color={'error'}
          disabled={todolist.entityStatus === 'loading'}
          onClickCallBack={onClickRemoveTodolist}
          style={buttonAdditionalStyles}
        >
          x
        </Button>
        {/*Or we can use:*/}
        {/*<IconButton aria-label='delete' onClick={onClickRemoveTodolist}>*/}
        {/*    <DeleteIcon/>*/}
        {/*</IconButton>*/}
      </div>
      <AddItemForm
        className={'taskForm'}
        addItem={addTask}
        titleBtn={'Add task'}
        label={'Create task'}
        disabled={todolist.entityStatus === 'loading'}
      />
      <div className={S.tasksShowToggle}>
        <Button
          variant={isTaskListCollapsed ? 'outlined' : 'contained'}
          color={isTaskListCollapsed ? 'warning' : 'success'}
          onClickCallBack={onClickTasksListCollapseToggle}
          disabled={todolist.entityStatus === 'loading'}
        >
          {toggleShowTasksListBtnName}
        </Button>
        <div className={S.counterWrapper}>
          <span>All tasks:</span>
          <div className={S.counter}>
            <span>{tasks.length}</span>
          </div>
        </div>
      </div>
      {isTaskListCollapsed ? tasksList : null}
    </div>
  );
});
