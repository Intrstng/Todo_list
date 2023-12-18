import React, {ChangeEvent, FC, KeyboardEvent, FocusEvent, useState} from 'react';
import {FilterValuesType, TaskType} from '../../App';
import {TasksList} from '../TaskList/TasksList';
import {Input} from '../Input';
import {Button} from '../Button';
import S from './TodoList.module.css';
import {useAutoAnimate} from '@formkit/auto-animate/react';

type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: TaskType[]
    maxInputTitleLength: number
    removeTask: (todolistID: string, taskId: string) => void
    addTask: (todolistID: string, value: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistID: string) => void
    filter: FilterValuesType
}

export const Todolist: FC<TodolistPropsType> = (props) => {
    const [inputTitle, setInputTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isTaskListCollapsed, setTaskListCollapsed] = useState<boolean>(true);
    const [textRef] = useAutoAnimate<HTMLParagraphElement>();
    const [currentTasksQuantityToShow, setCurrentTasksQuantityToShow] = useState<number>(props.tasks.length);

    const maxTitleLengthError = inputTitle.length > props.maxInputTitleLength;

    const addTask = () => {
        if (inputTitle.trim() !== '' && !maxTitleLengthError) {
            props.addTask(props.todolistID, inputTitle.trim());
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

    const onClickDeleteTodolist = () => {
        props.removeTodolist(props.todolistID);
    }

    const onClickTasksListCollapseToggle = () => {
        setTaskListCollapsed(!isTaskListCollapsed);
    }

    const setCurrentTasksQuantity = (currentTasks: TaskType[]) => {
        setCurrentTasksQuantityToShow(currentTasks.length);
    }

    const taskList = <TasksList todolistID={props.todolistID}
                                tasks={props.tasks}
                                removeTask={props.removeTask}
                                changeFilter={props.changeFilter}
                                changeStatus={props.changeStatus}
                                setCurrentTasksQuantity={setCurrentTasksQuantity}
                                filter={props.filter}
    />

    return (
        <div className={S.todolist}>
            <div className={S.todolist__titleContent}><h2 className={S.todolist__title}>{props.title}</h2>
                <Button buttonName={'x'}
                        onClickCallBack={onClickDeleteTodolist}/>
            </div>
            <div>
                <Button buttonName={isTaskListCollapsed ? 'Hide tasks list' : 'Show tasks list'}
                        onClickCallBack={onClickTasksListCollapseToggle}/>
                <div className={S.counterWrapper}>
                    <span>All tasks:</span>
                    <span className={S.counter}>{currentTasksQuantityToShow}</span>
                    <span className={S.counter}>{props.tasks.length}</span>
                </div>
            </div>
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