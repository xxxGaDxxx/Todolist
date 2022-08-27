import React, {memo, useCallback, useEffect} from 'react';
import {Button, IconButton} from '@mui/material';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../components/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {
    changeFilterAC,
    deleteTodosTC,
    TodoListsDomainType, updateTodosTC
} from '../reducer-&-test/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType} from '../../app/store';
import { createTaskTC, getTaskTC} from '../reducer-&-test/tasks-Reducer';
import {Task} from '../TasksList/Task';
import {TaskStatuses, TaskType} from '../../api/todolist_API';


type PropsType = {
    todolist: TodoListsDomainType
}

export const Todolist = memo(({todolist}: PropsType) => {

    const {id, title, filter} = {...todolist}

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])
    const dispatch = useDispatch<AppDispatch>()

    const onClickAll = () => dispatch(changeFilterAC(id, 'all'))
    const onClickActive = () => dispatch(changeFilterAC(id, 'active'))
    const onClickComplited = () => dispatch(changeFilterAC(id, 'completed'))

    if (filter === 'active') {
        tasks = tasks.filter(e => e.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(e => e.status === TaskStatuses.Completed)
    }


    const onClickRemoveTodolist = useCallback(() => {
        dispatch(deleteTodosTC(id))
    }, [dispatch, id])
    const addTaskHandler = useCallback((title: string) => {
        dispatch(createTaskTC(id, title))
    }, [dispatch, id])
    const addEditableTitle = useCallback((title: string) => {
        dispatch(updateTodosTC(id,title))
    }, [dispatch, id])


    useEffect(() => {
        dispatch(getTaskTC(id))
    },[])

    return (
        <div>
            <h3>
                <EditableSpan title={title} callBack={addEditableTitle}/>
                <IconButton onClick={onClickRemoveTodolist}>
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