import React, {ChangeEvent, FC, KeyboardEvent, FocusEvent, useState, useReducer} from 'react';
import {FilterValuesType, TasksType, TaskType} from '../../App';
import {TasksList} from '../TasksList/TasksList';
import {Input} from '../Input';
import {Button} from '../Button';
import S from './TodoList.module.css';
import {useAutoAnimate} from '@formkit/auto-animate/react';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import {changeIsTaskListCollapsedAC, isTaskListCollapsedReducer} from '../reducers/isTaskListCollapsedReducer';
import {
    changeCurrentTasksQuantityToShowAC,
    currentTasksQuantityToShowReducer
} from '../reducers/currentTasksQuantityToShowReducer';

type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistID: string, taskId: string) => void
    addTask: (todolistID: string, value: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistID: string) => void
    updateTask: (todolistID: string, taskID: string, newTitle: string) => void
    updateTodolist: (todolistID: string, newTitle: string) => void
    filter: FilterValuesType
}

export const Todolist: FC<TodolistPropsType> = (props) => {
    const [isTaskListCollapsed, dispatchIsListCollapsed] = useReducer(isTaskListCollapsedReducer, true);
    const [currentTasksQuantityToShow, dispatchCurrentTasksQuantityToShow] = useReducer(currentTasksQuantityToShowReducer, props.tasks.length);

    const onClickDeleteTodolist = () => {
        props.removeTodolist(props.todolistID);
    }

    const onClickTasksListCollapseToggle = () => {
        dispatchIsListCollapsed(changeIsTaskListCollapsedAC(!isTaskListCollapsed));
    }

    const setCurrentTasksQuantity = (currentTasks: TaskType[]) => {
        dispatchCurrentTasksQuantityToShow(changeCurrentTasksQuantityToShowAC(currentTasks.length));
    }

    const addTaskAndUnCollapseTasksList = (title: string) => {
        props.addTask(props.todolistID, title);
        dispatchIsListCollapsed(changeIsTaskListCollapsedAC(true));
    }

    const updateTodolistHandler = (newTitle: string) => {
        props.updateTodolist(props.todolistID, newTitle);
    }

    const tasksList = <TasksList todolistID={props.todolistID}
                                tasks={props.tasks}
                                removeTask={props.removeTask}
                                changeFilter={props.changeFilter}
                                changeStatus={props.changeStatus}
                                setCurrentTasksQuantity={setCurrentTasksQuantity}
                                updateTask={props.updateTask}
                                filter={props.filter}
    />

    return (
        <div className={S.todolist}>
            <div className={S.todolist__titleContent}><h2 className={S.todolist__title}>
                <EditableSpan oldTitle={props.title}
                              callBack={updateTodolistHandler}/>
            </h2>
                <Button buttonName={'x'}
                        onClickCallBack={onClickDeleteTodolist}/>
            </div>
            <div>
                <Button buttonName={isTaskListCollapsed ? 'Hide tasks list' : 'Show tasks list'}
                        onClickCallBack={onClickTasksListCollapseToggle}/>
                <div className={S.counterWrapper}>
                    <span>All tasks:</span>
                    {isTaskListCollapsed && <span className={S.counter}>{currentTasksQuantityToShow}</span>}
                    <span className={S.counter}>{props.tasks.length}</span>
                </div>
            </div>
            <AddItemForm addItem={addTaskAndUnCollapseTasksList}
                />
            {isTaskListCollapsed ? tasksList : null}
        </div>
    );
};