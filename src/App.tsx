import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/TodoList/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import { Button } from '@mui/material';


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
    const todolistID_1 = v1();
    const todolistID_2 = v1();

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID_1, title: 'What to do', filter: 'all'},
        {id: todolistID_2, title: 'What to ask', filter: 'all'}
    ])


    const tasksInit: TasksType = {
        [todolistID_1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false }
        ],
        [todolistID_2]: [
            { id: v1(), title: "Age", isDone: true },
            { id: v1(), title: "Weight", isDone: true },
            { id: v1(), title: "Height", isDone: false }
        ]
    }

    const [tasks, setTasks] = useState<TasksType>(tasksInit);

    const addTask = (todolistID: string, value: string): void => {
        const newTask: TaskType = {
            id: v1(),
            title: value,
            isDone: false
        }
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
    }

    const removeTask = (todolistID: string, taskId: string): void => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskId)});
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone} : t)});
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl));
    }

    function addTodolist(newTitle: string) {
        const newTodolistID = v1();
        const newTodolist: TodolistType = {id: newTodolistID, title: newTitle, filter: 'all'};
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newTodolistID]: []});
    }

    function removeTodolist(todolistID: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistID));
        delete tasks[todolistID];
    }

    function updateTask(todolistID: string, taskID: string, newTitle: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, title: newTitle} : t)})
    }

    function updateTodolist(todolistID: string, newTitle: string) {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title: newTitle} : tl));
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