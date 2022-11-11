import React from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType, RootReducerType} from '../app/store';
import {combineReducers} from 'redux';
import {v1} from 'uuid';

import {todolistReducer} from '../features/TodolistsList/reducer/todolist-reducer';
import {TaskStatuses} from '../api/todolist_API';
import {appReducer} from '../app/reducer/app-reducer';
import {authReducer} from '../features/Auth/reducer/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {tasksReducer} from '../features/TodolistsList/Todolist/TasksList/reducer/tasks-reducer';


const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
    ],
    tasks: {
        'todolistId1': [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.New,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle'
            }
        ],
        'todolistId2': [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                description: '',
                todoListId: 'todolistId2',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: 'React Book',
                status: TaskStatuses.New,
                description: '',
                todoListId: 'todolistId2',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle'
            }
        ]
    },
    app: {status: 'succeeded', error: 'null', isInitialized: true},
    auth: {isLoggedIn: true},
}

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)

})


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}