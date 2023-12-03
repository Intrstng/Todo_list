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
    const MAX_INPUT_TITLE_LENGTH = 20;
    let [inputTitle, setInputTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const maxTitleLengthError = inputTitle.length > MAX_INPUT_TITLE_LENGTH; // лучше пробрасывать через пропс, т.к. это не самый лучший способ

    const addTask = () => {
        if (inputTitle.trim() !== '' && !maxTitleLengthError) {
            props.addTask(inputTitle.trim());
            //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            setInputTitle('');
            setError(null);
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(event.currentTarget.value);
        if ((event.currentTarget.value.length === MAX_INPUT_TITLE_LENGTH || event.currentTarget.value) && !(event.currentTarget.value.length >= MAX_INPUT_TITLE_LENGTH + 1)) {
            setError(null);
        } else if (event.currentTarget.value.length === MAX_INPUT_TITLE_LENGTH + 1) {
            setError('Your task title is too long. Please, enter correct title.');
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputTitle.trim() === '') {
            setError('Field is required...');
            setInputTitle('');
        } else if (e.key === 'Enter' && !maxTitleLengthError
            && inputTitle) {
            addTask();
            setError(null);
        }
    }

    return (
        <div className='todolist'>
            <h2>{props.title}</h2>
            <Input value={inputTitle}
                   onChangeCallback={onChangeInputHandler}
                   onKeyDownCallback={onKeyDownHandler}
                   className={error ? 'error' : ''}/>
            <Button buttonName={'+'}
                    callBack={addTask}
                    isDisabled={!inputTitle || maxTitleLengthError}/>
            {error && <div className={'error-message'}>{error}</div>}
            <TasksList tasks={props.tasks}
                       removeTask={props.removeTask}
                       changeStatus={props.changeStatus}/>
        </div>
    );
};