import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'complited'

export function App() {

    let [tasks, setTask] = useState([
        {id: v1(), title: 'milk', isDone: true},
        {id: v1(), title: 'coffee', isDone: false},
        {id: v1(), title: 'sugar', isDone: true},
    ])

    let [filter, setFilter] = useState<FilterType>('all')

    let taskForTodolist = tasks
    if (filter === 'active') {
        taskForTodolist = tasks.filter(e => !e.isDone)
    }
    if (filter === 'complited') {
        taskForTodolist = tasks.filter(e => e.isDone)
    }

    let changeFilter = (value: FilterType) => {
        setFilter(value)
    }

    let remuveTask = (id: string) => {
        let filteredTask = tasks.filter(e => e.id !== id)
        setTask(filteredTask)
    }

    let addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let newTask = [task, ...tasks]
        setTask(newTask)
    }


    return (
        <div className="App">
            <Todolist
                title={'What to by'}
                tasks={taskForTodolist}
                removeTask={remuveTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />

        </div>
    );
}


