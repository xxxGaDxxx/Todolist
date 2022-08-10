import React, {memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from './components/EditableSpan';
import {Delete} from '@mui/icons-material';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-Reducer';
import {TaskType} from './Todolist';
import {useDispatch} from 'react-redux';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = memo(({task, todolistId}: TaskPropsType) => {

    const {id, isDone, title} = task

    let dispatch = useDispatch()

    let onClickHandler = () => {
        dispatch(removeTaskAC(todolistId,id ))
    }
    let onChangeCheckbox = () => {
        dispatch(changeTaskStatusAC(todolistId,id, !isDone))
    }
    let onChangeTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId,id, newTitle))
    },[dispatch,todolistId,id])

    return (
        <div key={id} className={isDone ? 'is-done' : ''}>
            <Checkbox color={'error'} checked={isDone} onChange={onChangeCheckbox}/>
            <EditableSpan title={title}
                          callBack={onChangeTitle}/>

            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})