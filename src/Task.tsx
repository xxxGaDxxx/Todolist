import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from './components/EditableSpan';
import {Delete} from '@mui/icons-material';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-Reducer';

import {useDispatch} from 'react-redux';
import {TaskStatuses, TaskType} from './stories/axios_query/API/todolist_API';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = memo(({task, todolistId}: TaskPropsType) => {

    const {id, status, title} = task

    let dispatch = useDispatch()

    let onClickHandler = () => {
        dispatch(removeTaskAC(todolistId,id ))
    }
    let onChangeCheckbox = (e:ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(todolistId,id, newIsDoneValue ? TaskStatuses.Completed:TaskStatuses.New))
    }
    let onChangeTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId,id, newTitle))
    },[dispatch,todolistId,id])

    return (
        <div key={id} className={status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox color={'error'} checked={status === TaskStatuses.Completed} onChange={onChangeCheckbox}/>
            <EditableSpan title={title}
                          callBack={onChangeTitle}/>

            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})