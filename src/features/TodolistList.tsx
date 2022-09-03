import React, {useCallback, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import Paper from '@mui/material/Paper';
import {Todolist} from './TodolistsList/Todolist';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType} from '../app/store';
import {createTodosTC, getTodosTC, TodoListsDomainType} from './reducer-&-test/todolist-reducer';

export const TodolistList = () => {

    const todolists = useSelector<AppRootStateType, TodoListsDomainType[]>(state => state.todolists)
    const dispatch = useDispatch<AppDispatch>()


    const addNewTodolist = useCallback((title: string) => {
        dispatch(createTodosTC(title))
    }, [dispatch])


    useEffect(() => {
        dispatch(getTodosTC())
    }, [])


    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm callBack={addNewTodolist}></AddItemForm>
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
        </>
    );
};

export default TodolistList;