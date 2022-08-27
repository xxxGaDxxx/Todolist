import React, {memo, useCallback, useEffect} from 'react';
import {Button, IconButton} from '@mui/material';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Delete} from '@mui/icons-material';
import {changeFilterAC, editTodolistTitleAC, removeTodolistAC, TodoListsDomainType} from './state/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType} from './state/store';
import { createTaskTC, getTaskTC} from './state/tasks-Reducer';
import {Task} from './Task';
import {TaskStatuses, TaskType} from './stories/axios_query/API/todolist_API';


type PropsType = {
    todolist: TodoListsDomainType
}

export const Todolist = memo(({todolist}: PropsType) => {
    // console.log('Todolist called')

    const {id, title, filter} = {...todolist}
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])


    const dispatch = useDispatch<AppDispatch>()

    let onClickAll = () => dispatch(changeFilterAC(id, 'all'))
    let onClickActive = () => dispatch(changeFilterAC(id, 'active'))
    let onClickComplited = () => dispatch(changeFilterAC(id, 'completed'))

    if (filter === 'active') {
        tasks = tasks.filter(e => e.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(e => e.status === TaskStatuses.Completed)
    }


    let removeTodolistHandler = useCallback(() => {
        let action = removeTodolistAC(id)
        dispatch(action)
    }, [dispatch, id])

    let addTaskHandler = useCallback((title: string) => {
        // dispatch(addTaskAC(id, title))
        dispatch(createTaskTC(id, title))
    }, [dispatch, id])

    let addEditableHandler = useCallback((newTitle: string) => {
        dispatch(editTodolistTitleAC(id, newTitle))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getTaskTC(id))
    },[])

    return (
        <div>
            <h3>
                <EditableSpan title={title} callBack={addEditableHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callBack={addTaskHandler}/>

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
                <Button color={'success'} variant={filter === 'active' ? 'contained' : 'outlined'}
                        onClick={onClickActive}>Active</Button>
                <Button color={'error'} variant={filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={onClickComplited}>Complited
                </Button>
            </div>
        </div>
    )
})