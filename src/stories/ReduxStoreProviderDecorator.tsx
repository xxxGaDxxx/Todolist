import React from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {combineReducers, legacy_createStore} from 'redux';
import {v1} from 'uuid';
import {tasksReducer} from '../state/tasks-Reducer';
import {todolistReducer} from '../state/todolist-reducer';
import {TaskStatuses} from './axios_query/API/todolist_API';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ],
    tasks: {
        'todolistId1': [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, description: '', todoListId: 'todolistId1', order: 0, priority: 0, startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: 'JS', status: TaskStatuses.New, description: '', todoListId: 'todolistId1', order: 0, priority: 0, startDate: '', deadline: '', addedDate: ''}
        ],
        'todolistId2': [
            {id: v1(), title: 'Milk', status: TaskStatuses.Completed, description: '', todoListId: 'todolistId2', order: 0, priority: 0, startDate: '', deadline: '', addedDate: ''},
            {id: v1(), title: 'React Book', status: TaskStatuses.New, description: '', todoListId: 'todolistId2', order: 0, priority: 0, startDate: '', deadline: '', addedDate: ''}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState)


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}