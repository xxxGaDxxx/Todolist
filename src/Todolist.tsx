import React, {memo, useCallback} from 'react';
import {Button, IconButton} from '@mui/material';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Delete} from '@mui/icons-material';
import {changeFilterAC, editTodolistTitleAC, removeTodolistAC, TodoListsType} from './state/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTaskAC } from './state/tasks-Reducer';
import {Task} from './Task';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodoListsType
}

export const Todolist = memo(({todolist}: PropsType) => {
    console.log('Todolist called')

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


    let removeTodolistHandler = useCallback(() => {
        let action = removeTodolistAC(id)
        dispatch(action)
    }, [dispatch,id])

    let addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(id, title))
    }, [dispatch,id])

    let addEditableHandler = useCallback((newTitle: string) => {
        dispatch(editTodolistTitleAC(id, newTitle))
    }, [dispatch,id])

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
                        // let onClickHandler = () => {
                        //     dispatch(removeTaskAC(id, t.id))
                        // }
                        // let onChangeCheckbox = () => {
                        //     dispatch(changeTaskStatusAC(id, t.id, !t.isDone))
                        // }
                        // let onChangeTitle = (newTitle: string) => {
                        //     dispatch(changeTaskTitleAC(id, t.id, newTitle))
                        // }


                        return (
                            <Task
                                key={t.id}
                                task={t}
                                todolistId={id}
                            />
                            // <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                            //     <Checkbox color={'error'} checked={t.isDone} onChange={onChangeCheckbox}/>
                            //     <EditableSpan title={t.title}
                            //                   callBack={onChangeTitle}/> {/*//появился промежуточный ему приходит и от отдаёт уже 2 аргумента */}
                            //
                            //     <IconButton onClick={onClickHandler}>
                            //         <Delete/>
                            //     </IconButton>
                            // </div>
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