import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {

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
            News
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}