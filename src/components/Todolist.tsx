import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {TaskType} from '../App';
import {TasksList} from './TasksList';
import {Input} from './Input';
import {Button} from './Button';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (value: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist: FC<TodolistPropsType> = (props) => {
    let [inputTitle, setInputTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (inputTitle.trim() !== '') {
            props.addTask(inputTitle.trim());
            setInputTitle('');
        } else {
            setInputTitle('');
            setError('Field is required');
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => setInputTitle(event.currentTarget.value);

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTask();
        }
    }

    return (
        <div className='todolist'>
            <h2>{props.title}</h2>
            <Input title={inputTitle}
                   onChangeCallback={onChangeInputHandler}
                   onKeyDownCallback={onKeyDownHandler}
                   className={error ? 'error' : ''}/>
            <Button buttonName={'+'} callBack={addTask}/>
            {error && <div className={'error-message'}>{error}</div>}
            <TasksList tasks={props.tasks}
                       removeTask={props.removeTask}
                       changeStatus={props.changeStatus}/>
        </div>
    );
};