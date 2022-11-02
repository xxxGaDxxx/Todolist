import {todolistAPI, TodolistType} from '../../api/todolist_API';
import {AppThunk} from '../../app/store';
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

let initialState: TodoListsDomainType[] = []

// export const _todolistReducer = (state = initialState, action: ActionTodoListsReducerType): TodoListsDomainType[] => {
//
//     switch (action.type) {
//         case 'REMOVE-TODOLIST':
//             return state.filter(t => t.id !== action.id)
//         case 'ADD-TODOLIST':
//             return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
//         case 'CHANGE-TODOLIST-TITLE':
//             return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
//         case 'CHANGE-TODOLIST-FILTER':
//             return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
//         case 'SET-TODOS':
//             return action.todolists.map(t => ({...t, filter: 'all', entityStatus: 'idle'}))
//         case 'TODOLIST/ENTITY-STATUS':
//             return state.map(t => t.id === action.todoId ? {...t, entityStatus: action.status} : t)
//         default:
//             return state
//     }
// }

const slice = createSlice({
    name: 'todolist',
    initialState: initialState,
    reducers: {
        deleteTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {

            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})

        },
        newTitleTodolistAC(state, action: PayloadAction<{ todolistId: string, title: string }>) {
            // return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].title = action.payload.title
        },
        changeFilterAC(state, action: PayloadAction<{ todolistId: string, newFilter: FilterType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].filter = action.payload.newFilter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ todoId: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            state[index].entityStatus = action.payload.status
        },
        setTodosAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },

    }
})
export const todolistReducer = slice.reducer

export const {
    deleteTodolistAC,
    addTodolistAC,
    newTitleTodolistAC,
    changeFilterAC,
    setTodosAC,
    changeTodolistEntityStatusAC
} = slice.actions


//action
// export const deleteTodolistAC = (todolistId: string) => {
//     return {
//         type: 'REMOVE-TODOLIST',
//         id: todolistId,
//     } as const
// }
// export const addTodolistAC = (todolist: TodolistType) => {
//     return {
//         type: 'ADD-TODOLIST',
//         todolist,
//     } as const
// }
// export const newTitleTodolistAC = (todolistId: string, title: string) => {
//     return {
//         type: 'CHANGE-TODOLIST-TITLE',
//         id: todolistId,
//         title: title,
//     } as const
// }
// export const changeFilterAC = (todolistId: string, newFilter: FilterType) => {
//     return {
//         type: 'CHANGE-TODOLIST-FILTER',
//         id: todolistId,
//         filter: newFilter,
//     } as const
// }
// export const setTodosAC = (todolists: TodolistType[]) => {
//     return {
//         type: 'SET-TODOS',
//         todolists,
//     } as const
// }
// export const changeTodolistEntityStatusAC = (todoId: string, status: RequestStatusType) => {
//     return {
//         type: 'TODOLIST/ENTITY-STATUS',
//         todoId,
//         status,
//     } as const
// }


//thunk
export const getTodosTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.getTodo()
        .then(res => {
            dispatch(setTodosAC({todolists: res.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(err => {
            handleServerNetworkError(err.message, dispatch)
        })
}

export const deleteTodosTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({todoId: todolistId, status: 'loading'}))
    todolistAPI.deleteTodo(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTodolistAC({todolistId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err.message, dispatch)
        })
}

export const createTodosTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.createTodo(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC({todolist: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err.message, dispatch)
        })
}

export const updateTodosTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.updateTodo({todolistId, title})
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(newTitleTodolistAC({todolistId, title}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err.message, dispatch)
        })
}


//types
export type FilterType = 'all' | 'active' | 'completed'
export type  TodoListsDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

// export type ActionTodoListsReducerType =
//     | RemoveTodolistACType
//     | AddTodolistACType
//     | NewTitleTodolistACType
//     | ChangeFilterACType
//     | SetTodosACType
//     | ChangeTodolistEntityStatusACType


export type RemoveTodolistACType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
// type NewTitleTodolistACType = ReturnType<typeof newTitleTodolistAC>
// type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export type SetTodosACType = ReturnType<typeof setTodosAC>
// export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>