import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from '../../components/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {deleteTaskTC, updateTaskTC} from '../reducer-&-test/tasks-Reducer';

import {useDispatch} from 'react-redux';
import {TaskStatuses, TaskType} from '../../api/todolist_API';
import {AppDispatch} from '../../app/store';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = memo(({task, todolistId}: TaskPropsType) => {

    const {id, status, title} = task

    const dispatch = useDispatch<AppDispatch>()

    const onClickDeleteTask = () => {
        dispatch(deleteTaskTC(todolistId, id))
    }
    const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue: TaskStatuses = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(todolistId, id, {status: newIsDoneValue}))
    }
    const onChangeTitle = useCallback((title: string) => {
        dispatch(updateTaskTC(todolistId, id, {title}))
    }, [dispatch, todolistId, id])


    return (
        <div key={id} className={status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox color={'error'} checked={status === TaskStatuses.Completed} onChange={onChangeCheckbox}/>
            <EditableSpan title={title}
                          callBack={onChangeTitle}/>
            <IconButton onClick={onClickDeleteTask}>
                <Delete/>
            </IconButton>
        </div>
    )
})