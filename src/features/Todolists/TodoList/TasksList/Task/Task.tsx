import React, { ChangeEvent, FC, memo, useCallback, useMemo } from 'react';
import { EditableSpan } from '../../../../../components/EditableSpan/EditableSpan';
import { Button } from '../../../../../components/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import S from '../TasksList.module.css';
import { useDispatch } from 'react-redux';
import {
  removeTaskTC,
  updateTaskTC
} from '../../../reducers';
import { TaskStatuses } from '../../../../../api/task-api';
import { AppThunkDispatch } from '../../../../../app/store';

type Task = {
  todolistId: string
  taskId: string
  title: string
  status: TaskStatuses
}


export const Task: FC<Task> = memo(({ todolistId,
                                 taskId,
                                 title,
                                 status,
}) => {

  const dispatch: AppThunkDispatch = useDispatch();
  const finalTaskItemClassList = `${S.taskItem} ${status === TaskStatuses.Completed ? S.completed : ''}`;

  const onBlurHandler = useCallback((title: string) => {
    dispatch(updateTaskTC(todolistId, taskId, {title}));
  }, [dispatch, todolistId, taskId])

  const onChangeInputStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValueFlag = e.currentTarget.checked;
    const statusValue: TaskStatuses = newStatusValueFlag ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(updateTaskTC(todolistId, taskId, {status: statusValue}));
  }
  const onclickBtnRemoveTaskHandler = () => {
    dispatch(removeTaskTC(todolistId, taskId))
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