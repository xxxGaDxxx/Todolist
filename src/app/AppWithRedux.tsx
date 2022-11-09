import React, {useEffect} from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import TodolistList from '../features/TodolistList';
import LinearProgress from '@mui/material/LinearProgress';
import {AppDispatch, useAppSelector} from './store';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {useDispatch} from 'react-redux';
import {initializeAppTC} from './app-reducer';
import {CircularProgress} from '@mui/material';
import {logoutTC} from '../features/Login/auth-reducer';


export function AppWithRedux() {

    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch<AppDispatch>()

    const logOutHandler = () => {

        dispatch(logoutTC())
    }

    const isLoading: boolean = status === 'loading';

    useEffect(() => {

        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {

        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{margin: '0 0 0 auto'}}>
                        {!isLoggedIn ? <span>Welcome to todo list app</span> : <span>Todolists</span>}
                    </Typography>
                    {isLoggedIn &&
											<Button sx={{margin: '0 0 0 auto', border: '1px solid white'}} color="inherit"
											        onClick={logOutHandler}>Logout</Button>}
                </Toolbar>
                <LinearProgress color={'secondary'}
                                sx={{visibility: isLoading ? 'visible' : 'hidden', textAlign: 'center'}}/>
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistList/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>}/>
                </Routes>
            </Container>
        </div>
    );
}


