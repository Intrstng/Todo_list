import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { AddItemForm } from '../components/AddItemForm/AddItemForm';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import ButtonAppBar from '../components/ButtonAppBar/ButtonAppBar';
import Container from '@mui/material/Container';
import { createTheme, Theme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { addTodoListTC, fetchTodoListsTC } from '../features/Todolists/reducers';
import { Todolists } from '../features/Todolists/Todolists';
import { AppDispatch } from './store';


type CustomThemeMode = 'dark' | 'light'

const App = () => {
    const [customThemeMode, setCustomThemeMode] = useState<CustomThemeMode>('light');
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodoListsTC());
    }, [])

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

    const addTodolist = useCallback((newTitle: string) => {
        // // For useReducer():
        // const action = removeTodolistAC(id); // !!!!!!!!!!!
        // dispatchTodolists(action); // we cannot use dispatchTodolists(removeTodolistAC(id)) here
        // dispatchTasks(action); // we cannot use dispatchTodolists((removeTodolistAC(id)) here
        //dispatch(addTodolistAC(newTitle));  // !!!!!!! один dispatch и action
        dispatch(addTodoListTC(newTitle));
    }, [dispatch]) // we can remove dispatch from deps

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
                                 label={'Create TODO'} />
                    <Grid container spacing={2}>
                        <Todolists />
                    </Grid>
                </Container>
        </div>
      </ThemeProvider>
    );
}

export default App;