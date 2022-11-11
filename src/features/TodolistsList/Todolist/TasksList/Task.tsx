import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from '../../../../common/components/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {TaskStatuses, TaskType} from '../../../../api/todolist_API';
import {tasksActions} from '../../index';
import {useAppDispatch} from '../../../../common/hoks/UseAppDispatch';
import {useActions} from '../../../../common/hoks/UseActions';

type TaskPropsType = {
  task: TaskType
  todolistId: string
}

export const Task = memo(({task, todolistId}: TaskPropsType) => {
  const {id, status, title, entityStatus} = task

  const {deleteTaskTC, updateTaskTC} = useActions(tasksActions)

  const dispatch = useAppDispatch()


  const onClickDeleteTask = () => {
    deleteTaskTC({todolistId, taskId: id})
  }

  const onChangeCheckbox = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const status: TaskStatuses = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    updateTaskTC({todolistId, taskId: id, model: {status}})
  }, [dispatch, todolistId, id])

  const onChangeTitle = useCallback((title: string) => {
    updateTaskTC({todolistId, taskId: id, model: {title}})
  }, [dispatch, todolistId, id])


  return (
    <div key={id} className={status === TaskStatuses.Completed ? 'is-done' : ''}
         style={{position: 'relative'}}>
      <Checkbox color={'error'} checked={status === TaskStatuses.Completed}
                onChange={onChangeCheckbox}
                disabled={entityStatus === 'loading'}/>

      <EditableSpan title={title}
                    callBack={onChangeTitle} disabled={entityStatus === 'loading'}/>

      <IconButton onClick={onClickDeleteTask} disabled={entityStatus === 'loading'}
                  style={{position: 'absolute', top: '5px', right: '2px'}}>
        <Delete fontSize={'small'}/>
      </IconButton>
    </div>
  )
})