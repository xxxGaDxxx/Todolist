import React, {memo, useCallback, useEffect} from 'react';
import {Button, IconButton} from '@mui/material';
import {AddItemForm} from '../../../common/components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../common/components/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {TodoListsDomainType} from '../reducer/todolist-reducer';
import {Task} from './TasksList/Task';
import {TaskStatuses} from '../../../api/todolist_API';
import {tasksActions, todolistsActions} from '../index';
import {useAppSelector} from '../../../common/hoks/UseAppSelector';
import {useAppDispatch} from '../../../common/hoks/UseAppDispatch';
import {useActions} from '../../../common/hoks/UseActions';
import Paper from '@mui/material/Paper';


type PropsType = {
  todolist: TodoListsDomainType
}

export const Todolist = memo(({todolist}: PropsType) => {
  const {id, title, filter, entityStatus} = {...todolist}

  let tasks = useAppSelector(state => state.tasks[id])

  const dispatch = useAppDispatch()

  const {updateTodosTC, deleteTodosTC, changeFilterAC} = useActions(todolistsActions)
  const {addTaskTC, getTaskTC} = useActions(tasksActions)


  const onClickAll = () => changeFilterAC({todolistId: id, newFilter: 'all'})
  const onClickActive = () => changeFilterAC({todolistId: id, newFilter: 'active'})
  const onClickComplited = () => changeFilterAC({todolistId: id, newFilter: 'completed'})


  if (filter === 'active') {
    tasks = tasks.filter(e => e.status === TaskStatuses.New)
  }
  if (filter === 'completed') {
    tasks = tasks.filter(e => e.status === TaskStatuses.Completed)
  }


  const onClickRemoveTodolist = useCallback(() => {
    deleteTodosTC({todolistId: id})
  }, [dispatch, id])

  const addTaskHandler = useCallback((title: string) => {
    addTaskTC({todolistId: id, title})
  }, [dispatch, id])

  const addEditableTitle = useCallback((title: string) => {
    updateTodosTC({todolistId: id, title})
  }, [dispatch, id])


  useEffect(() => {
    getTaskTC(id)
  }, [dispatch])


  return (
    <Paper style={{position: 'relative', padding: '10px'}}>
      <IconButton onClick={onClickRemoveTodolist} disabled={entityStatus === 'loading'}
                  style={{position: 'absolute', right: '5px', top: '5px'}}>
        <Delete/>
      </IconButton>

      <h3 >
        <EditableSpan title={title} callBack={addEditableTitle}/>
      </h3>

      <AddItemForm callBack={addTaskHandler} disabled={entityStatus === 'loading'}/>

      <div>
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
        {!tasks.length && <span style={{color: 'grey'}}>No task</span>}
      </div>

      <div>
        <Button color={'primary'} variant={filter === 'all' ? 'contained' : 'outlined'}
                onClick={onClickAll}>All</Button>
        <Button color={'primary'} variant={filter === 'active' ? 'contained' : 'outlined'}
                onClick={onClickActive}>Active</Button>
        <Button color={'primary'} variant={filter === 'completed' ? 'contained' : 'outlined'}
                onClick={onClickComplited}>Complited
        </Button>
      </div>
    </Paper>
  )
})
