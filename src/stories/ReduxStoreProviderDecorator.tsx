import React from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType} from '../app/store';
import {combineReducers, legacy_createStore} from 'redux';
import {v1} from 'uuid';
import {tasksReducer} from '../features/reducer-&-test/tasks-Reducer';
import {todolistReducer} from '../features/reducer-&-test/todolist-reducer';
import {TaskStatuses} from '../api/todolist_API';
import {appReducer} from '../app/app-reducer';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app:appReducer,
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0,entityStatus:'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0,entityStatus:'idle'}
    ],
    tasks: {
        'todolistId1': [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, description: '', todoListId: 'todolistId1', order: 0, priority: 0, startDate: '', deadline: '', addedDate: '', entityStatus:'idle'},
            {id: v1(), title: 'JS', status: TaskStatuses.New, description: '', todoListId: 'todolistId1', order: 0, priority: 0, startDate: '', deadline: '', addedDate: '', entityStatus:'idle'}
        ],
        'todolistId2': [
            {id: v1(), title: 'Milk', status: TaskStatuses.Completed, description: '', todoListId: 'todolistId2', order: 0, priority: 0, startDate: '', deadline: '', addedDate: '', entityStatus:'idle'},
            {id: v1(), title: 'React Book', status: TaskStatuses.New, description: '', todoListId: 'todolistId2', order: 0, priority: 0, startDate: '', deadline: '', addedDate: '', entityStatus:'idle'}
        ]
    },
    app: {status: 'loading',error: 'Error',isInitialized: false},
    auth:{isLoggedIn: false},
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState)


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}