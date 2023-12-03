import React, {ChangeEvent, FC, KeyboardEvent, FocusEvent, useState} from 'react';
import {TaskType} from '../../App';
import {TasksList} from '../TaskList/TasksList';
import {Input} from '../Input';
import {Button} from '../Button';
import S from './TodoList.module.css';
import {useAutoAnimate} from '@formkit/auto-animate/react';

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
    const [textRef] = useAutoAnimate<HTMLParagraphElement>();

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

    const onBlurHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
        setInputTitle(e.currentTarget.value.trim());
    }

    return (
        <div className={S.todolist}>
            <h2>{props.title}</h2>
            <Input value={inputTitle}
                   onChangeCallback={onChangeInputHandler}
                   onKeyDownCallback={onKeyDownHandler}
                   onBlurCallback={onBlurHandler}
                   className={error ? S.error : ''}/>
            <Button buttonName={'+'}
                    callBack={addTask}
                    isDisabled={!inputTitle.trim() || maxTitleLengthError}/>
            {error && <p className={S.errorMessage}
                         ref={textRef}>{error}</p>}
            <TasksList tasks={props.tasks}
                       removeTask={props.removeTask}
                       changeStatus={props.changeStatus}/>
        </div>
    );
};