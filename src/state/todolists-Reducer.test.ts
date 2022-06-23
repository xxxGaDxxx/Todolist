import {
    addNewTodolistAC,
    changeFilterAC,
    editTodolistHandlerAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-Reducer'
import { v1 } from 'uuid'
import {FilterType, TodolistsType} from '../App'

test('correct todolist should be removed', () => {
    let todolistID_1 = v1();
    let todolistID_2 = v1();

    const startState: TodolistsType[] = [
        {id: todolistID_1, title: "What to learn", filter: "all"},
        {id: todolistID_2, title: "What to buy", filter: "all"}
    ]

    /*const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1})*/
    const endState = todolistsReducer(startState, removeTodolistAC(todolistID_1))

    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe("What to buy");
});

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: TodolistsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

   /* const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})*/
    const endState = todolistsReducer(startState, addNewTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: TodolistsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    /*const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    }*/

    const endState = todolistsReducer(startState, editTodolistHandlerAC(todolistId2,newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterType = 'completed'

    const startState:TodolistsType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

   /* const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }*/

    const endState = todolistsReducer(startState, changeFilterAC(todolistId2,newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})