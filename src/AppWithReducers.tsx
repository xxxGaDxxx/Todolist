import React, {useReducer} from 'react';
// import './App.css';
// import {TaskType} from './Todolist';
// import {v1} from 'uuid';
// import {AddItemForm} from './components/AddItemForm';
// import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from '@mui/material';
// import {Menu} from '@mui/icons-material';
// import {
//     addNewTodolistAC,
//     changeFilterAC,
//     editTodolistTitleAC,
//     removeTodolistAC,
//     todolistReducer
// } from './state/todolist-reducer';
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-Reducer';
// import {Todolist1} from './Todolist1';
//
// export type FilterType = 'all' | 'active' | 'completed'
// export type  TodolistsType = {
//     id: string
//     title: string
//     filter: FilterType
// }
// export type TaskPropsType = {
//     [key: string]: TaskType[]
// }
//
// export function AppWithReducers() {
//
//     let todolistID_1 = v1()
//     let todolistID_2 = v1()
//
//     let [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
//             {id: todolistID_1, title: 'What to learn', filter: 'all'},
//             {id: todolistID_2, title: 'What to buy', filter: 'all'},
//         ]
//     )
//     let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
//         [todolistID_1]: [
//             {id: v1(), title: 'HTML&CSS', isDone: true},
//             {id: v1(), title: 'JS', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false},
//
//         ],
//         [todolistID_2]: [
//             {id: v1(), title: 'Rest API', isDone: true},
//             {id: v1(), title: 'GraphQL', isDone: false},
//         ]
//     })
//
//
//     let changeFilter = (todolistId: string, filter: FilterType) => {
//         dispatchToTodolists(changeFilterAC(todolistId, filter))
//     }
//
//     let removeTask = (todolistId: string, id: string) => {
//         dispatchToTasks(removeTaskAC(todolistId, id))
//     }
//
//     let addTask = (todolistId: string, title: string) => {
//         dispatchToTasks(addTaskAC(todolistId, title))
//     }
//
//     let changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
//         dispatchToTasks(changeTaskStatusAC(todolistId, id, isDone))
//     }
//
//     let removeTodolist = (todolistId: string) => {
//         dispatchToTodolists(removeTodolistAC(todolistId))
//     }
//
//     let addNewTodolist = (title: string) => {
//         let action = addNewTodolistAC(title)
//         dispatchToTodolists(action)
//         dispatchToTasks(action)
//     }
//
//     const editTodolistTitle = (todolistId: string, newTitle: string) => {
//         dispatchToTodolists(editTodolistTitleAC(todolistId, newTitle))
//     }
//
//     const editTaskTitle = (todolistId: string, taskID: string, newTitle: string) => {
//         dispatchToTasks(changeTaskTitleAC(todolistId, taskID, newTitle))
//     }
//
//
//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         News
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{padding: '20px'}}>
//                     <AddItemForm callBack={addNewTodolist}/>
//                 </Grid>
//                 <Grid container spacing={5}>
//                     {
//                         todolists.map((el) => {
//                             let taskForTodolist = tasks[el.id]
//                             if (el.filter === 'active') {
//                                 taskForTodolist = tasks[el.id].filter(e => !e.isDone)
//
//                             }
//                             if (el.filter === 'completed') {
//                                 taskForTodolist = tasks[el.id].filter(e => e.isDone)
//                             }
//
//                             return (
//                                 <Grid item>
//                                     <Paper style={{padding: '10px'}} elevation={3}>
//                                         <Todolist1
//                                             key={el.id}
//                                             todolistId={el.id}
//                                             title={el.title}
//                                             tasks={taskForTodolist}
//                                             removeTask={removeTask}
//                                             changeFilter={changeFilter}
//                                             addTask={addTask}
//                                             changeTaskStatus={changeTaskStatus}
//                                             filter={el.filter}
//                                             removeTodolist={removeTodolist}
//                                             editTodolistHandler={editTodolistTitle}
//                                             editTask={editTaskTitle}
//                                         />
//                                     </Paper>
//                                 </Grid>
//                             )
//                         })
//                     }
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//

