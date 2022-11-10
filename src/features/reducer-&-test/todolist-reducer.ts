import {todolistAPI, TodolistType} from '../../api/todolist_API';
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

let initialState: TodoListsDomainType[] = []

export const getTodosTC = createAsyncThunk('todolist/getTodos', async (param, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

  try {
    const {data} = await todolistAPI.getTodo()

    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

    return {todolists: data}

  } catch (err) {
    if (axios.isAxiosError(err)) {
      handleServerNetworkError(err.message, thunkAPI.dispatch)

      return thunkAPI.rejectWithValue(null)
    }
    return thunkAPI.rejectWithValue(null)
  }
})

export const deleteTodosTC = createAsyncThunk('todolist/deleteTodos', async (param: { todolistId: string }, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

  thunkAPI.dispatch(changeTodolistEntityStatusAC({todoId: param.todolistId, status: 'loading'}))

  try {
    const {data} = await todolistAPI.deleteTodo(param.todolistId)

    if (data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

      return {todolistId: param.todolistId}
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

export const addTodosTC = createAsyncThunk('todolist/addTodos', async (param: { title: string }, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

  try {
    const {data} = await todolistAPI.createTodo(param.title)

    if (data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

      return {todolist: data.data.item}
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

export const updateTodosTC = createAsyncThunk('todolist/updateTodos', async (param: { todolistId: string, title: string }, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

  try {
    const {data} = await todolistAPI.updateTodo({...param})

    if (data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

      return {...param}
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


const slice = createSlice({
  name: 'todolist',
  initialState: initialState,
  reducers: {
    changeFilterAC(state, action: PayloadAction<{ todolistId: string, newFilter: FilterType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      state[index].filter = action.payload.newFilter
    },

    changeTodolistEntityStatusAC(state, action: PayloadAction<{ todoId: string, status: RequestStatusType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todoId)
      state[index].entityStatus = action.payload.status
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodosTC.fulfilled, (state, action) => {
      return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
    });

    builder.addCase(deleteTodosTC.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      if (index > -1) {
        state.splice(index, 1)
      }
    });

    builder.addCase(addTodosTC.fulfilled, (state, action) => {
      state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
    });

    builder.addCase(updateTodosTC.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      state[index].title = action.payload.title
    });
  }
})
export const todolistReducer = slice.reducer

export const {changeFilterAC, changeTodolistEntityStatusAC} = slice.actions

//types
export type FilterType = 'all' | 'active' | 'completed'
export type  TodoListsDomainType = TodolistType & {
  filter: FilterType
  entityStatus: RequestStatusType
}
