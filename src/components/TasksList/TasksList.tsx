import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { Button } from '../Button';
import { FilterValuesType, TaskType } from '../../AppWithRedux';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import S from './TasksList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilterAC } from '../state/todoListsReducer';
import { AppRootState } from '../state/store';
import { Task } from '../Task/Task';
// import Checkbox from '@mui/material/Checkbox';
// import { IconButton } from '@material-ui/core';

type TasksListType = {
    todolistID: string
    // tasks: TaskType[]
    filter: FilterValuesType
}

export const TasksList: FC<TasksListType> = memo(({todolistID, filter}) => {
    const dispatch = useDispatch();
    const [listRef] = useAutoAnimate<HTMLUListElement>();
    const tasks = useSelector<AppRootState, TaskType[]>( (state) => state.tasks[todolistID]);
    const [currentTasksQuantityToShow, setCurrentTasksQuantityToShow] = useState<number>(tasks.length);
    console.log('tasklist')
    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, value));
    }, [dispatch])
    const onclickSetAllFilter = useCallback(() => changeFilter(todolistID, 'all'), [changeFilter, todolistID]);
    const onclickSetActiveFilter = useCallback(() => changeFilter(todolistID, 'active'), [changeFilter, todolistID]);
    const onclickSetCompletedFilter = useCallback(() => changeFilter(todolistID, 'completed'), [changeFilter, todolistID]);

    const filterTasksForTodoList = useCallback(() => {
        return filter === 'active' ?
            tasks.filter(task => !task.isDone) :
                filter === 'completed'
                                  ? tasks.filter(task => task.isDone)
                                  : tasks;
    }, [filter])

    const tasksForTodoList: TaskType[] = filterTasksForTodoList();

    useEffect(() => {
        setCurrentTasksQuantity(tasksForTodoList);
    }, [tasksForTodoList])


    const setCurrentTasksQuantity = (currentTasks: TaskType[]) => {
        setCurrentTasksQuantityToShow(currentTasks.length);
    }

    // const onChangeStatusHandler = (taskId: string, isDone: boolean) => dispatch(changeStatusAC(props.todolistID, taskId, isDone));
    //
    // const onclickRemoveTask = useCallback((taskId: string) => dispatch(removeTaskAC(props.todolistID, taskId)), [dispatch, props.todolistID]);
    //
    // const updateTaskHandler = useCallback((taskID: string, newTitle: string) => {
    //     dispatch(updateTaskAC(props.todolistID, taskID, newTitle));
    // }, [dispatch, props.todolistID])

    const listItems: JSX.Element = tasksForTodoList.length === 0
                                  ? <span className={S.errorMessage}>No tasks in list. Add new task...</span>
                                  : <ul ref={listRef}>
                                      {
                                          tasksForTodoList.map(task => {
                                              return (
                                              // const finalTaskItemClassList = `${S.taskItem}
                                              //                                   ${task.isDone ? S.isDone : ''}`
                                              // return <li key={task.id}
                                              //            className={finalTaskItemClassList}>
                                              //
                                              //     <input id={task.id}
                                              //            type={'checkbox'}
                                              //            checked={task.isDone}
                                              //            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeStatusHandler(task.id, e.currentTarget.checked)}/>
                                              //
                                              //     {/*Or use next:*/}
                                              //     {/*<Checkbox id={task.id}*/}
                                              //     {/*          checked={task.isDone}*/}
                                              //     {/*          onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeStatusHandler(task.id, e.currentTarget.checked)}/>*/}
                                              //
                                              //     <label htmlFor={task.id}>
                                              //         <EditableSpan oldTitle={task.title}
                                              //                       onBlurCallBack={(value: string) => {
                                              //                           updateTaskHandler(task.id, value)
                                              //                       }}/>
                                              //     </label>
                                              //
                                              //     {/*<IconButton aria-label='delete' onClick={() => onclickRemoveTask(task.id)}>*/}
                                              //     {/*    <DeleteIcon/>*/}
                                              //     {/*</IconButton>*/}
                                              //
                                              //     <Button variant={task.isDone ? 'contained' : 'outlined'}
                                              //             color={'error'}
                                              //             disabled={!task.isDone}
                                              //             endIcon={<DeleteIcon />}
                                              //             onClickCallBack={() => onclickRemoveTask(task.id)}>Delete
                                              //     </Button>
                                              // </li>
                                              // // Or use Task component:
                                              <Task key={task.id}
                                                    todolistId={todolistID}
                                                    taskId={task.id}
                                                    title={task.title}
                                                    isDone={task.isDone}
                                                    // onclickRemoveTask={onclickRemoveTask}
                                                    // updateTaskHandler={updateTaskHandler}
                                                    // onChangeStatus={onChangeStatusHandler}
                                                />
                                              )
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
                <Button onClickCallBack={onclickSetAllFilter}
                        variant={filter === 'all' ? 'contained' : 'outlined'}
                        size={'medium'}>All
                </Button>
                <Button onClickCallBack={onclickSetActiveFilter}
                        variant={filter === 'active' ? 'contained' : 'outlined'}
                        size={'medium'}>Active
                </Button>
                <Button onClickCallBack={onclickSetCompletedFilter}
                        variant={filter === 'completed' ? 'contained' : 'outlined'}
                        size={'medium'}>Completed
                </Button>
            </div>
          }
      </div>
    );
});