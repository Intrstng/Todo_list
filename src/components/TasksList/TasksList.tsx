import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';
import {Button} from '../Button';
import {FilterValuesType, TasksType, TaskType} from '../../AppWithRedux';
import {useAutoAnimate} from '@formkit/auto-animate/react';
import S from './TasksList.module.css';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import { changeStatusAC, removeTaskAC, updateTaskAC } from '../state/tasksReducer';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilterAC } from '../state/todoListsReducer';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppRootState } from '../state/store';
// import Checkbox from '@mui/material/Checkbox';
// import { IconButton } from '@material-ui/core';

type TasksListType = {
    todolistID: string
    // tasks: TaskType[]
    filter: FilterValuesType
}

export const TasksList: FC<TasksListType> = (props) => {
    const dispatch = useDispatch();
    const [listRef] = useAutoAnimate<HTMLUListElement>();
    const tasks = useSelector<AppRootState, TaskType[]>( (state) => state.tasks[props.todolistID]);
    const [currentTasksQuantityToShow, setCurrentTasksQuantityToShow] = useState<number>(tasks.length);

    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, value));
    }
    const onclickSetAllFilter = () => changeFilter(props.todolistID, 'all');
    const onclickSetActiveFilter = () => changeFilter(props.todolistID, 'active');
    const onclickSetCompletedFilter = () => changeFilter(props.todolistID, 'completed');

    const onChangeStatusHandler = (taskId: string, isDone: boolean) => dispatch(changeStatusAC(props.todolistID, taskId, isDone));

    const onclickRemoveTask = (taskId: string) => dispatch(removeTaskAC(props.todolistID, taskId));

    const filterTasksForTodoList = () => {
        return props.filter === 'active' ?
            tasks.filter(task => !task.isDone) :
                props.filter === 'completed'
                                  ? tasks.filter(task => task.isDone)
                                  : tasks;
    }

    const tasksForTodoList: TaskType[] = filterTasksForTodoList();

    useEffect(() => {
        setCurrentTasksQuantity(tasksForTodoList);
    }, [tasksForTodoList])

    const updateTaskHandler = (taskID: string, newTitle: string) => {
        dispatch(updateTaskAC(props.todolistID, taskID, newTitle));
    }

    const setCurrentTasksQuantity = (currentTasks: TaskType[]) => {
        setCurrentTasksQuantityToShow(currentTasks.length);
    }

    const listItems: JSX.Element = tasksForTodoList.length === 0
                                  ? <span className={S.errorMessage}>No tasks in list. Add new task...</span>
                                  : <ul ref={listRef}>
                                      {
                                          tasksForTodoList.map(task => {
                                              const finalTaskItemClassList = `${S.taskItem}
                                                                                ${task.isDone ? S.isDone : ''}`
                                              return <li key={task.id}
                                                         className={finalTaskItemClassList}>

                                                  <input id={task.id}
                                                         type={'checkbox'}
                                                         checked={task.isDone}
                                                         onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeStatusHandler(task.id, e.currentTarget.checked)}/>

                                                  {/*Or use next:*/}
                                                  {/*<Checkbox id={task.id}*/}
                                                  {/*          checked={task.isDone}*/}
                                                  {/*          onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeStatusHandler(task.id, e.currentTarget.checked)}/>*/}

                                                  <label htmlFor={task.id}>
                                                      <EditableSpan oldTitle={task.title}
                                                                    callBack={(value: string) => {
                                                                        updateTaskHandler(task.id, value)
                                                                    }}/>
                                                  </label>

                                                  {/*<IconButton aria-label='delete' onClick={() => onclickRemoveTask(task.id)}>*/}
                                                  {/*    <DeleteIcon/>*/}
                                                  {/*</IconButton>*/}

                                                  <Button buttonName={'Delete'}
                                                          variant={task.isDone ? 'contained' : 'outlined'}
                                                          color={'error'}
                                                          isDisabled={!task.isDone}
                                                          endIcon={<DeleteIcon />}
                                                          onClickCallBack={() => onclickRemoveTask(task.id)}/>
                                              </li>
                                          })
                                      }
                                  </ul>

    const tasksCounter: JSX.Element | null = tasksForTodoList.length !== 0
                                             ? <div className={S.counterWrapper}>
                                                    <span>Showed tasks: </span>
                                                    <span className={S.counter}>{currentTasksQuantityToShow}</span>
                                                </div>
                                            : null;

    return (
      <div className={S.taskList}>
          {listItems}
          {tasksCounter}
          {
            tasks.length !== 0 &&
            <div className={S.controls}>
                <Button buttonName={'All'}
                        onClickCallBack={onclickSetAllFilter}
                        variant={props.filter === 'all' ? 'contained' : 'outlined'}
                        size={'medium'}/>
                <Button buttonName={'Active'}
                        onClickCallBack={onclickSetActiveFilter}
                        variant={props.filter === 'active' ? 'contained' : 'outlined'}
                        size={'medium'}/>
                <Button buttonName={'Completed'}
                        onClickCallBack={onclickSetCompletedFilter}
                        variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                        size={'medium'}/>
            </div>
          }
      </div>
    );
};