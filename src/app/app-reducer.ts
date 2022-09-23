//app-reducer.tsx


import {authAPI} from '../api/todolist_API';
import {AppThunk} from './store';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import axios from 'axios';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status,
    } as const
}

export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}
export const setIsInitializedAC = (value: boolean) => {
    return {
        type: 'APP/SET-INITIALIZED',
        value
    } as const
}

export const initializeAppTC = (): AppThunk => (dispatch) => {
    authAPI.me().then(res => {

        if (res.data.resultCode === 0) {

            dispatch(setIsLoggedInAC(true));

        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch(err => {

        if (axios.isAxiosError(err)) {
            handleServerNetworkError(err.message, dispatch)
        }
    })
        .finally(() => {

            dispatch(setIsInitializedAC(true))
        })

}

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedACType = ReturnType<typeof setIsInitializedAC>

type ActionsType =
    | SetAppStatusACType
    | SetAppErrorACType
    | SetIsInitializedACType
