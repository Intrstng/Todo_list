import React, {FC} from 'react';
import {Button} from './Button';
import {FilterValuesType, TaskType} from '../App';

type TasksListType = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
}

export const TasksList: FC<TasksListType> = (props) => {

    const listItems = props.tasks.map(task => {
        const onclickRemoveTask = () => props.removeTask(task.id);

        return <li key={task.id}>
            <input type={'checkbox'} checked={task.isDone}/>
            <span>{task.title}</span>
            <Button buttonName={'x'} callBack={onclickRemoveTask}/>
        </li>
    })
    return (
        <>
            <ul>
                {listItems}
            </ul>

            <Button buttonName={'All'} callBack={() => props.changeFilter('all')}/>
            <Button buttonName={'Active'} callBack={() => props.changeFilter('active')}/>
            <Button buttonName={'Completed'} callBack={() => props.changeFilter('completed')}/>
        </>
    );
};