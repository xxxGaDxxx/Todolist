import {addTodolistAC, deleteTodolistAC, setTodosAC} from './todolist-reducer';
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistAPI,
  UpdateTaskType,
} from '../../api/todolist_API';
import {AppRootStateType} from '../../app/store';
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
      const {data} = await todolistAPI.deleteTask({
        todolistId: param.todolistId,
        taskId: param.taskId
      })

      if (data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

        thunkAPI.dispatch(changeTaskEntityStatusAC({
          todolistId: param.todolistId,
          taskId: param.taskId,
          status: 'succeeded'
        }))

        return {todolistId: param.todolistId, taskId: param.taskId}
      }
      else {
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


export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { todolistId: string, title: string }, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
  try {
    const {data} = await todolistAPI.createTask({...param})

    if (data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

      return data.data.item
    }
    else {
      handleServerAppError(data, thunkAPI.dispatch)

      return thunkAPI.rejectWithValue(null)
    }

  } catch (err) {
    if (axios.isAxiosError(err)) {
      handleServerNetworkError(err.message, thunkAPI.dispatch)

      return thunkAPI.rejectWithValue(null)
    }
    return thunkAPI.rejectWithValue(null)
  }

})

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: { todolistId: string, taskId: string, model: UpdateTaskModelType }, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

  thunkAPI.dispatch(changeTaskEntityStatusAC({
    todolistId: param.todolistId,
    taskId: param.taskId,
    status: 'loading'
  }))

  const state = thunkAPI.getState() as AppRootStateType

  const task = state.tasks[param.todolistId].find((t: any) => t.id === param.taskId)

  if (!task) {
    return thunkAPI.rejectWithValue(null)
  }

  const apiModel: UpdateTaskType = {
    //достаём всё то что нужно отправить для обновления и ...model перезаписываем то что пришло
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
    ...param.model
  }

  try {
    const {data} = await todolistAPI.updateTask(param.todolistId, param.taskId, apiModel)

    if (data.resultCode === 0) {

      thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

      thunkAPI.dispatch(changeTaskEntityStatusAC({
        todolistId: param.todolistId,
        taskId: param.taskId,
        status: 'succeeded'
      }))

      return data.data.item
    }
    else {
      handleServerAppError(data, thunkAPI.dispatch)

      return thunkAPI.rejectWithValue(null)
    }

  } catch (err) {
    if (axios.isAxiosError(err)) {
      handleServerNetworkError(err.message, thunkAPI.dispatch)

      return thunkAPI.rejectWithValue(null)
    }
    return thunkAPI.rejectWithValue(null)

  } finally {
    thunkAPI.dispatch(changeTaskEntityStatusAC({
      todolistId: param.todolistId,
      taskId: param.taskId,
      status: 'idle'
    }))
  }
})


const slice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
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

    builder.addCase(addTaskTC.fulfilled, (state, action) => {
      state[action.payload.todoListId].unshift({...action.payload})
    });

    builder.addCase(updateTaskTC.fulfilled, (state, action) => {
      const index = state[action.payload.todoListId].findIndex(el => el.id === action.payload.id)
      if (index > -1) {
        state[action.payload.todoListId][index] = {...action.payload, entityStatus: 'idle'}
      }
    });
  }
})

export const tasksReducer = slice.reducer

export const changeTaskEntityStatusAC = slice.actions.changeTaskEntityStatusAC

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
