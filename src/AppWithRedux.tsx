import React from 'react';
import './App.css';
import {Todolist} from './components/TodoList/Todolist';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {Button} from '@mui/material';
import {addTodolistAC} from './components/state/todoListsReducer';
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
    const todoLists = useSelector<AppRootState, TodolistType[]>( (state) => state.todolists );
    const tasks = useSelector<AppRootState, TasksType>( (state) => state.tasks);

    function addTodolist(newTitle: string) {
        dispatch(addTodolistAC(newTitle));  // !!!!!!! один dispatch и action
    }

    return (
        <div className='App'>
            <AddItemForm addItem={addTodolist}
                         className={'inputForm'}
                         titleBtn={'Add todolist'}
                         label={'Create TODO'}/>
            <div className={'todoLists'}>
                {
                    todoLists.map(tl => <Todolist key={tl.id}
                                                  todolistID={tl.id}
                                                  title={tl.title}
                                                  tasks={tasks[tl.id]}
                                                  filter={tl.filter}/>
                    )
                }
            </div>
        </div>
    );
}

export default App;