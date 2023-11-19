import React, {FC} from 'react';
import {FilterValuesType, TaskType} from '../App';
import {Button} from './Button';
import {TasksList} from './TasksList';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
}

export const Todolist: FC<TodolistPropsType> = (props) => {

    return (
        <div className='todolist'>
            <h2>{props.title}</h2>
            <input/>
            <button>+</button>

            <TasksList tasks={props.tasks}
                       removeTask={props.removeTask}
                       changeFilter={props.changeFilter}/>
        </div>
    );
};