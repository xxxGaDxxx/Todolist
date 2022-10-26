import {
    AddTodolistACType,
    SetTodosACType,
    RemoveTodolistACType,
    setTodosAC,
    addTodolistAC,
    deleteTodolistAC
} from './todolist-reducer';
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistAPI, TodolistType,
} from '../../api/todolist_API';
import {AppRootStateType, AppThunk} from '../../app/store';
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {action} from '@storybook/addon-actions';

let initialState: TaskPropsType = {}

const slice = createSlice({
    name: 'task',
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {

            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateTaskModelType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }

        },
        setTaskAC(state, action: PayloadAction<{ tasks: TaskType[], todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
        changeTaskEntityStatusAC(state, action: PayloadAction<{ todolistId: string, taskId: string, status: RequestStatusType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], entityStatus: action.payload.status}
            }
        },


    },
    extraReducers: (bilder) => {
        bilder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] =[]
        })
        bilder.addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
        bilder.addCase(setTodosAC, (state, action) => {
            action.payload.todolists.forEach(t=>{state[t.id]=[]})
        })
    }


    // {
    //     [setTodosAC.type]:(state,action:PayloadAction<{todolist: TodolistType}>){},
    //     [addTodolistAC.type]:(state,actio:PayloadAction<{}>){},
    //     [deleteTodolistAC.type]:(state,actio:PayloadAction<{}>){},
    // }
})

export const tasksReducer = slice.reducer

const {
    removeTaskAC,
    addTaskAC,
    updateTaskAC,
    setTaskAC,
    changeTaskEntityStatusAC
} = slice.actions

export const _tasksReducer = (state = initialState, action: TaskReducerType): TaskPropsType => {

    switch (action.type) {
        // case 'REMOVE-TASK':
        //     return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        // case 'ADD-TASK':
        //     return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        // case 'UPDATE-TASK':
        //     return {
        //         ...state,
        //         [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
        //     }
        // case 'SET-TASK':
        //     return {...state, [action.todolistId]: action.tasks}
        // case 'ADD-TODOLIST':
        //     return {...state, [action.todolist.id]: []}
        // case 'REMOVE-TODOLIST':
        //     const copyState = {...state}
        //     delete copyState[action.id]
        //     return copyState
        // case 'SET-TODOS':
        //     // return action.todolists.reduce((acc,el)=>{
        //     //     stateCopy[el.id]=[]
        //     //     return stateCopy
        //     // },{...state})
        //     const stateCopy = {...state}
        //     action.todolists.forEach(t => {
        //         stateCopy[t.id] = []
        //     })
        //     return stateCopy
        // case 'TASK/ENTITY-STATUS':
        //     return {
        //         ...state,
        //         [action.todoId]: state[action.todoId].map(t => t.id === action.taskId ? {
        //             ...t,
        //             entityStatus: action.status
        //         } : t)
        //     }
        default:
            return state
    }
}


//action

// export const removeTaskAC = (todolistId: string, taskId: string) => {
//     return {
//         type: 'REMOVE-TASK',
//         taskId,
//         todolistId,
//     } as const
// }
//
// export const addTaskAC = (task: TaskType) => {
//     return {
//         type: 'ADD-TASK',
//         task,
//     } as const
// }
//
// export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskModelType) => {
//     return {
//         type: 'UPDATE-TASK',
//         todolistId,
//         taskId,
//         model,
//     } as const
// }
//
// export const setTaskAC = (tasks: TaskType[], todolistId: string) => {
//     return {
//         type: 'SET-TASK',
//         tasks,
//         todolistId,
//     } as const
// }
//
// export const changeTaskEntityStatusAC = (todoId: string, taskId: string, status: RequestStatusType) => {
//     return {
//         type: 'TASK/ENTITY-STATUS',
//         todoId,
//         taskId,
//         status,
//     } as const
// }


//thunk
export const getTaskTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.getTask(todolistId)
        .then(res => {
            dispatch(setTaskAC({tasks: res.data.items, todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(err => {
            handleServerNetworkError(err.message, dispatch)
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTaskEntityStatusAC({todolistId: todolistId, taskId, status: 'loading'}))
        todolistAPI.deleteTask({todolistId, taskId})
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC({todolistId, taskId}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    dispatch(changeTaskEntityStatusAC({todolistId: todolistId, taskId, status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(err => {
                handleServerNetworkError(err.message, dispatch)
            })
    }

export const createTaskTC = (todolistId: string, title: string): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.createTask({todolistId, title})
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC({task: res.data.data.item}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }

            })
            .catch(err => {
                handleServerNetworkError(err.message, dispatch)
            })
    }

export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateTaskModelType): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {

        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTaskEntityStatusAC({todolistId: todolistId, taskId, status: 'loading'}))
        //достаём таски с getState с нужного тудулиста и при помощи  find  дастаём нужную таску
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            todolistAPI.updateTask(todolistId, taskId, {
                //достаём всё то что нужно отправить для обновления и ...model перезаписываем то что пришло
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...model
            })
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC({todolistId, taskId, model}))
                        dispatch(setAppStatusAC({status: 'succeeded'}))
                        dispatch(changeTaskEntityStatusAC({todolistId, taskId, status: 'succeeded'}))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch(err => {
                    handleServerNetworkError(err.message, dispatch)
                })
        }
        console.warn('task not found')
        return
    }

//types
export type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TaskPropsType = {
    [key: string]: TaskType[]
}

type TaskReducerType =
    | RemoveTaskACType
    | AddTaskACType
    | UpdateTaskACType
    | SetTaskType
    | AddTodolistACType
    | RemoveTodolistACType
    | SetTodosACType
    | changeTaskEntityStatusACType


type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type UpdateTaskACType = ReturnType<typeof updateTaskAC>
type SetTaskType = ReturnType<typeof setTaskAC>
type changeTaskEntityStatusACType = ReturnType<typeof changeTaskEntityStatusAC>