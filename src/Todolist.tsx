import React from 'react';
import {Button, Checkbox, IconButton} from '@mui/material';
import AddItemForm from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Delete} from '@mui/icons-material';
import {changeFilterAC, editTodolistTitleAC, removeTodolistAC, TodolistsType} from './state/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-Reducer';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistsType
}

export const Todolist = ({todolist}: PropsType) => {


    const {id, title, filter} = {...todolist}
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])

    const dispatch = useDispatch()

    let onClickAll = () => dispatch(changeFilterAC(id, 'all'))
    let onClickActive = () => dispatch(changeFilterAC(id, 'active'))
    let onClickComplited = () => dispatch(changeFilterAC(id, 'completed'))

    if (filter === 'active') {
        tasks = tasks.filter(e => !e.isDone)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(e => e.isDone)
    }


    let removeTodolistHandler = () => {
        let action = removeTodolistAC(id)
        dispatch(action)
    }

    let addTaskHandler = (title: string) => {
        dispatch(addTaskAC(id, title))
    }
    let addEditableHandler = (newTitle: string) => {
        dispatch(editTodolistTitleAC(id, newTitle))
    }

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
                        let onClickHandler = () => {
                            dispatch(removeTaskAC(id, t.id))
                        }
                        let onChangeCheckbox = () => {
                            dispatch(changeTaskStatusAC(id, t.id, !t.isDone))
                        }
                        let onChangeTitle = (newTitle: string) => {
                            dispatch(changeTaskTitleAC(id, t.id, newTitle))
                        }


                        return (
                            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <Checkbox color={'error'} checked={t.isDone} onChange={onChangeCheckbox}/>
                                <EditableSpan title={t.title}
                                              callBack={onChangeTitle}/> {/*//появился промежуточный ему приходит и от отдаёт уже 2 аргумента */}

                                <IconButton onClick={onClickHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
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
}