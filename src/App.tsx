import React, {useState} from 'react';
import './App.css';
import {TaskType} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm';
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {Todolist1} from './Todolist1';

export type FilterType = 'all' | 'active' | 'completed'
export type  TodolistsType = {
    id: string
    title: string
    filter: FilterType
}
export type TaskPropsType = {
    [key: string]: TaskType[]
}

export function App() {

    let todolistID_1 = v1()
    let todolistID_2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: todolistID_1, title: 'What to learn', filter: 'all'},
            {id: todolistID_2, title: 'What to buy', filter: 'all'},
        ]
    )
    let [tasks, setTasks] = useState<TaskPropsType>({
        [todolistID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID_2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    let changeFilter = (todolistId: string, filter: FilterType) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter: filter} : t))

    }

    let remuveTask = (todolistId: string, id: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(e => e.id !== id)})

    }

    let addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})

    }

    let changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(e => e.id === id ? {...e, isDone: isDone} : e)})
    }

    let removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(e => e.id !== todolistId))
        delete tasks[todolistId]
        console.log(tasks)
    }

    let addNewTodolist = (title: string) => {
        let newId = v1()
        let newTask: TodolistsType = {id: newId, title: title, filter: 'all'}
        setTodolists([newTask, ...todolists])
        setTasks({...tasks, [newId]: []})
    }

    const editTodolistHandler = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title: newTitle} : t))
    }

    const editTask = (todolistId: string, taskID: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(e => e.id === taskID ? {...e, title: newTitle} : e)})
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callBack={addNewTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map((el) => {
                            let taskForTodolist = tasks[el.id]
                            if (el.filter === 'active') {
                                taskForTodolist = tasks[el.id].filter(e => !e.isDone)

                            }
                            if (el.filter === 'completed') {
                                taskForTodolist = tasks[el.id].filter(e => e.isDone)
                            }

                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px'}} elevation={3}>
                                        <Todolist1
                                            key={el.id}
                                            todolistId={el.id}
                                            title={el.title}
                                            tasks={taskForTodolist}
                                            removeTask={remuveTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={el.filter}
                                            removeTodolist={removeTodolist}
                                            editTodolistHandler={editTodolistHandler}
                                            editTask={editTask}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


