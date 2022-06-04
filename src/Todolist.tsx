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
}

export const Todolist: React.FC<PropsType> = (props) => {
    let [title, setTitle] = useState('')

    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    let onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }
    let onClickHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    let onClickAll = () => props.changeFilter('all')
    let onClickActive = () => props.changeFilter('active')
    let onClickComplited = () => props.changeFilter('complited')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button onClick={onClickHandler}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        let onClickHandler = () => props.removeTask(t.id)

                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                                <button onClick={onClickHandler}>x</button>
                            </li>
                        )
                    })
                }

            </ul>
            <div>
                <button onClick={onClickAll}>All</button>
                <button onClick={onClickActive}>Active</button>
                <button onClick={onClickComplited}>Complited</button>
            </div>
        </div>
    )
}