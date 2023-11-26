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

    let [tasks, setTasks] = useState<Array<TaskType>>(tasksInit);

    const addTask = (value: string): void => {
        let newTask: TaskType = {
            id: v1(),
            title: value,
            isDone: false
        }
        setTasks([newTask, ...tasks]);
    }

    const removeTask = (id: string): void => {
        let filteredTasks: Array<TaskType> = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(task => task.id === taskId)
        if (task) {
            task.isDone = isDone;
        }
        setTasks( [...tasks ]);
    }

    return (
        <div className='App'>
            <Todolist title={todoListTitle}
                      tasks={tasks}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeStatus={changeStatus}/>
        </div>
    );
}

export default App;