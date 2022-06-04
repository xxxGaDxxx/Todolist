import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType} from './App';


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterType
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
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is reqired')
        }
    }
    let onClickAll = () => props.changeFilter('all')
    let onClickActive = () => props.changeFilter('active')
    let onClickComplited = () => props.changeFilter('complited')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={onClickHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        let onClickHandler = () => props.removeTask(t.id)
                        let onChangeCheckbox = () => {
                            props.changeTaskStatus(t.id, !t.isDone)
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