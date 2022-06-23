import {FilterType, TodolistsType} from '../App';
import {v1} from 'uuid';


export const todolistsReducer = (state: TodolistsType[], action: ActionTodolistsReducerType): TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            /*let removeTodolist = (todolistId: string) => {
                setTodolists(todolists.filter(e => e.id !== todolistId))
                delete tasks[todolistId]
                console.log(tasks)
            }*/
            return state.filter(t => t.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            /*let addNewTodolist = (title: string) => {
                let newId = v1()
                let newTask: TodolistsType = {id: newId, title: title, filter: 'all'}
                setTodolists([newTask, ...todolists])
                setTasks({...tasks, [newId]: []})
            }*/
            let newTask: TodolistsType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [...state, newTask]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            /*setTodolists(todolists.map(t => t.id === todolistId ? {...t, title: newTitle} : t))*/
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            /*setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter: filter} : t))*/
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}


export type ActionTodolistsReducerType =
    RemoveTodolistACType
    | AddNewTodolistACType
    | EditTodolistHandlerACType
    | changeFilterACType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todolistID_1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistID_1
    } as const
}

export type AddNewTodolistACType = ReturnType<typeof addNewTodolistAC>

export const addNewTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle,
        todolistId: v1()
    } as const
}

type EditTodolistHandlerACType = ReturnType<typeof editTodolistHandlerAC>

export const editTodolistHandlerAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (todolistId2: string, newFilter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    } as const
}

