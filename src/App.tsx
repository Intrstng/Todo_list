import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './components/TodoList/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {Button} from '@mui/material';
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    todoListsReducer,
    updateTodolistAC
} from './components/reducers/todoListsReducer';
import {
    addNewTasksListAC,
    addTaskAC,
    changeStatusAC,
    removeTaskAC,
    tasksReducer,
    updateTaskAC
} from './components/reducers/tasksReducer';


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

    const [todolists, dispatchTodolists] = useReducer(todoListsReducer, [
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

    const [tasks, dispatchTasks] = useReducer(tasksReducer, tasksInit);

    const addTask = (todolistID: string, value: string): void => {
        const newTask: TaskType = {
            id: v1(),
            title: value,
            isDone: false
        }
        dispatchTasks(addTaskAC(todolistID, newTask));
    }

    const removeTask = (todolistID: string, taskID: string): void => {
        dispatchTasks(removeTaskAC(todolistID, taskID));
    }

    function changeStatus(todolistID: string, taskID: string, isDone: boolean) {
        dispatchTasks(changeStatusAC(todolistID, taskID, isDone));
    }

    function updateTask(todolistID: string, taskID: string, newTitle: string) {
        dispatchTasks(updateTaskAC(todolistID, taskID, newTitle));
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        dispatchTodolists(changeFilterAC(todolistID, value));
    }

    function addTodolist(newTitle: string) {
        const newTodolistID = v1();
        const newTodolist: TodolistType = {id: newTodolistID, title: newTitle, filter: 'all'};
        dispatchTodolists(addTodolistAC(newTodolist));
        dispatchTasks(addNewTasksListAC(newTodolistID));
    }

    function removeTodolist(todolistID: string) {
        dispatchTodolists(removeTodolistAC(todolistID));
        delete tasks[todolistID];
    }


    function updateTodolist(todolistID: string, newTitle: string) {
        dispatchTodolists(updateTodolistAC(todolistID, newTitle));
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