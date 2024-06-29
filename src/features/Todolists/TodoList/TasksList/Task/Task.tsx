import React, { ChangeEvent, FC, memo, useCallback, useMemo } from 'react';
import { EditableSpan } from '../../../../../components/EditableSpan/EditableSpan';
import { Button } from '../../../../../components/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import S from '../TasksList.module.css';
import { removeTaskTC, TodolistDomainType, updateTaskTC } from '../../../reducers';
import { TaskStatuses } from '../../../../../api/task-api';
import { useAppDispatch } from '../../../../../app/store';

type Task = {
  todolist: TodolistDomainType
  taskId: string
  title: string
  status: TaskStatuses
}


export const Task: FC<Task> = memo(({ todolist,
                                 taskId,
                                 title,
                                 status,
}) => {
  const dispatch = useAppDispatch();
  const finalTaskItemClassList = `${S.taskItem} ${status === TaskStatuses.Completed ? S.completed : ''}`;

  const onBlurHandler = useCallback((title: string) => {
    dispatch(updateTaskTC(todolist.id, taskId, {title}));
  }, [dispatch, todolist.id, taskId])

  const onChangeInputStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValueFlag = e.currentTarget.checked;
    const statusValue: TaskStatuses = newStatusValueFlag ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(updateTaskTC(todolist.id, taskId, {status: statusValue}));
  }
  const onclickBtnRemoveTaskHandler = () => {
    dispatch(removeTaskTC(todolist.id, taskId))
  }

  const inputFieldStyle = useMemo(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    maxWidth: '138px',
    maxHeight: '30px',
    minWidth: '138px',
    minHeight: '30px',
  }), []);

  const deleteTaskBtnStyle = useMemo(() => ({
    maxWidth: '94px',
    maxHeight: '40px',
    minWidth: '94px',
    minHeight: '40px',
  }), []);

  return (
    <li className={finalTaskItemClassList}>
      <input id={taskId}
             type={'checkbox'}
             checked={!!status}
             onChange={onChangeInputStatusHandler}/>

      <label htmlFor={taskId}>
        <EditableSpan oldTitle={title}
                      onBlurCallBack={onBlurHandler}
                      style={inputFieldStyle}
                      disabled={todolist.entityStatus === 'loading'}
        />
      </label>

      <Button variant={status === TaskStatuses.Completed ? 'contained' : 'outlined'}
              color={'error'}
              disabled={!status}
              endIcon={<DeleteIcon/>}
              style={deleteTaskBtnStyle}
              onClickCallBack={onclickBtnRemoveTaskHandler}>Delete
      </Button>
    </li>
  );
});