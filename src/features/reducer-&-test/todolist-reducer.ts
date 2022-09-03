import {todolistAPI, TodolistType} from '../../api/todolist_API';
import {AppThunk} from '../../app/store';
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

let initialProfileState: TodoListsDomainType[] = []

export const todolistReducer = (state = initialProfileState, action: ActionTodoListsReducerType): TodoListsDomainType[] => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case 'SET-TODOS':
            return action.todolists.map(t => ({...t, filter: 'all', entityStatus: 'idle'}))
        case 'TODOLIST/ENTITY-STATUS':
            return state.map(t => t.id === action.todoId ? {...t, entityStatus: action.status} : t)
        default:
            return state
    }
}


//action
export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId,
    } as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        todolist,
    } as const
}
export const newTitleTodolistAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId,
        title: title,
    } as const
}
export const changeFilterAC = (todolistId: string, newFilter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId,
        filter: newFilter,
    } as const
}
export const setTodosAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOS',
        todolists,
    } as const
}
export const changeTodolistEntityStatusAC = (todoId: string, status: RequestStatusType) => {
    return {
        type: 'TODOLIST/ENTITY-STATUS',
        todoId,
        status,
    } as const
}


//thunk
export const getTodosTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodo()
        .then(res => {
            dispatch(setTodosAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(err=>{
            handleServerNetworkError(err.message,dispatch)
        })
}

export const deleteTodosTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistAPI.deleteTodo(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch(err=>{
            handleServerNetworkError(err.message,dispatch)
        })
}

export const createTodosTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodo(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data,dispatch)
            }

        })
        .catch(err=>{
            handleServerNetworkError(err.message,dispatch)
        })
}

export const updateTodosTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodo({todolistId, title})
        .then(res => {
            if(res.data.resultCode===0){
                dispatch(newTitleTodolistAC(todolistId, title))
                dispatch(setAppStatusAC('succeeded'))
            }else {
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch(err=>{
            handleServerNetworkError(err.message,dispatch)
        })
}


//types
export type FilterType = 'all' | 'active' | 'completed'
export type  TodoListsDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

export type ActionTodoListsReducerType =
    | RemoveTodolistACType
    | AddTodolistACType
    | NewTitleTodolistACType
    | ChangeFilterACType
    | SetTodosACType
    | ChangeTodolistEntityStatusACType


export type RemoveTodolistACType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type NewTitleTodolistACType = ReturnType<typeof newTitleTodolistAC>
type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export type SetTodosACType = ReturnType<typeof setTodosAC>
export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>