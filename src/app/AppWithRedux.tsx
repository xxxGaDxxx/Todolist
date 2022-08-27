import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from '../features/TodolistsList/Todolist';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
     createTodosTC, getTodosTC,
    TodoListsDomainType
} from '../features/reducer-&-test/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType} from './store';


export function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, TodoListsDomainType[]>(state => state.todolists)
    const dispatch = useDispatch<AppDispatch>()


    const addNewTodolist = useCallback((title: string) => {
        dispatch(createTodosTC(title))
    }, [dispatch])


    useEffect(() => {
        dispatch(getTodosTC())
    }, [])


    return (
        <div className="App">
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
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callBack={addNewTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map((el) => {
                            return (
                                <Grid key={el.id} item>
                                    <Paper style={{padding: '10px'}} elevation={3}>
                                        <Todolist
                                            todolist={el}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


