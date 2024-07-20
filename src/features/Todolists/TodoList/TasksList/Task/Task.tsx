import React, { ChangeEvent, FC, memo, useCallback, useMemo } from 'react';
import { EditableSpan } from 'components/EditableSpan/EditableSpan';
import { Button } from 'components/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import S from '../TasksList.module.css';
import { removeTaskTC, TodolistDomainType, updateTaskTC } from 'features/Todolists/slices';
import { TaskDomainType, TaskStatuses } from 'api/task-api';
import { useAppDispatch } from 'app/store';

type Task = {
  todolist: TodolistDomainType;
  task: TaskDomainType;
};

export const Task: FC<Task> = memo(({ todolist, task }) => {
  const dispatch = useAppDispatch();
  const finalTaskItemClassList = `${S.taskItem} ${task.status === TaskStatuses.Completed ? S.completed : ''}`;

  const onBlurHandler = useCallback(
    (title: string) => {
      dispatch(updateTaskTC(todolist.id, task.id, { title }));
    },
    [dispatch, todolist.id, task.id],
  );

  const onChangeInputStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValueFlag = e.currentTarget.checked;
    const statusValue: TaskStatuses = newStatusValueFlag ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(updateTaskTC(todolist.id, task.id, { status: statusValue }));
  };
  const onclickBtnRemoveTaskHandler = () => {
    dispatch(removeTaskTC(todolist.id, task.id));
  };

  const inputFieldStyle = useMemo(
    () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      overflow: 'hidden',
      maxWidth: '138px',
      maxHeight: '30px',
      minWidth: '138px',
      minHeight: '30px',
    }),
    [],
  );

  const deleteTaskBtnStyle = useMemo(
    () => ({
      maxWidth: '94px',
      maxHeight: '40px',
      minWidth: '94px',
      minHeight: '40px',
    }),
    [],
  );
  // Or just `task.entityStatus === 'loading'` (then change in props todolist to todolistID)
  const isLoading = todolist.entityStatus === 'loading' || task.entityStatus === 'loading';

  return (
    <li className={finalTaskItemClassList}>
      <input
        id={task.id}
        type={'checkbox'}
        checked={!!task.status}
        onChange={onChangeInputStatusHandler}
        disabled={isLoading}
      />

      <label htmlFor={task.id}>
        <EditableSpan
          oldTitle={task.title}
          onBlurCallBack={onBlurHandler}
          style={inputFieldStyle}
          disabled={isLoading}
        />
      </label>

      <Button
        variant={task.status === TaskStatuses.Completed ? 'contained' : 'outlined'}
        color={'error'}
        disabled={isLoading || !task.status}
        endIcon={<DeleteIcon />}
        style={deleteTaskBtnStyle}
        onClickCallBack={onclickBtnRemoveTaskHandler}
      >
        Delete
      </Button>
    </li>
  );
});
