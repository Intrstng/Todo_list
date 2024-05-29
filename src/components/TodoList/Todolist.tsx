import React, {FC, useState} from 'react';
import {FilterValuesType, TaskType} from '../../AppWithRedux';
import {TasksList} from '../TasksList/TasksList';
import {Button} from '../Button';
import S from './TodoList.module.css';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import { addTaskAC } from '../state/tasksReducer';
import { useDispatch } from 'react-redux';
import { removeTodolistAC, updateTodolistAC } from '../state/todoListsReducer';

type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
}

export const Todolist: FC<TodolistPropsType> = (props) => {
    const [isTaskListCollapsed, setTaskListCollapsed] = useState<boolean>(true);
    const dispatch = useDispatch();

    const onClickRemoveTodolist = () => {
        dispatch(removeTodolistAC(props.todolistID))
    }

    const onClickTasksListCollapseToggle = () => {
        setTaskListCollapsed(!isTaskListCollapsed);
    }

    const addTaskAndUnCollapseTasksList = (title: string) => {
        dispatch(addTaskAC(props.todolistID, title));
        setTaskListCollapsed(true);
    }

    const updateTodolistHandler = (newTitle: string) => {
        dispatch(updateTodolistAC(props.todolistID, newTitle));
    }

    const tasksList = <TasksList todolistID={props.todolistID}
                                 tasks={props.tasks}
                                 filter={props.filter}
    />

    return (
        <div className={S.todolist}>
            <div className={S.todolist__titleContent}><h2 className={S.todolist__title}>
                <EditableSpan oldTitle={props.title}
                              callBack={updateTodolistHandler}/>
            </h2>
                <Button buttonName={'x'}
                        onClickCallBack={onClickRemoveTodolist}/>
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