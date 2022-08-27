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
            // let newTask: TodoListsDomainType = {
            //     id: action.todolistId,
            //     title: action.title,
            //     filter: 'all',
            //     addedDate: '',
            //     order: 0
            // }
            // return [newTask, ...state]
            let newTask: TodoListsDomainType = {
                ...action.todolist,
                filter: 'all',
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

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId,
    } as const
}

export type AddNewTodolistACType = ReturnType<typeof addNewTodolistAC>

export const addNewTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        todolist,
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

export const deleteTodosTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistAPI.deleteTodo(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const createTodosTC = (title: string): AppThunk => (dispatch) => {
    todolistAPI.createTodo(title)
        .then(res => {
            dispatch(addNewTodolistAC(res.data.data.item))
        })
}

export const updateTodosTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    todolistAPI.updateTodo({todolistId, title})
        .then(res => {
            dispatch(editTodolistTitleAC(todolistId, title))
        })
}

