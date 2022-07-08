import {combineReducers, compose, legacy_createStore} from 'redux';
import {tasksReducer} from './tasks-Reducer';
import {todolistReducer} from './todolist-reducer';

declare global {
    interface Window {
        REDUX_DEVTOOLS_EXTENSION_COMPOSE?: typeof compose;
    }
}
// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})
const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
/*// непосредственно создаём store
export const store = legacy_createStore(rootReducer, composeEnhancers());*/
// непосредственно создаём store
export const store = legacy_createStore(rootReducer,composeEnhancers())
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store