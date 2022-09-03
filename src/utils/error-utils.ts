import {setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from '../app/app-reducer'
import {Dispatch} from 'redux'
import {ResponseType} from '../api/todolist_API'


// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (message: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(message))
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorACType | SetAppStatusACType>
