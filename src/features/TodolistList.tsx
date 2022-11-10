import React, {useCallback, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import Paper from '@mui/material/Paper';
import {Todolist} from './TodolistsList/Todolist';
import {useDispatch} from 'react-redux';
import {AppDispatch, useAppSelector} from '../app/store';
import {addTodosTC, getTodosTC} from './reducer-&-test/todolist-reducer';
import {Navigate} from 'react-router-dom';

export const TodolistList = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const todolists = useAppSelector(state => state.todolists)
  const dispatch = useDispatch<AppDispatch>()

  const addNewTodolist = useCallback((title: string) => {
    dispatch(addTodosTC({title}))
  }, [dispatch])

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(getTodosTC())
  }, [dispatch])
  console.log(isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={'/login'}/>
  }

  return (
    <>
      <Grid container justifyContent={'center'} style={{padding: '20px'}}>
        <AddItemForm callBack={addNewTodolist}></AddItemForm>
      </Grid>
      <Grid container justifyContent={'center'} spacing={5}>
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