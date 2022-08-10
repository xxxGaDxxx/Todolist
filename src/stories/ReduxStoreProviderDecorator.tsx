import React from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {combineReducers, legacy_createStore} from 'redux';
import {v1} from 'uuid';
import {tasksReducer} from '../state/tasks-Reducer';
import {todolistReducer} from '../state/todolist-reducer';

//нуэен что бы необорачивали каждый раз компонету провайдером в истории

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: false}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)


export const  ReduxStoreProviderDecorator = (storyFn:()=>React.ReactNode)=>{
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}