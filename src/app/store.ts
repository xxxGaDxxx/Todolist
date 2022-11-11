import {Action, combineReducers} from 'redux';
import {tasksReducer} from '../features/TodolistsList/Todolist/TasksList/reducer/tasks-reducer';
import {todolistReducer} from '../features/TodolistsList/reducer/todolist-reducer';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {appReducer} from './reducer/app-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from '../features/Auth/reducer/auth-reducer';


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
  app: appReducer,
  auth: authReducer,
})


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<typeof rootReducer>
//типизация для диспача что бы могли санк криейтор диспатчить
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, Action>

// @ts-ignore
window.store = store
