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
    maxInputTitleLength: number
    removeTask: (id: string) => void
    addTask: (value: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist: FC<TodolistPropsType> = (props) => {

    const [inputTitle, setInputTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isTaskListCollapsed, setTaskListCollapsed] = useState<boolean>(true);
    const [textRef] = useAutoAnimate<HTMLParagraphElement>();

    const maxTitleLengthError = inputTitle.length > props.maxInputTitleLength;

    const addTask = () => {
        if (inputTitle.trim() !== '' && !maxTitleLengthError) {
            props.addTask(inputTitle.trim());
            setInputTitle('');
            setError(null);
            setTaskListCollapsed(true);
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(event.currentTarget.value);
        if ((event.currentTarget.value.length === props.maxInputTitleLength || event.currentTarget.value) && !(event.currentTarget.value.length >= props.maxInputTitleLength + 1)) {
            setError(null);
        } else if (event.currentTarget.value.length === props.maxInputTitleLength + 1) {
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

    const onClickTasksListCollapseToggle = () => {
        setTaskListCollapsed(!isTaskListCollapsed);
        console.log(isTaskListCollapsed)
    }

    const taskList = <TasksList tasks={props.tasks}
                                removeTask={props.removeTask}
                                changeStatus={props.changeStatus}/>

    return (
        <div className={S.todolist}>
            <h2>{props.title}</h2>
            <div>
                <Button buttonName={isTaskListCollapsed ? 'Hide tasks list' : 'Show tasks list'}
                         onClickCallBack={onClickTasksListCollapseToggle}/>
                {/*// Inline-block to div*/}
                <div>
                    <span>All tasks:</span>
                    <span className={S.counter}>{props.tasks.length}</span>
                </div>
            </div>


            {/*All tasks:<div className="info">{tasks.length}</div>*/}
            <div>
                <Input value={inputTitle}
                       onChangeCallback={onChangeInputHandler}
                       onKeyDownCallback={onKeyDownHandler}
                       onBlurCallback={onBlurHandler}
                       className={error ? S.error : ''}/>
                <Button buttonName={'+'}
                        onClickCallBack={addTask}
                        isDisabled={!inputTitle.trim() || maxTitleLengthError}/>
                {error && <p className={S.errorMessage}
                             ref={textRef}>{error}</p>}
            </div>
            {isTaskListCollapsed ? taskList : null}
        </div>
    );
};