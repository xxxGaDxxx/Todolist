import React from 'react';
import {FilterType} from './App';
import {Button, Checkbox, IconButton} from '@mui/material';
import AddItemForm from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Delete} from '@mui/icons-material';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    filter: FilterType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    editTodolistHandler: (todolistId: string, title: string) => void
    editTask: (todolistId: string, taskID: string, newTitle: string) => void
}

export const Todolist: React.FC<PropsType> = (props) => {

    let onClickAll = () => props.changeFilter(props.todolistId, 'all')
    let onClickActive = () => props.changeFilter(props.todolistId, 'active')
    let onClickComplited = () => props.changeFilter(props.todolistId, 'complited')

    let removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    let addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }
    let addEditableHandler = (newTitle: string) => {
        props.editTodolistHandler(props.todolistId, newTitle)
    }
    let addEditableTask = (taskID: string, newTitle: string) => {
        props.editTask(props.todolistId, taskID, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={addEditableHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callBack={addTaskHandler}/>

            <ul>
                {
                    props.tasks.map(t => {
                        let onClickHandler = () => props.removeTask(props.todolistId, t.id)
                        let onChangeCheckbox = () => {
                            props.changeTaskStatus(props.todolistId, t.id, !t.isDone)
                        }


                        return (
                            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <Checkbox color={'error'} checked={t.isDone} onChange={onChangeCheckbox}/>
                                <EditableSpan title={t.title}
                                              callBack={(newTitle) => addEditableTask(t.id, newTitle)}/> {/*//появился промежуточный ему приходит и от отдаёт уже 2 аргумента */}

                                <IconButton onClick={onClickHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        )
                    })
                }

            </ul>
            <div>
                <Button color={'primary'} variant={props.filter === 'all' ? 'contained' : 'outlined'}
                        onClick={onClickAll}>All</Button>
                <Button color={'success'} variant={props.filter === 'active' ? 'contained' : 'outlined'}
                        onClick={onClickActive}>Active</Button>
                <Button color={'error'} variant={props.filter === 'complited' ? 'contained' : 'outlined'}
                        onClick={onClickComplited}>Complited
                </Button>
            </div>
        </div>
    )
}