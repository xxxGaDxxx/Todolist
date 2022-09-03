import {Action, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {tasksReducer} from '../features/reducer-&-test/tasks-Reducer';
import {todolistReducer} from '../features/reducer-&-test/todolist-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {appReducer} from './app-reducer';
import {TypedUseSelectorHook, useSelector} from 'react-redux';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
// типизация санки
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, Action>
//типизация для диспача что бы могли санк криейтор диспатчить
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, Action>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// export type AppDispatch = typeof store.dispatch
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// export type RootState = ReturnType<typeof store.getState>
//
// export const useAppDispatch: () => AppDispatch = useDispatch


// @ts-ignore
window.store = store