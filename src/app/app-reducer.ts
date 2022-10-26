import {authAPI} from '../api/todolist_API';
import {AppThunk} from './store';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import axios from 'axios';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}


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
        setIsInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value

        }

    }
})

export const appReducer = slice.reducer

export const {setIsInitializedAC, setAppErrorAC, setAppStatusAC} = slice.actions
export const initializeAppTC = (): AppThunk => (dispatch) => {

    authAPI.me().then(res => {
        console.log(res)
        if (res.data.resultCode === 0) {

            dispatch(setIsLoggedInAC({value: true}));

        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch(err => {
        console.log(err)
        if (axios.isAxiosError(err)) {
            handleServerNetworkError(err.message, dispatch)
        }
    })
        .finally(() => {

            dispatch(setIsInitializedAC({value: true}))
        })

}

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedACType = ReturnType<typeof setIsInitializedAC>
