import React, {useCallback, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import {AddItemForm} from '../../common/components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../app/store';
import {Navigate} from 'react-router-dom';
import {selectIsLoggedIn} from '../Auth/selectors';
import {todolistsActions} from './index';
import {useAppSelector} from '../../common/hoks/UseAppSelector';
import {useActions} from '../../common/hoks/UseActions';


export const TodolistList = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const todolists = useAppSelector(state => state.todolists)
  const {addTodosTC, getTodosTC} = useActions(todolistsActions)


  const dispatch = useDispatch<AppDispatch>()


  const addNewTodolist = useCallback((title: string) => {
    addTodosTC({title})
  }, [dispatch])


  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    getTodosTC()
  }, [dispatch])


  if (!isLoggedIn) {
    return <Navigate to={'/login'}/>
  }

  return (
    <>
      <Grid container style={{padding: '20px'}}>
        <AddItemForm callBack={addNewTodolist}></AddItemForm>
      </Grid>
      <Grid container spacing={3}
            style={{
              flexWrap: 'nowrap',
              overflowX: 'auto',
              left: '0',
              bottom: '0',
              width: '100%',
              height: '82.5vh'
            }}>
        {
          todolists.map((el) => {
            return (
              <Grid key={el.id} item>
                <div style={{width: '300px'}}>
                  <Todolist
                    todolist={el}
                  />
                </div>
              </Grid>
            )
          })
        }
      </Grid>
    </>
  );
};
