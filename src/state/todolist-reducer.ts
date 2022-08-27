import {v1} from 'uuid';
import {FilterType} from '../AppWithRedux';
import {todolistAPI, TodolistType} from '../stories/axios_query/API/todolist_API';
import {AppThunk} from './store';


export type  TodoListsDomainType = TodolistType & {
    filter: FilterType
}

let initialProfileState: TodoListsDomainType[] = []

export const todolistReducer = (state = initialProfileState, action: ActionTodoListsReducerType): TodoListsDomainType[] => {

    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            let newTask: TodoListsDomainType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }
            return [newTask, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        }
        case 'SET-TODOS': {
            return action.todolists.map(t => ({...t, filter: 'all'}))
        }
        default:
            return state
    }
}


export type ActionTodoListsReducerType =
    RemoveTodolistACType
    | AddNewTodolistACType
    | EditTodolistHandlerACType
    | ChangeFilterACType
    | GetTodosACType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todolistID_1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistID_1,
    } as const
}

export type AddNewTodolistACType = ReturnType<typeof addNewTodolistAC>

export const addNewTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: newTodolistTitle,
        todolistId: v1(),
    } as const
}

type EditTodolistHandlerACType = ReturnType<typeof editTodolistTitleAC>

export const editTodolistTitleAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle,
    } as const
}

type ChangeFilterACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (todolistId2: string, newFilter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter,
    } as const
}

export type GetTodosACType = ReturnType<typeof setTodosAC>

export const setTodosAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOS',
        todolists,
    } as const
}

export const getTodosTC = (): AppThunk => (dispatch) => {
    todolistAPI.getTodo()
        .then(res => {
            dispatch(setTodosAC(res.data))
        })
}

