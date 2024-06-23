import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '../../../../components/Button';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import S from './TasksList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilterAC, FilterValuesType } from '../../reducers';
import { AppRootState } from '../../../../app/store';
import { Task } from './Task/Task';
import { TaskStatuses, TaskType } from '../../../../api/task-api';

type TasksListPropsType = {
    todolistID: string
    filter: FilterValuesType
}

export const TasksList: FC<TasksListPropsType> = memo(({todolistID, filter}) => {
    const dispatch = useDispatch();
    const [listRef] = useAutoAnimate<HTMLUListElement>();
    const tasks = useSelector<AppRootState, TaskType[]>( (state) => state.tasks[todolistID]);
    const [currentTasksQuantityToShow, setCurrentTasksQuantityToShow] = useState<number>(tasks.length);
    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, value));
    }, [dispatch])
    const onclickSetAllFilter = useCallback(() => changeFilter(todolistID, 'all'), [changeFilter, todolistID]);
    const onclickSetActiveFilter = useCallback(() => changeFilter(todolistID, 'active'), [changeFilter, todolistID]);
    const onclickSetCompletedFilter = useCallback(() => changeFilter(todolistID, 'completed'), [changeFilter, todolistID]);


    let tasksForTodoList: TaskType[] = tasks;
    tasksForTodoList = useMemo(() => {
        return filter === 'active' ?
            tasksForTodoList.filter(task => task.status === TaskStatuses.New) :
                filter === 'completed'
                                  ? tasksForTodoList.filter(task => task.status === TaskStatuses.Completed)
                                  : tasksForTodoList;
    }, [filter, tasksForTodoList])

    useEffect(() => {
        setCurrentTasksQuantity(tasksForTodoList);
    }, [tasksForTodoList])


    const setCurrentTasksQuantity = (currentTasks: TaskType[]) => {
        setCurrentTasksQuantityToShow(currentTasks.length);
    }

    const listItems: JSX.Element = tasksForTodoList.length === 0
                                  ? <span className={S.errorMessage}>No tasks in list. Add new task...</span>
                                  : <ul ref={listRef}>
                                      {
                                          tasksForTodoList.map(task => {
                                              return (
                                                        <Task key={task.id}
                                                            todolistId={todolistID}
                                                            taskId={task.id}
                                                            title={task.title}
                                                            status={task.status}
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