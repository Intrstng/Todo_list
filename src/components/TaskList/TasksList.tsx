import React, {FC, useState} from 'react';
import {Button} from '../Button';
import {FilterValuesType, TaskType} from '../../App';
import {useAutoAnimate} from '@formkit/auto-animate/react';
import S from './TasksList.module.css';

type TasksListType = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}

export const TasksList: FC<TasksListType> = (props) => {
    let [filter, setFilter] = useState<FilterValuesType>('all');
    const [listRef] = useAutoAnimate<HTMLUListElement>();
    const onclickSetAllFilter = () => setFilter('all');
    const onclickSetActiveFilter = () => setFilter('active');
    const onclickSetCompletedFilter = () => setFilter('completed');
    const onChangeStatusHandler = (taskId: string, isDone: boolean) => props.changeStatus(taskId, isDone);
    const onclickRemoveTask = (value: string) => props.removeTask(value);

    // const filterTasksForTodoList = () => {
    //     return filter === 'active' ? props.tasks.filter(task => !task.isDone)
    //                                                : filter === 'completed' ? props.tasks.filter(task => task.isDone)
    //                                                : props.tasks;
    // }

    const filterTasksForTodoList = () => {
        switch(filter) {
            case 'active': return props.tasks.filter(task => !task.isDone);
            case 'completed': return props.tasks.filter(task => task.isDone);
            default: return props.tasks;
        }
    }

    let tasksForTodoList = filterTasksForTodoList();

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
                               onClick={(e) => onChangeStatusHandler(task.id, e.currentTarget.checked)}/>
                        <label htmlFor={task.id}>{task.title}</label>
                        <Button buttonName={'x'}
                                onClickCallBack={() => onclickRemoveTask(task.id)}/>
                    </li>
                })
            }
        </ul>

    return (
        <div className={S.taskList}>
            {listItems}
            <div>
                <Button buttonName={'All'}
                        onClickCallBack={onclickSetAllFilter}
                        className={filter === 'all' ? S.activeFilter : ''}/>
                <Button buttonName={'Active'}
                        onClickCallBack={onclickSetActiveFilter}
                        className={filter === 'active' ? S.activeFilter : ''}/>
                <Button buttonName={'Completed'}
                        onClickCallBack={onclickSetCompletedFilter}
                        className={filter === 'completed' ? S.activeFilter : ''}/>
            </div>
        </div>
    );
};