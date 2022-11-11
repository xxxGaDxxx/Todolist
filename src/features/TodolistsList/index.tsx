import {asyncActions as tasksAsyncActions} from './Todolist/TasksList/reducer/tasks-reducer'
import {asyncActions as todolistsAsyncActions, slice} from './reducer/todolist-reducer'
import {TodolistList} from './TodolistList'

const todolistsActions = {
  ...todolistsAsyncActions,
  ...slice.actions
}

const tasksActions = {
  ...tasksAsyncActions,
}

export {
  tasksActions,
  todolistsActions,
  TodolistList
}
