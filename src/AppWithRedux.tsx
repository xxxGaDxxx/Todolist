import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import AddItemForm from './components/AddItemForm';
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addNewTodolistAC,
    changeFilterAC,
    editTodolistTitleAC,
    removeTodolistAC,
    TodolistsType
} from './state/todolist-reducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskPropsType,
} from './state/tasks-Reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterType = 'all' | 'active' | 'completed'


export function AppWithRedux() {

    /* let todolistID_1 = v1()
     let todolistID_2 = v1()

     let [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
             {id: todolistID_1, title: 'What to learn', filter: 'all'},
             {id: todolistID_2, title: 'What to buy', filter: 'all'},
         ]
     )
     let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
         [todolistID_1]: [
             {id: v1(), title: 'HTML&CSS', isDone: true},
             {id: v1(), title: 'JS', isDone: true},
             {id: v1(), title: 'ReactJS', isDone: false},

         ],
         [todolistID_2]: [
             {id: v1(), title: 'Rest API', isDone: true},
             {id: v1(), title: 'GraphQL', isDone: false},
         ]
     })*/

    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskPropsType>(state => state.tasks)
    const dispatch = useDispatch()


    let changeFilter = (todolistId: string, filter: FilterType) => {
        dispatch(changeFilterAC(todolistId, filter))
    }

    let removeTask = (todolistId: string, id: string) => {
        dispatch(removeTaskAC(todolistId, id))
    }

    let addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }

    let changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, id, isDone))
    }

    let removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

    let addNewTodolist = (title: string) => {
        let action = addNewTodolistAC(title)
        dispatch(action)

    }

    const editTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatch(editTodolistTitleAC(todolistId, newTitle))
    }

    const editTaskTitle = (todolistId: string, taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskID, newTitle))
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
                                <Grid key={el.id} item>
                                    <Paper style={{padding: '10px'}} elevation={3}>
                                        <Todolist
                                            todolistId={el.id}
                                            title={el.title}
                                            tasks={taskForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={el.filter}
                                            removeTodolist={removeTodolist}
                                            editTodolistHandler={editTodolistTitle}
                                            editTask={editTaskTitle}
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


