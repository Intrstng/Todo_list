import React, {FC, useState} from 'react';
import {Button} from '../Button/Button';
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
        ? <span className={'error-message'}>No tasks in list. Add task...</span>
        : <ul ref={listRef}>
            {
                tasksForTodoList.map(task => {
                    return <li key={task.id}
                               className={task.isDone ? S.isDone : ''}>
                        <input type={'checkbox'}
                               checked={task.isDone}
                               onClick={(e) => onChangeStatusHandler(task.id, e.currentTarget.checked)}/>
                        <span>{task.title}</span>
                        <Button buttonName={'x'}
                                callBack={() => onclickRemoveTask(task.id)}/>
                    </li>
                })
            }
        </ul>
    return (
        <div className={S.tasklist}>
            {listItems}
            <div>
                <Button buttonName={'All'}
                        callBack={onclickSetAllFilter}
                        className={filter === 'all' ? 'active-filter' : ''}/>
                <Button buttonName={'Active'}
                        callBack={onclickSetActiveFilter}
                        className={filter === 'active' ? 'active-filter' : ''}/>
                <Button buttonName={'Completed'}
                        callBack={onclickSetCompletedFilter}
                        className={filter === 'completed' ? 'active-filter' : ''}/>
            </div>
        </div>
    );
};