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
import { useAppDispatch, useAppSelector } from './store';
import LinearProgress from '@mui/material/LinearProgress';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackBar';
import { statusSelector } from './selectors/appSelectors';
import { Status } from './reducers/appReducer';


type CustomThemeMode = 'dark' | 'light'

const App = () => {
    const [customThemeMode, setCustomThemeMode] = useState<CustomThemeMode>('light');
    const dispatch = useAppDispatch();
    const appStatus = useAppSelector<Status>(statusSelector);
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

    const linearProgressStyles = {
        position: 'absolute',
            top: 64, // fix
            left: 0,
            right: 0,
            zIndex: 5,
    }

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/*CssBaseline is used for Day & Night toggling*/}
        <div className='App'>
            <ButtonAppBar theme={theme}
                          changeModeHandler={changeModeHandler}
            />
            {appStatus === 'loading' && <LinearProgress color={'success'} sx={linearProgressStyles}/>}
            <ErrorSnackbar />
                <Container maxWidth='xl' fixed sx={{marginTop: '40px'}}>
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