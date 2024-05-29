import React, {FC, useState} from 'react';
import {FilterValuesType, TaskType} from '../../AppWithRedux';
import {TasksList} from '../TasksList/TasksList';
import {Button} from '../Button';
import S from './TodoList.module.css';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';

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
    const [isTaskListCollapsed, setTaskListCollapsed] = useState<boolean>(true);

    const onClickDeleteTodolist = () => {
        props.removeTodolist(props.todolistID);
    }

    const onClickTasksListCollapseToggle = () => {
        setTaskListCollapsed(!isTaskListCollapsed);
    }

    const addTaskAndUnCollapseTasksList = (title: string) => {
        props.addTask(props.todolistID, title);
        setTaskListCollapsed(true);
    }

    const updateTodolistHandler = (newTitle: string) => {
        props.updateTodolist(props.todolistID, newTitle);
    }

    const tasksList = <TasksList todolistID={props.todolistID}
                                tasks={props.tasks}
                                removeTask={props.removeTask}
                                changeFilter={props.changeFilter}
                                changeStatus={props.changeStatus}
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
            <AddItemForm addItem={addTaskAndUnCollapseTasksList} />
            <div>
                <Button buttonName={isTaskListCollapsed ? 'Hide tasks list' : 'Show tasks list'}
                        onClickCallBack={onClickTasksListCollapseToggle}/>
                <div className={S.counterWrapper}>
                    <span>All tasks:</span>
                    <span className={S.counter}>{props.tasks.length}</span>
                </div>
            </div>
            {isTaskListCollapsed ? tasksList : null}
        </div>
    );
};