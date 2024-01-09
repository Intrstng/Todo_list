import React from 'react';
import './App.css';
import {Todolist} from './components/TodoList/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {Button} from '@mui/material';
import {addTodolistAC, changeFilterAC, removeTodolistAC, updateTodolistAC} from './components/state/todoListsReducer';
import {
    addTaskAC,
    changeStatusAC,
    removeTaskAC,
    updateTaskAC
} from './components/state/tasksReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './components/state/store';


export type FilterValuesType = 'all' | 'active' | 'completed';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksType = {
    [key: string]: TaskType[]
}

function App() {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, TodolistType[]>( (state) => state.todolists );
    const tasks = useSelector<AppRootState, TasksType>( (state) => state.tasks );

    const addTask = (todolistID: string, value: string): void => {
        dispatch(addTaskAC(todolistID, value));
    }

    const removeTask = (todolistID: string, taskID: string): void => {
        dispatch(removeTaskAC(todolistID, taskID));
    }

    function changeStatus(todolistID: string, taskID: string, isDone: boolean) {
        dispatch(changeStatusAC(todolistID, taskID, isDone));
    }

    function updateTask(todolistID: string, taskID: string, newTitle: string) {
        dispatch(updateTaskAC(todolistID, taskID, newTitle));
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        dispatch(changeFilterAC(todolistID, value));
    }

    function addTodolist(newTitle: string) {
        dispatch(addTodolistAC(newTitle));  // !!!!!!! один dispatch и action
        // dispatch(addTodolistAC(newTitle));// !!!!!!! один dispatch и action
    }

    function removeTodolist(todolistID: string) {
        dispatch(removeTodolistAC(todolistID));// !!!!!!! один dispatch и action
        // delete tasks[todolistID]; // !!!!!!! заменить на dispatch //
        // setTasks({...tasks});   ?????????????????
    }

    function updateTodolist(todolistID: string, newTitle: string) {
        dispatch(updateTodolistAC(todolistID, newTitle));
    }

    return (
        <div className='App'>
            <Button variant="contained">Contained</Button>
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => <Todolist key={tl.id}
                                             todolistID={tl.id}
                                             title={tl.title}
                                             tasks={tasks[tl.id]}
                                             removeTask={removeTask}
                                             addTask={addTask}
                                             changeFilter={changeFilter}
                                             changeStatus={changeStatus}
                                             removeTodolist={removeTodolist}
                                             updateTask={updateTask}
                                             updateTodolist={updateTodolist}
                                             filter={tl.filter}/>
                )
            }

        </div>
    );
}

export default App;