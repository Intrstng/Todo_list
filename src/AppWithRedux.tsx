import React, { useState } from 'react';
import './App.css';
import { Todolist } from './components/TodoList/Todolist';
import { AddItemForm } from './components/AddItemForm/AddItemForm';
import { Grid } from '@mui/material';
import { addTodolistAC } from './components/state/todoListsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './components/state/store';
import ButtonAppBar from './components/ButtonAppBar/ButtonAppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { createTheme, Theme, ThemeOptions, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'


type CustomThemeMode = 'dark' | 'light'

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
    const [customThemeMode, setCustomThemeMode] = useState<CustomThemeMode>('light')

    const theme: Theme = createTheme({
        palette: {
            mode: customThemeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },
        },
    } as ThemeOptions);

    const changeModeHandler = () => {
        setCustomThemeMode(customThemeMode === 'light' ? 'dark' : 'light');
    }

    function addTodolist(newTitle: string) {
        dispatch(addTodolistAC(newTitle));  // !!!!!!! один dispatch и action
    }

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/*CssBaseline is used for Day & Night toggling*/}
        <div className='App'>
            <ButtonAppBar theme={theme}
                          changeModeHandler={changeModeHandler}
            />
                <Container maxWidth='xl' fixed>
                    <AddItemForm addItem={addTodolist}
                                 className={'inputForm'}
                                 titleBtn={'Add todolist'}
                                 label={'Create TODO'}/>

                    <Grid container spacing={2}>
                        {
                            todoLists.map(tl => <Grid item key={tl.id}>
                                                    <Paper elevation={3}>
                                                        <Todolist todolistID={tl.id}
                                                                  title={tl.title}
                                                                  tasks={tasks[tl.id]}
                                                                  filter={tl.filter}/>
                                                    </Paper>
                                                </Grid>
                            )
                        }
                    </Grid>
                </Container>
        </div>
      </ThemeProvider>
    );
}

export default App;