import {addTodosTC, todolistReducer, TodoListsDomainType} from './todolist-reducer';
import {v1} from 'uuid';
import {TaskPropsType, tasksReducer} from '../Todolist/TasksList/reducer/tasks-reducer';


test('ids should be equals', () => {
  const startTasksState: TaskPropsType = {}
  const startTodolistsState: Array<TodoListsDomainType> = []

  const action = addTodosTC.fulfilled({
    todolist: {
      id: v1(),
      title: 'What to learn',
      addedDate: '',
      order: 0
    }
  }, 'requestId', {title: 'What to learn'})

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})