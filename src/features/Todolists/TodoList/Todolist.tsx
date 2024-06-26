import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { TasksList } from './TasksList/TasksList';
import { Button } from '../../../components/Button';
import S from './TodoList.module.css';
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { addTaskTC, changeTodoListTitleTC, fetchTasksTC, FilterValuesType, removeTodoListTC } from '../reducers';
import { TaskType } from '../../../api/task-api';

type TodolistPropsType = {
    todolistID: string
    title: string
    filter: FilterValuesType
}

export const Todolist: FC<TodolistPropsType> = memo((props) => {
    const [isTaskListCollapsed, setTaskListCollapsed] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const tasks = useAppSelector<TaskType[]>( (state) => state.tasks[props.todolistID]);
    // const tasks = useSelector<AppRootState, TaskType[]>( state => tasksSelector(state, props.todolistID)); // see tasksSelector.ts

    useEffect(() => {
      dispatch(fetchTasksTC(props.todolistID));
    }, [props.todolistID])


    const onClickRemoveTodolist = useCallback(() => {
        dispatch(removeTodoListTC(props.todolistID))
    }, [dispatch, props.todolistID])

    const onClickTasksListCollapseToggle = useCallback(() => {
        setTaskListCollapsed(!isTaskListCollapsed);
    }, [setTaskListCollapsed, isTaskListCollapsed])

    const unCollapseTasksList = useCallback(() => {
        setTaskListCollapsed(true);
    }, [setTaskListCollapsed])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(props.todolistID, title))
        unCollapseTasksList();
    }, [dispatch, unCollapseTasksList, props.todolistID])

    const updateTodolistHandler = useCallback((newTitle: string) => {
        dispatch(changeTodoListTitleTC(props.todolistID, newTitle));
    }, [dispatch, props.todolistID])

    const tasksList = <Paper elevation={4} sx={{
        backgroundColor: 'rgba(240,239,239,0.74)'
    }}>
                         <TasksList todolistID={props.todolistID}
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