import React from 'react';
import './App.css';
import AppBar  from '@mui/material/AppBar';
import  Button from '@mui/material/Button';
import  IconButton from '@mui/material/IconButton';
import  Typography from '@mui/material/Typography';
import  Toolbar from '@mui/material/Toolbar';
import  Container from '@mui/material/Container';
import Menu from '@mui/icons-material/Menu';
import TodolistList from '../features/TodolistList';
import LinearProgress from '@mui/material/LinearProgress';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {RequestStatusType} from './app-reducer';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';


export function AppWithRedux() {

    const status = useSelector<AppRootStateType,RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color={'secondary'}/>}
            </AppBar>
            <Container fixed>
                <TodolistList/>
            </Container>
        </div>
    );
}


