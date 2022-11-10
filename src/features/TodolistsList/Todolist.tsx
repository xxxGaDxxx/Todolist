import React, {memo, useCallback, useEffect} from 'react';
import {Button, IconButton} from '@mui/material';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../components/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {
  changeFilterAC,
  deleteTodosTC,
  TodoListsDomainType,
  updateTodosTC
} from '../reducer-&-test/todolist-reducer';
import {useDispatch} from 'react-redux';
import {AppDispatch, useAppSelector} from '../../app/store';
import {addTaskTC, getTaskTC} from '../reducer-&-test/tasks-Reducer';
import {Task} from './TasksList/Task';
import {TaskStatuses} from '../../api/todolist_API';


type PropsType = {
  todolist: TodoListsDomainType
}

export const Todolist = memo(({todolist}: PropsType) => {
  const {id, title, filter, entityStatus} = {...todolist}

  let tasks = useAppSelector(state => state.tasks[id])
  const dispatch = useDispatch<AppDispatch>()

  const onClickAll = () => dispatch(changeFilterAC({todolistId: id, newFilter: 'all'}))
  const onClickActive = () => dispatch(changeFilterAC({todolistId: id, newFilter: 'active'}))
  const onClickComplited = () => dispatch(changeFilterAC({todolistId: id, newFilter: 'completed'}))

  if (filter === 'active') {
    tasks = tasks.filter(e => e.status === TaskStatuses.New)
  }
  if (filter === 'completed') {
    tasks = tasks.filter(e => e.status === TaskStatuses.Completed)
  }


  const onClickRemoveTodolist = useCallback(() => {
    dispatch(deleteTodosTC({todolistId: id}))
  }, [dispatch, id])
  const addTaskHandler = useCallback((title: string) => {
    dispatch(addTaskTC({todolistId: id, title}))
  }, [dispatch, id])
  const addEditableTitle = useCallback((title: string) => {
    dispatch(updateTodosTC({todolistId:id, title}))
  }, [dispatch, id])


  useEffect(() => {
    dispatch(getTaskTC(id))
  }, [dispatch])


  return (
    <div>
      <h3 style={{textAlign: 'center'}}>
        <EditableSpan title={title} callBack={addEditableTitle}/>
        <IconButton onClick={onClickRemoveTodolist} disabled={entityStatus === 'loading'}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm callBack={addTaskHandler} disabled={entityStatus === 'loading'}/>

      <ul>
        {
          tasks.map(t => {
            return (
              <Task
                key={t.id}
                task={t}
                todolistId={id}
              />
            )
          })
        }

      </ul>
      <div>
        <Button color={'primary'} variant={filter === 'all' ? 'contained' : 'outlined'}
                onClick={onClickAll}>All</Button>
        <Button color={'primary'} variant={filter === 'active' ? 'contained' : 'outlined'}
                onClick={onClickActive}>Active</Button>
        <Button color={'primary'} variant={filter === 'completed' ? 'contained' : 'outlined'}
                onClick={onClickComplited}>Complited
        </Button>
      </div>
    </div>
  )
})