import React, { useEffect, useState, FocusEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { todolistApi } from '../api/todolist-api';
import { ResponseGetTasksType, taskApi, TaskType } from '../api/task-api';
import { ResponseType } from '../api/todolist-api';

export default {
  title: 'API',
};

// export const GetAllTasks = () => {
//     const [state, setState] = useState<ResponseGetTasksType | null>(null);
//     useEffect(() => {
//         const todoID = 'a03a2417-0606-46ae-893b-4ed8ed66119f';
//         taskApi.getAllTasks(todoID)
//             .then(response => setState(response.data))
//     }, [])
//     return <div>
//         <div>Place current todolist id to GetAllTasks function in tasks-api.stories.ts</div>
//         {JSON.stringify(state)}</div>
// }

export const GetAllTasks = () => {
  const [state, setState] = useState<ResponseGetTasksType | null>(null);
  const [todoID, setTodoID] = useState<string>('');
  // useEffect(() => {
  //     const todoID = 'a03a2417-0606-46ae-893b-4ed8ed66119f';
  //     taskApi.getAllTasks(todoID)
  //         .then(response => setState(response.data))
  // }, [])

  const onChangeSetTodoID = (e: FocusEvent<HTMLInputElement>) => {
    setTodoID(e.currentTarget.value);
  };

  const onClickGetTaskOfTodoListHandler = () => {
    taskApi.getAllTasks(todoID).then((response) => setState(response.data));
    setTodoID('');
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input type={'text'} value={todoID} placeholder={'Enter todoList ID...'} onChange={onChangeSetTodoID} />
      <button onClick={onClickGetTaskOfTodoListHandler}>Get tasks of todolist</button>
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<ResponseType<{ item: TaskType }> | null>(null);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [todoID, setTodoID] = useState<string>('');
  // useEffect(() => {
  //     const todoID = 'a03a2417-0606-46ae-893b-4ed8ed66119f';
  //     const data = {
  //         title: 'Title for new Task'
  //     }
  //     taskApi.createTask(todoID, data)
  //         .then(response => setState(response.data))
  // }, [])

  const onChangeSetTodoID = (e: FocusEvent<HTMLInputElement>) => {
    setTodoID(e.currentTarget.value);
  };

  const onChangeSetTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
  };

  const onClickCreateTaskHandler = () => {
    const data = {
      title: taskTitle,
    };
    taskApi.createTask(todoID, data).then((response) => setState(response.data));
    setTaskTitle('');
    setTodoID('');
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input type={'text'} value={todoID} placeholder={'Enter todoList ID...'} onChange={onChangeSetTodoID} />
        <input type={'text'} value={taskTitle} placeholder={'Enter task title...'} onChange={onChangeSetTaskTitle} />
        <button onClick={onClickCreateTaskHandler}>Create new task</button>
      </div>
    </div>
  );
};

export const UpdateTask = () => {
  const [state, setState] = useState<ResponseType<{ item: TaskType }> | null>(null);
  const [todoID, setTodoID] = useState<string>('');
  const [taskID, setTaskID] = useState<string>('');
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskStatus, setTaskStatus] = useState<number>(0);
  const [taskPriority, setTaskPriority] = useState<number>(0);
  const [taskStartDate, setTaskStartDate] = useState<Date>(new Date());
  const [taskDeadline, setTaskDeadline] = useState<Date>(new Date());
  // useEffect(() => {
  //     const todoID = 'a03a2417-0606-46ae-893b-4ed8ed66119f';
  //     const taskID = 'e266ffeb-af3b-4dde-8f38-04e8a197c5ac';
  //     const data = {
  //         title: 'Another title',
  //         // description: 'Some new description',
  //         // status: 21,
  //         // priority: 5,
  //         // startDate: new Date(),
  //         // deadline: new Date(),
  //     }
  //     taskApi.updateTask(todoID, taskID, data)
  //         .then(response => setState(response.data))
  //         .catch(err => console.log(err.message))
  // }, [])

  const onChangeSetTodoID = (e: FocusEvent<HTMLInputElement>) => {
    setTodoID(e.currentTarget.value);
  };

  const onChangeSetTaskID = (e: FocusEvent<HTMLInputElement>) => {
    setTaskID(e.currentTarget.value);
  };

  const onChangeSetTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
  };

  const onClickUpdateTaskHandler = () => {
    const model = {
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
      priority: taskPriority,
      startDate: taskStartDate,
      deadline: taskDeadline,
    };
    taskApi
      .updateTask(todoID, taskID, model)
      .then((response) => setState(response.data))
      .catch((err) => console.log(err.message));
    setTodoID('');
    setTaskID('');
    setTaskTitle('');
  };

  const onChangeSetTaskDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.currentTarget.value);
  };
  const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskStatus(+e.currentTarget.value);
  };
  const onChangeSetTaskPriority = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskPriority(+e.currentTarget.value);
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input type={'text'} value={taskID} placeholder={'Enter task ID...'} onChange={onChangeSetTaskID} />
      <input type={'text'} value={todoID} placeholder={'Enter todoList ID...'} onChange={onChangeSetTodoID} />

      <div>
        <input type={'text'} value={taskTitle} placeholder={'Enter task title...'} onChange={onChangeSetTaskTitle} />
        <input
          type={'text'}
          value={taskDescription}
          placeholder={'Enter task description...'}
          onChange={onChangeSetTaskDescription}
        />

        <label htmlFor="task-status">Task Status:</label>
        <input
          type={'number'}
          id={'task-status'}
          value={taskStatus}
          placeholder={'Enter task status...'}
          onChange={onChangeSetTaskStatus}
        />

        <label htmlFor="task-priority">Task Priority:</label>
        <input
          type={'number'}
          id={'task-priority'}
          value={taskPriority}
          placeholder={'Enter task priority...'}
          onChange={onChangeSetTaskPriority}
        />
      </div>

      <button onClick={onClickUpdateTaskHandler}>Update task</button>
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<ResponseType | null>(null);
  // useEffect(() => {
  //     const todoID = 'a03a2417-0606-46ae-893b-4ed8ed66119f';
  //     const taskID = '702c8db0-e13c-417e-88e1-9fe77e7d3e51';
  //     taskApi.deleteTask(todoID, taskID)
  //         .then(response => setState(response.data))
  //         .catch(err => console.log(err.message))
  // }, [])

  const [todoID, setTodoID] = useState<string>('');
  const [taskID, setTaskID] = useState<string>('');

  const onClickDeleteTaskHandler = () => {
    taskApi
      .deleteTask(todoID, taskID)
      .then((response) => setState(response.data))
      .catch((err) => console.log(err.message));
    setTodoID('');
    setTaskID('');
  };

  const onChangeSetTodoID = (e: FocusEvent<HTMLInputElement>) => {
    setTodoID(e.currentTarget.value);
  };

  const onChangeSetTaskID = (e: FocusEvent<HTMLInputElement>) => {
    setTaskID(e.currentTarget.value);
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input type={'text'} value={taskID} placeholder={'Enter task ID...'} onChange={onChangeSetTaskID} />
        <input type={'text'} value={todoID} placeholder={'Enter todoList ID...'} onChange={onChangeSetTodoID} />
        <button onClick={onClickDeleteTaskHandler}>Delete task</button>
      </div>
    </div>
  );
};
