import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    let tasksInit: Array<TaskType> = [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false }
    ]

    let todoListTitle = 'What to do';

    let [tasks, setTasks] = useState<Array<TaskType>>(tasksInit)
    let [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (id: string): void => {
        let filteredTasks: Array<TaskType> = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
    }

    const changeFilter = (value: FilterValuesType): void => {
        setFilter(value);
    }

    let tasksForTodoList = tasks;
    if (filter === 'active') tasksForTodoList = tasks.filter(task => !task.isDone);
    if (filter === 'completed') tasksForTodoList = tasks.filter(task => task.isDone);



    return (
        <div className='App'>
            <Todolist title={todoListTitle}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}


export default App;
