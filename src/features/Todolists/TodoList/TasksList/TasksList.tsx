import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '../../../../components/Button';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import S from './TasksList.module.css';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { Task } from './Task/Task';
import { TaskDomainType, TaskStatuses, TaskType } from '../../../../api/task-api';
import { FilterValuesType, TodolistDomainType, todoListsActions } from 'features/Todolists/slices'

type TasksListPropsType = {
  todolist: TodolistDomainType;
};

export const TasksList: FC<TasksListPropsType> = memo(({ todolist }) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector<TaskDomainType[]>((state) => state.tasks.tasks[todolist.id]);
  const [currentTasksQuantityToShow, setCurrentTasksQuantityToShow] = useState<number>(tasks.length);
  const [listRef] = useAutoAnimate<HTMLUListElement>();

  const changeFilter = useCallback(
    (todolistID: string, value: FilterValuesType) => {
      dispatch(todoListsActions.changeFilter({ todolistID, value }));
    },
    [dispatch],
  );
  const onclickSetAllFilter = useCallback(() => changeFilter(todolist.id, 'all'), [changeFilter, todolist.id]);
  const onclickSetActiveFilter = useCallback(() => changeFilter(todolist.id, 'active'), [changeFilter, todolist.id]);
  const onclickSetCompletedFilter = useCallback(
    () => changeFilter(todolist.id, 'completed'),
    [changeFilter, todolist.id],
  );

  let tasksForTodoList: TaskDomainType[] = tasks;
  tasksForTodoList = useMemo(() => {
    return todolist.filter === 'active'
      ? tasksForTodoList.filter((task) => task.status === TaskStatuses.New)
      : todolist.filter === 'completed'
        ? tasksForTodoList.filter((task) => task.status === TaskStatuses.Completed)
        : tasksForTodoList;
  }, [todolist.filter, tasksForTodoList]);

  useEffect(() => {
    setCurrentTasksQuantity(tasksForTodoList);
  }, [tasksForTodoList]);

  const setCurrentTasksQuantity = (currentTasks: TaskType[]) => {
    setCurrentTasksQuantityToShow(currentTasks.length);
  };

  const listItems: JSX.Element =
    tasksForTodoList.length === 0 ? (
      <span className={S.errorMessage}>No tasks in list. Add new task...</span>
    ) : (
      <ul ref={listRef}>
        {tasksForTodoList.map((task) => {
          return <Task key={task.id} todolist={todolist} task={task} />;
        })}
      </ul>
    );

  const tasksCounter: JSX.Element | null =
    tasksForTodoList.length !== 0 ? (
      <div className={S.counterWrapper}>
        <span>Showed tasks: </span>
        <span className={S.counter}>{currentTasksQuantityToShow}</span>
      </div>
    ) : null;

  return (
    <div className={S.taskList}>
      {listItems}
      {tasksCounter}
      {tasks.length !== 0 && (
        <div className={S.controls}>
          <Button
            onClickCallBack={onclickSetAllFilter}
            variant={todolist.filter === 'all' ? 'contained' : 'outlined'}
            size={'medium'}
            disabled={todolist.entityStatus === 'loading'}
          >
            All
          </Button>
          <Button
            onClickCallBack={onclickSetActiveFilter}
            variant={todolist.filter === 'active' ? 'contained' : 'outlined'}
            size={'medium'}
            disabled={todolist.entityStatus === 'loading'}
          >
            Active
          </Button>
          <Button
            onClickCallBack={onclickSetCompletedFilter}
            variant={todolist.filter === 'completed' ? 'contained' : 'outlined'}
            size={'medium'}
            disabled={todolist.entityStatus === 'loading'}
          >
            Completed
          </Button>
        </div>
      )}
    </div>
  );
});
