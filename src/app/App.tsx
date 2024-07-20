import React, { useEffect, useState } from 'react'
import './App.css'
import { Grid } from '@mui/material'
import ButtonAppBar from '../components/ButtonAppBar/ButtonAppBar'
import Container from '@mui/material/Container'
import { createTheme, Theme, ThemeOptions, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useAppDispatch, useAppSelector } from './store'
import LinearProgress from '@mui/material/LinearProgress'
import { ErrorSnackbar } from 'components/ErrorSnackbar/ErrorSnackBar'
import { isInitializedSelector, statusSelector } from './selectors/appSelectors'
import { initializeAppTC, Status } from 'app/slices/appSlice'
import { Outlet } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'

type CustomThemeMode = 'dark' | 'light';

const App = () => {
  const dispatch = useAppDispatch()
  const [customThemeMode, setCustomThemeMode] = useState<CustomThemeMode>('light')
  const appStatus = useAppSelector<Status>(statusSelector)
  const isInitialized = useAppSelector<boolean>(isInitializedSelector)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <div className='loaderContainer'>
        <CircularProgress color='secondary' />
      </div>
    )
  }

  const theme: Theme = createTheme({
    palette: {
      mode: customThemeMode === 'light' ? 'light' : 'dark',
      primary: {
        main: '#087EA4'
      }
    }
  } as ThemeOptions)

  const changeModeHandler = () => {
    setCustomThemeMode(customThemeMode === 'light' ? 'dark' : 'light')
  }

  const linearProgressStyles = {
    position: 'absolute',
    top: 64, // fix
    left: 0,
    right: 0,
    zIndex: 5
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/*CssBaseline is used for Day & Night toggling*/}
      <div className='App'>
        <ButtonAppBar theme={theme} changeModeHandler={changeModeHandler} />
        {appStatus === 'loading' && <LinearProgress color={'success'} sx={linearProgressStyles} />}
        <ErrorSnackbar />
        <Container maxWidth='xl' fixed sx={{ marginTop: '40px' }}>
          <Grid container spacing={2}>
            <Outlet />
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default App
