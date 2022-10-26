import React, {useEffect} from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
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
                    {/*<IconButton edge="start" color="inherit" aria-label="menu">*/}
                    {/*    <Menu/>*/}
                    {/*</IconButton>*/}
                    {/*<Typography variant="h6">*/}
                    {/*    News*/}
                    {/*</Typography>*/}
                    {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color={'secondary'}/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistList/>}/>
                    <Route path="/login" element={<Login/>}/>
                    {/*<Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>*/}
                    <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>}/>
                </Routes>
            </Container>
        </div>
    );
}


