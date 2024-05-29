import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';
import {Button} from '../Button';
import {FilterValuesType, TasksType, TaskType} from '../../AppWithRedux';
import {useAutoAnimate} from '@formkit/auto-animate/react';
import S from './TasksList.module.css';
import {EditableSpan} from '../EditableSpan/EditableSpan';

type TasksListType = {
    todolistID: string
    tasks: TaskType[]
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    updateTask: (todolistID: string, taskID: string, newTitle: string) => void
    filter: FilterValuesType
}

export const TasksList: FC<TasksListType> = (props) => {
    const onclickSetAllFilter = () => props.changeFilter(props.todolistID, 'all');
    const onclickSetActiveFilter = () => props.changeFilter(props.todolistID, 'active');
    const onclickSetCompletedFilter = () => props.changeFilter(props.todolistID, 'completed');

    const [listRef] = useAutoAnimate<HTMLUListElement>();
    const onChangeStatusHandler = (taskId: string, isDone: boolean) => props.changeStatus(props.todolistID, taskId, isDone);
    const onclickRemoveTask = (taskId: string) => props.removeTask(props.todolistID, taskId);

    const [currentTasksQuantityToShow, setCurrentTasksQuantityToShow] = useState<number>(props.tasks.length);

    const filterTasksForTodoList = () => {
        // switch(filter) {
        //     case 'active': return props.tasks.filter(task => !task.isDone);
        //     case 'completed': return props.tasks.filter(task => task.isDone);
        //     default: return props.tasks;
        // }
        //////////////////////////////////////////////////////////////
        const filteredTasksForTodoList = props.filter === 'active' ?
          props.tasks.filter(task => !task.isDone) :
          props.filter === 'completed' ? props.tasks.filter(task => task.isDone) :
            props.tasks;
        return filteredTasksForTodoList;
    }

    const tasksForTodoList: TaskType[] = filterTasksForTodoList();

    useEffect(() => {
        setCurrentTasksQuantity(tasksForTodoList);
    }, [tasksForTodoList])

    const updateTaskHandler = (taskID: string, newTitle: string) => {
        props.updateTask(props.todolistID, taskID, newTitle);
    }

    const setCurrentTasksQuantity = (currentTasks: TaskType[]) => {
        setCurrentTasksQuantityToShow(currentTasks.length);
    }

    const listItems: JSX.Element = tasksForTodoList.length === 0
                                  ? <span className={S.errorMessage}>No tasks in list. Add task...</span>
                                  : <ul ref={listRef}>
                                      {
                                          tasksForTodoList.map(task => {
                                              const finalTaskItemClassList = `${S.taskItem}
                                                                                ${task.isDone ? S.isDone : ''}
                                                `
                                              return <li key={task.id}
                                                         className={finalTaskItemClassList}>
                                                  <input id={task.id}
                                                         type={'checkbox'}
                                                         checked={task.isDone}
                                                         onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeStatusHandler(task.id, e.currentTarget.checked)}/>
                                                  <label htmlFor={task.id}>
                                                      <EditableSpan oldTitle={task.title}
                                                                    callBack={(value: string) => {
                                                                        updateTaskHandler(task.id, value)
                                                                    }}/>
                                                  </label>
                                                  <Button buttonName={'x'}
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
          {tasksCounter}
          {listItems}
          {
            props.tasks.length !== 0 &&
            <div>
                <Button buttonName={'All'}
                        onClickCallBack={onclickSetAllFilter}
                        className={props.filter === 'all' ? S.activeFilter : ''}/>
                <Button buttonName={'Active'}
                        onClickCallBack={onclickSetActiveFilter}
                        className={props.filter === 'active' ? S.activeFilter : ''}/>
                <Button buttonName={'Completed'}
                        onClickCallBack={onclickSetCompletedFilter}
                        className={props.filter === 'completed' ? S.activeFilter : ''}/>
            </div>
          }
      </div>
    );
};