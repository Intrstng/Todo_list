import React, {FC, useState} from 'react';
import {Button} from './Button';
import {FilterValuesType, TaskType} from '../App';

type TasksListType = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
}

export const TasksList: FC<TasksListType> = (props) => {
    let [filter, setFilter] = useState<FilterValuesType>('all')

    const onclickSetAllFilter = () => setFilter('all');
    const onclickSetActiveFilter = () => setFilter('active');
    const onclickSetCompletedFilter = () => setFilter('completed');

    let tasksForTodoList = filter === 'active' ? props.tasks.filter(task => !task.isDone)
        : filter === 'completed' ? props.tasks.filter(task => task.isDone)
            : props.tasks;

    const listItems: JSX.Element = tasksForTodoList.length === 0
        ? <span>No tasks in list. Add task...</span>
        : <ul>
            {
                tasksForTodoList.map(task => {
                    const onclickRemoveTask = () => props.removeTask(task.id);

                    return <li key={task.id}>
                        <input type={'checkbox'} checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button buttonName={'x'} callBack={onclickRemoveTask}/>
                    </li>

                })
            }
        </ul>
    return (
        <div className={'tasklist'}>
            {listItems}
            <div>
                <Button buttonName={'All'} callBack={onclickSetAllFilter}/>
                <Button buttonName={'Active'} callBack={onclickSetActiveFilter}/>
                <Button buttonName={'Completed'} callBack={onclickSetCompletedFilter}/>
            </div>
        </div>
    );
};