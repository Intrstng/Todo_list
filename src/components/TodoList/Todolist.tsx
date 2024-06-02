import React, {FC, useState} from 'react';
import { FilterValuesType, TasksType, TaskType } from '../../AppWithRedux';
import {TasksList} from '../TasksList/TasksList';
import {Button} from '../Button';
import S from './TodoList.module.css';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import { addTaskAC } from '../state/tasksReducer';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodolistAC, updateTodolistAC } from '../state/todoListsReducer';
import Paper from '@mui/material/Paper';
import { AppRootState } from '../state/store';
// import { IconButton } from '@material-ui/core';
// import DeleteIcon from '@mui/icons-material/Delete';

type TodolistPropsType = {
    todolistID: string
    title: string
    filter: FilterValuesType
}

export const Todolist: FC<TodolistPropsType> = (props) => {
    const [isTaskListCollapsed, setTaskListCollapsed] = useState<boolean>(true);
    const tasks = useSelector<AppRootState, TaskType[]>( (state) => state.tasks[props.todolistID]);
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

    const tasksList = <Paper elevation={4} sx={{
        backgroundColor: 'rgba(240,239,239,0.74)'
    }}>
                         <TasksList todolistID={props.todolistID}
                                    // tasks={props.tasks}
                                    filter={props.filter}
                         />
                      </Paper>

    const buttonAdditionalStyles = {
        maxWidth: '22px',
        maxHeight: '22px',
        minWidth: '22px',
        minHeight: '22px',
        fontSize: '10px',
    }

    return (
        <div className={S.todolist}>
            <div className={S.todolist__titleContent}>
                <h2 className={S.todolist__title}>
                    <EditableSpan oldTitle={props.title}
                                  callBack={updateTodolistHandler}/>
                </h2>
                <Button buttonName={'x'}
                        variant={'outlined'}
                        color={'error'}
                        onClickCallBack={onClickRemoveTodolist}
                        style={buttonAdditionalStyles}
                />
                {/*Or we can use:*/}
                {/*<IconButton aria-label='delete' onClick={onClickRemoveTodolist}>*/}
                {/*    <DeleteIcon/>*/}
                {/*</IconButton>*/}
            </div>
            <AddItemForm className={'taskForm'}
                         addItem={addTaskAndUnCollapseTasksList}
                         titleBtn={'Add task'}
                         label={'Create task'}
            />
            <div className={S.tasksShowToggle}>
                <Button variant={isTaskListCollapsed ? 'outlined' : 'contained'}
                        color={isTaskListCollapsed ? 'warning' : 'success'}
                        buttonName={isTaskListCollapsed ? 'Hide tasks list' : 'Show tasks list'}
                        onClickCallBack={onClickTasksListCollapseToggle}/>
                <div className={S.counterWrapper}>
                    <span>All tasks:</span>
                    <div className={S.counter}>
                        <span>{tasks.length}</span>
                    </div>
                </div>
            </div>
            {isTaskListCollapsed ? tasksList : null}
        </div>
    );
};