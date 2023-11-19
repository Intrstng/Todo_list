import React, {FC, useState} from 'react';
import {TaskType} from '../App';
import {TasksList} from './TasksList';
import {Input} from './Input';
import {Button} from './Button';
import {v1} from 'uuid';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    setTasks: (tasks: Array<TaskType>) => void
}

export const Todolist: FC<TodolistPropsType> = (props) => {
    let [inputTitle, setInputTitle] = useState<string>('')

    const addTask = (value: string): void => {
        let newTask: TaskType = {
            id: v1(),
            title: value,
            isDone: false
        }
        props.setTasks([newTask, ...props.tasks]);
    }

    const callbackButtonHandler = () => {
        addTask(inputTitle);
        setInputTitle('');
    }

    return (
        <div className='todolist'>
            <h2>{props.title}</h2>
            <Input title={inputTitle} setTitle={setInputTitle}/>
            <Button buttonName={'+'} callBack={callbackButtonHandler}/>

            <TasksList tasks={props.tasks}
                       removeTask={props.removeTask}/>
        </div>
    );
};