import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { TasksList } from '../TasksList/TasksList';
import { Button } from '../Button';
import S from './TodoList.module.css';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import { AppRootState, AppThunkDispatch } from '../state/store';
import {
    addTaskAC, addTaskTC, changeTodoListTitleTC,
    fetchTasksTC,
    fetchTodoListsTC,
    FilterValuesType,
    removeTodolistAC, removeTodoListTC,
    updateTodolistAC
} from '../state/reducers';
import { tasksSelector } from '../state/selectors';
import { TaskType } from '../../api/task-api';
// import { IconButton } from '@material-ui/core';
// import DeleteIcon from '@mui/icons-material/Delete';

type TodolistPropsType = {
    todolistID: string
    title: string
    filter: FilterValuesType
}

export const Todolist: FC<TodolistPropsType> = memo((props) => {
    const [isTaskListCollapsed, setTaskListCollapsed] = useState<boolean>(true);

    const dispatch: AppThunkDispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchTasksTC(props.todolistID));
    }, [props.todolistID])

    const tasks = useSelector<AppRootState, TaskType[]>( (state) => state.tasks[props.todolistID]);
    // const tasks = useSelector<AppRootState, TaskType[]>( state => tasksSelector(state, props.todolistID)); // see tasksSelector.ts

    const onClickRemoveTodolist = useCallback(() => {
        // dispatch(removeTodolistAC(props.todolistID))
        dispatch(removeTodoListTC(props.todolistID))
    }, [dispatch, props.todolistID])

    const onClickTasksListCollapseToggle = useCallback(() => {
        setTaskListCollapsed(!isTaskListCollapsed);
    }, [setTaskListCollapsed, isTaskListCollapsed])

    const unCollapseTasksList = useCallback(() => {
        setTaskListCollapsed(true);
    }, [setTaskListCollapsed])

    const addTask = useCallback((title: string) => {
        // dispatch(addTaskAC(props.todolistID, title));
        dispatch(addTaskTC(props.todolistID, title))
        unCollapseTasksList();
    }, [dispatch, unCollapseTasksList, props.todolistID])

    const updateTodolistHandler = useCallback((newTitle: string) => {
        // dispatch(updateTodolistAC(props.todolistID, newTitle));
        dispatch(changeTodoListTitleTC(props.todolistID, newTitle));
    }, [dispatch, props.todolistID])

    const tasksList = <Paper elevation={4} sx={{
        backgroundColor: 'rgba(240,239,239,0.74)'
    }}>
                         <TasksList todolistID={props.todolistID}
                                    // tasks={props.tasks}
                                    filter={props.filter}
                         />
                      </Paper>

    const inputFieldStyle = useMemo(() => ({
        maxWidth: '220px',
        maxHeight: '30px',
        minWidth: '220px',
        minHeight: '30px',
        overflow: 'hidden'
    }), []);

    const buttonAdditionalStyles = useMemo(() => ({
        maxWidth: '26px',
        maxHeight: '26px',
        minWidth: '26px',
        minHeight: '26px',
        fontSize: '14px',
    }), []);

    const toggleShowTasksListBtnName = isTaskListCollapsed ? 'Hide tasks list' : 'Show tasks list';

    return (
        <div className={S.todolist}>
            <div className={S.todolist__titleContent}>
                <h2 className={S.todolist__title}>
                    <EditableSpan oldTitle={props.title}
                                  style={inputFieldStyle}
                                  onBlurCallBack={updateTodolistHandler}/>
                </h2>
                <Button variant={'outlined'}
                        color={'error'}
                        onClickCallBack={onClickRemoveTodolist}
                        style={buttonAdditionalStyles}>x
                </Button>
                {/*Or we can use:*/}
                {/*<IconButton aria-label='delete' onClick={onClickRemoveTodolist}>*/}
                {/*    <DeleteIcon/>*/}
                {/*</IconButton>*/}
            </div>
            <AddItemForm className={'taskForm'}
                         addItem={addTask}
                         titleBtn={'Add task'}
                         label={'Create task'}
            />
            <div className={S.tasksShowToggle}>
                <Button variant={isTaskListCollapsed ? 'outlined' : 'contained'}
                        color={isTaskListCollapsed ? 'warning' : 'success'}
                        onClickCallBack={onClickTasksListCollapseToggle}>{toggleShowTasksListBtnName}
                </Button>
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
});