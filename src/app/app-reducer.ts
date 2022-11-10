import {authAPI} from '../api/todolist_API';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {handleServerNetworkError} from '../utils/error-utils';
import axios from 'axios';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  status: 'loading' as RequestStatusType,
  error: null as string | null,
  isInitialized: false
}

export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, thunkAPI) => {
  try {
    const {data} = await authAPI.me()

    if (data.resultCode === 0) {
      thunkAPI.dispatch(setIsLoggedInAC({isLoggedIn: true}));
    }
    return thunkAPI.rejectWithValue(null)

  } catch (err) {
    if (axios.isAxiosError(err)) {
      handleServerNetworkError(err.message, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue({errors: ['Error'], fieldsErrors: undefined})
    }
  } finally {
    return
  }
})


const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
  },
  extraReducers: builder => {
    builder.addCase(initializeAppTC.fulfilled, (state, action) => {
      state.isInitialized = true
    });

  }
})

export const appReducer = slice.reducer

export const {setAppStatusAC, setAppErrorAC,} = slice.actions

// для error-utils
export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
