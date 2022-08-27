import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from './components/EditableSpan';
import {Delete} from '@mui/icons-material';
import {deleteTaskTC, updateTaskTC} from './state/tasks-Reducer';

import {useDispatch} from 'react-redux';
import {TaskStatuses, TaskType} from './stories/axios_query/API/todolist_API';
import {AppDispatch} from './state/store';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = memo(({task, todolistId}: TaskPropsType) => {

    const {id, status, title} = task

    let dispatch = useDispatch<AppDispatch>()

    let onClickHandler = () => {
        // dispatch(removeTaskAC(todolistId,id ))
        dispatch(deleteTaskTC(todolistId, id))
    }
    let onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue: TaskStatuses = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        // dispatch(updateTaskAC(todolistId,id, newIsDoneValue ? TaskStatuses.Completed:TaskStatuses.New))
        dispatch(updateTaskTC(todolistId, id, {status: newIsDoneValue}))
    }
    let onChangeTitle = useCallback((newTitle: string) => {
        // dispatch(changeTaskTitleAC(todolistId, id, newTitle))
        dispatch(updateTaskTC(todolistId, id, {title: newTitle}))
    }, [dispatch, todolistId, id])


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