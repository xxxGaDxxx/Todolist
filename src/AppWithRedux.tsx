import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addNewTodolistAC,
    TodoListsType
} from './state/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterType = 'all' | 'active' | 'completed'

export function AppWithRedux() {
    // console.log('APP')

    const todolists = useSelector<AppRootStateType, TodoListsType[]>(state => state.todolists)

    const dispatch = useDispatch()


    let addNewTodolist = useCallback((title: string) => {
        let action = addNewTodolistAC(title)
        dispatch(action)
    }, [dispatch])

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


