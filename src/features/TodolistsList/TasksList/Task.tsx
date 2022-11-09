import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {deleteTaskTC, updateTaskTC} from '../../reducer-&-test/tasks-Reducer';

import {useDispatch} from 'react-redux';
import {TaskStatuses, TaskType} from '../../../api/todolist_API';
import {AppDispatch} from '../../../app/store';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = memo(({task, todolistId}: TaskPropsType) => {

    const {id, status, title, entityStatus} = task

    const dispatch = useDispatch<AppDispatch>()

    const onClickDeleteTask = () => {
        dispatch(deleteTaskTC({todolistId, taskId: id}))
    }
    const onChangeCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue: TaskStatuses = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(todolistId, id, {status: newIsDoneValue}))
    }, [dispatch, todolistId, id])

    const onChangeTitle = useCallback((title: string) => {
        dispatch(updateTaskTC(todolistId, id, {title: title}))
    }, [dispatch, todolistId, id])


    return (
        <div key={id} className={status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox color={'error'} checked={status === TaskStatuses.Completed} onChange={onChangeCheckbox}
                      disabled={entityStatus === 'loading'}/>
            <EditableSpan title={title}
                          callBack={onChangeTitle} disabled={entityStatus === 'loading'}/>
            <IconButton onClick={onClickDeleteTask} disabled={entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </div>
    )
})