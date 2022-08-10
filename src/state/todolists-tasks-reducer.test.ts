import {TaskPropsType, tasksReducer} from './tasks-Reducer';
import {addNewTodolistAC, todolistReducer, TodoListsType} from './todolist-reducer';


test('ids should be equals', () => {
    const startTasksState: TaskPropsType = {}
    const startTodolistsState: Array<TodoListsType> = []

    const action = addNewTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})