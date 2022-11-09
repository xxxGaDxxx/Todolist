import {addTodolistAC, deleteTodolistAC, setTodosAC} from './todolist-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI,} from '../../api/todolist_API';
import {AppRootStateType, AppThunk} from '../../app/store';
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: TaskPropsType = {}

export const getTaskTC = createAsyncThunk('tasks/getTask', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

    const {data} = await todolistAPI.getTask(todolistId)

    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    return {tasks: data.items, todolistId}
})

export const deleteTaskTC = createAsyncThunk('tasks/deleteTask',
    async (param: { todolistId: string, taskId: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

        thunkAPI.dispatch(changeTaskEntityStatusAC({
            todolistId: param.todolistId,
            taskId: param.taskId,
            status: 'loading'
        }))

        try {
            const {data} = await todolistAPI.deleteTask({todolistId: param.todolistId, taskId: param.taskId})

            if (data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                thunkAPI.dispatch(changeTaskEntityStatusAC({
                    todolistId: param.todolistId,
                    taskId: param.taskId,
                    status: 'succeeded'
                }))

                return {todolistId: param.todolistId, taskId: param.taskId}
            } else {
                handleServerAppError(data, thunkAPI.dispatch)
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                handleServerNetworkError(err.message, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue(null)
            }
            return thunkAPI.rejectWithValue(null)
        }
    })


const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        // removeTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
        //     const tasks = state[action.payload.todolistId]
        //
        //     const index = tasks.findIndex(t => t.id === action.payload.taskId)
        //     if (index > -1) {
        //         tasks.splice(index, 1)
        //     }
        // },
        addTaskAC(state, action: PayloadAction<TaskType>) {
            state[action.payload.todoListId].unshift({...action.payload})
        },
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateTaskModelType }>) {
            const tasks = state[action.payload.todolistId]

            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        changeTaskEntityStatusAC(state, action: PayloadAction<{ todolistId: string, taskId: string, status: RequestStatusType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index].entityStatus = action.payload.status
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        });
        builder.addCase(setTodosAC, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
        builder.addCase(getTaskTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                const tasks = state[action.payload.todolistId]

                const index = tasks.findIndex(t => t.id === action.payload?.taskId)
                if (index > -1) {
                    tasks.splice(index, 1)
                }
            }

        });
    }
})

export const tasksReducer = slice.reducer
export const {
    // removeTaskAC,
    addTaskAC,
    updateTaskAC,
    changeTaskEntityStatusAC
} = slice.actions


//thunk
// export const getTaskTC = (todolistId: string): AppThunk => (dispatch) => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     todolistAPI.getTask(todolistId)
//         .then(res => {
//             dispatch(setTaskAC({tasks: res.data.items, todolistId}))
//             dispatch(setAppStatusAC({status: 'succeeded'}))
//         })
//         .catch(err => {
//             handleServerNetworkError(err.message, dispatch)
//         })
// }

// export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk =>
//     (dispatch) => {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         dispatch(changeTaskEntityStatusAC({todolistId, taskId, status: 'loading'}))
//         todolistAPI.deleteTask({todolistId, taskId})
//             .then(res => {
//                 if (res.data.resultCode === 0) {
//                     dispatch(removeTaskAC({todolistId, taskId}))
//                     dispatch(setAppStatusAC({status: 'succeeded'}))
//                     dispatch(changeTaskEntityStatusAC({todolistId, taskId, status: 'succeeded'}))
//                 } else {
//                     handleServerAppError(res.data, dispatch)
//                 }
//             })
//             .catch(err => {
//                 handleServerNetworkError(err.message, dispatch)
//             })
//     }

export const createTaskTC = (todolistId: string, title: string): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.createTask({todolistId, title})
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
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
        dispatch(changeTaskEntityStatusAC({todolistId, taskId, status: 'loading'}))
        //достаём таски с getState с нужного тудулиста и при помощи  find  дастаём нужную таску
        const task = getState().tasks[todolistId].find((t: any) => t.id === taskId)
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

// type TaskReducerType =
//     | RemoveTaskACType
//     | AddTaskACType
//     | UpdateTaskACType
//     | SetTaskType
//     | AddTodolistACType
//     | RemoveTodolistACType
//     | SetTodosACType
//     | changeTaskEntityStatusACType


// type RemoveTaskACType = ReturnType<typeof removeTaskAC>
// type AddTaskACType = ReturnType<typeof addTaskAC>
// type UpdateTaskACType = ReturnType<typeof updateTaskAC>
// type SetTaskType = ReturnType<typeof setTaskAC>
// type changeTaskEntityStatusACType = ReturnType<typeof changeTaskEntityStatusAC>