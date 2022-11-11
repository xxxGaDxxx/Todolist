import {
  setAppErrorAC,
  SetAppErrorACType,
  setAppStatusAC,
  SetAppStatusACType
} from '../../app/reducer/app-reducer'
import {Dispatch} from 'redux'
import {ResponseType} from '../../api/todolist_API'


// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({error: data.messages[0]}))
  }
  else {
    dispatch(setAppErrorAC({error: 'Some error occurred'}))
  }
  dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (message: string, dispatch: ErrorUtilsDispatchType) => {
  dispatch(setAppStatusAC({status: 'failed'}))
  dispatch(setAppErrorAC({error: message}))
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorACType | SetAppStatusACType>
