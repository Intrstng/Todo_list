import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/TodoList/Todolist';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    const MAX_INPUT_TITLE_LENGTH = 20;
    const TODO_LIST_TITLE = 'What to do';
    const tasksInit: TaskType[] = [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false }
    ]

    let [tasks, setTasks] = useState<TaskType[]>(tasksInit);

    const addTask = (value: string): void => {
        let newTask: TaskType = {
            id: v1(),
            title: value,
            isDone: false
        }
        setTasks([newTask, ...tasks]);
    }

    const removeTask = (id: string): void => {
        let filteredTasks: TaskType[] = tasks.filter(task => task.id !== id);
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
            <Todolist title={TODO_LIST_TITLE}
                      tasks={tasks}
                      maxInputTitleLength={MAX_INPUT_TITLE_LENGTH}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeStatus={changeStatus}/>
        </div>
    );
}

export default App;