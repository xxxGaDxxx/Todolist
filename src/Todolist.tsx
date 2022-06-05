import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType} from './App';


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
}

export const Todolist: React.FC<PropsType> = (props) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    let onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }
    let onClickHandler = () => {
        if (title.trim() !== '') {
            props.addTask(props.todolistId, title.trim())
            setTitle('')
        } else {
            setError('Title is reqired')
        }
    }
    let onClickAll = () => props.changeFilter(props.todolistId, 'all')
    let onClickActive = () => props.changeFilter(props.todolistId, 'active')
    let onClickComplited = () => props.changeFilter(props.todolistId, 'complited')

    let removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodolistHandler}>x</button>
            </h3>

            <div>
                <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={onClickHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        let onClickHandler = () => props.removeTask(props.todolistId, t.id)
                        let onChangeCheckbox = () => {
                            props.changeTaskStatus(props.todolistId, t.id, !t.isDone)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={t.isDone}
                                       onChange={onChangeCheckbox}/><span>{t.title}</span>
                                <button onClick={onClickHandler}>x</button>
                            </li>
                        )
                    })
                }

            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onClickAll}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onClickActive}>Active
                </button>
                <button className={props.filter === 'complited' ? 'active-filter' : ''}
                        onClick={onClickComplited}>Complited
                </button>
            </div>
        </div>
    )
}