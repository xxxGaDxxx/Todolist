import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, FieldsErrorsType, LoginParamsType} from '../../api/todolist_API';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoggedIn: false
}

export const loginTC = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: string[], fieldsErrors?: FieldsErrorsType[] } }>('auth/login', async (param, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
  try {
    const {data} = await authAPI.login(param)

    if (data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
      return
    }
    else {
      handleServerAppError(data, thunkAPI.dispatch)

      return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
    }

  } catch (err) {
    if (axios.isAxiosError(err)) {
      handleServerNetworkError(err.message, thunkAPI.dispatch)

      return thunkAPI.rejectWithValue({errors: [err.message], fieldsErrors: undefined})
    }
    return thunkAPI.rejectWithValue({errors: ['Error'], fieldsErrors: undefined})
  }
})

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
  try {
    const {data} = await authAPI.logout()

    if (data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
      return
    }
    else {
      handleServerAppError(data, thunkAPI.dispatch)

      return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
    }

  } catch (err) {
    if (axios.isAxiosError(err)) {
      handleServerNetworkError(err.message, thunkAPI.dispatch)

      return thunkAPI.rejectWithValue({errors: ['Error'], fieldsErrors: undefined})
    }
    return thunkAPI.rejectWithValue({errors: ['Error'], fieldsErrors: undefined})
  }
})


const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    }
  },
  extraReducers: builder => {
    builder.addCase(loginTC.fulfilled, (state, action) => {
      state.isLoggedIn = true
    });

    builder.addCase(logoutTC.fulfilled, (state, action) => {
      state.isLoggedIn = false
    });
  }
})

export const authReducer = slice.reducer

export const {setIsLoggedInAC} = slice.actions
