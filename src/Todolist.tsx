import React from 'react';
import {FilterType} from './App';


type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    task: TaskType[]
    remuveTask: (id: number) => void
    changeFilter: (value:FilterType)=>void
}

export const Todolist: React.FC<PropsType> = (props) => {


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>x</button>
            </div>
            <ul>
                {
                    props.task.map(t => {
                        let onClickHandler = () => props.remuveTask(t.id)

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
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('complited')}>Complited</button>
            </div>
        </div>
    )
}