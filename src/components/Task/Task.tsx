import React, { ChangeEvent, FC, memo, useCallback, useMemo } from 'react';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import { Button } from '../Button';
import DeleteIcon from '@mui/icons-material/Delete';
import S from '../TasksList/TasksList.module.css';
import { useDispatch } from 'react-redux';
import { changeStatusAC, removeTaskAC, updateTaskAC } from '../state/tasksReducer';

type Task = {
  todolistId: string
  taskId: string
  title: string
  isDone: boolean
  // onclickRemoveTask: (taskId: string) => void
  // updateTaskHandler: (taskId: string, value: string) => void
  // onChangeStatus: (taskId: string, checked: boolean) => void
}


export const Task: FC<Task> = memo(({ todolistId,
                                 taskId,
                                 title,
                                 isDone,
                                 // updateTaskHandler,
                                 // onChangeStatus,
}) => {

  const dispatch = useDispatch();
console.log('task')
  const onclickRemoveTask = (taskId: string) => dispatch(removeTaskAC(todolistId, taskId))

  const finalTaskItemClassList = `${S.taskItem} ${isDone ? S.isDone : ''}`;

  const onBlurHandler = useCallback((value: string) => {
    // updateTaskHandler(taskId, value);
    dispatch(updateTaskAC(todolistId, taskId, value));
  }, [dispatch, todolistId, taskId])

  const onChangeInputStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // onChangeStatus(taskId, e.currentTarget.checked)
    dispatch(changeStatusAC(todolistId, taskId, e.currentTarget.checked));
  }
  const onclickBtnRemoveTaskHandler = () => {
    onclickRemoveTask(taskId)
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
             checked={isDone}
             onChange={onChangeInputStatusHandler}/>

      <label htmlFor={taskId}>
        <EditableSpan oldTitle={title}
                      onBlurCallBack={onBlurHandler}
                      style={inputFieldStyle}
        />
      </label>

      <Button variant={isDone ? 'contained' : 'outlined'}
              color={'error'}
              disabled={!isDone}
              endIcon={<DeleteIcon/>}
              style={deleteTaskBtnStyle}
              onClickCallBack={onclickBtnRemoveTaskHandler}>Delete
      </Button>
    </li>
  );
});