import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuButton } from '../MenuButton/MenuButton';
import { Theme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


type ButtonAppBarProps = {
  theme: Theme
  changeModeHandler: () => void
}

export default function ButtonAppBar({theme, changeModeHandler}: ButtonAppBarProps) {

  const boxStyles = {
      flexGrow: 1,
      marginBottom: '40px'
  }

  const iconStyles = {
    mr: 2
  }

  const typographyStyles = {
    flexGrow: 1
  }

  return (
    <Box sx={boxStyles}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={iconStyles}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={typographyStyles}>
            TODO
          </Typography>
          <MenuButton color='inherit'
                      theme={theme}
                      background={'#0275f8'}>Login</MenuButton>
          <MenuButton color='inherit'>Logout</MenuButton>
          <MenuButton color='inherit'
                      theme={theme}
                      background={theme.palette.primary.dark}>Faq</MenuButton>
          {/*Day & night*/}
          <IconButton sx={{ ml: 1 }} onClick={changeModeHandler} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}