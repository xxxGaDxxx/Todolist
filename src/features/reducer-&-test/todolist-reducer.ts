import {todolistAPI, TodolistType} from '../../api/todolist_API';
import {AppThunk} from '../../app/store';

let initialProfileState: TodoListsDomainType[] = []

export const todolistReducer = (state = initialProfileState, action: ActionTodoListsReducerType): TodoListsDomainType[] => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all',}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case 'SET-TODOS':
            return action.todolists.map(t => ({...t, filter: 'all'}))
        default:
            return state
    }
}


export type ActionTodoListsReducerType =
    | RemoveTodolistACType
    | AddTodolistACType
    | NewTitleTodolistACType
    | ChangeFilterACType
    | SetTodosACType

//action
export type RemoveTodolistACType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId,
    } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        todolist,
    } as const
}

type NewTitleTodolistACType = ReturnType<typeof newTitleTodolistAC>
export const newTitleTodolistAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId,
        title: title,
    } as const
}

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistId: string, newFilter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId,
        filter: newFilter,
    } as const
}

export type SetTodosACType = ReturnType<typeof setTodosAC>
export const setTodosAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOS',
        todolists,
    } as const
}


//thunk
export const getTodosTC = (): AppThunk => (dispatch) => {
    todolistAPI.getTodo()
        .then(res => {
            dispatch(setTodosAC(res.data))
        })
}

export const deleteTodosTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistAPI.deleteTodo(todolistId)
        .then(res => {
            dispatch(deleteTodolistAC(todolistId))
        })
}

export const createTodosTC = (title: string): AppThunk => (dispatch) => {
    todolistAPI.createTodo(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const updateTodosTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    todolistAPI.updateTodo({todolistId, title})
        .then(res => {
            dispatch(newTitleTodolistAC(todolistId, title))
        })
}


//types
export type FilterType = 'all' | 'active' | 'completed'
export type  TodoListsDomainType = TodolistType & {
    filter: FilterType
}
