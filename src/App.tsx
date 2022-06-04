import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterType = 'all' | 'active' | 'complited'

export function App() {

    let [task, setTask] = useState([
        {id: 1, title: 'milk', isDone: true},
        {id: 2, title: 'coffee', isDone: false},
        {id: 3, title: 'sugar', isDone: true},
    ])
    let [filter, setFilter] = useState<FilterType>('all')

    let taskForTodolist = task
    if (filter === 'active') {
        taskForTodolist = task.filter(e => !e.isDone )
    }
    if (filter === 'complited') {
        taskForTodolist = task.filter(e => e.isDone )
    }

    let changeFilter=(value:FilterType)=>{
        setFilter(value)
    }

    let remuveTask = (id: number) => {
        let filteredTask = task.filter(e => e.id !== id)
        setTask(filteredTask)
    }


    return (
        <div className="App">
            <Todolist
                title={'What to by'}
                task={taskForTodolist}
                remuveTask={remuveTask}
                changeFilter={changeFilter}
            />

        </div>
    );
}


