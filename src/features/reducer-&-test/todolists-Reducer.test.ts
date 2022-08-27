import {
    addTodolistAC,
    changeFilterAC,
    newTitleTodolistAC,
    deleteTodolistAC,
    todolistReducer, TodoListsDomainType, FilterType
} from './todolist-reducer'
import {v1} from 'uuid'



let todolistID_1: string
let todolistID_2: string
let startState: TodoListsDomainType[]

beforeEach(() => {
    todolistID_1 = v1()
    todolistID_2 = v1()
    startState = [
        {id: todolistID_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistID_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]
})


test('correct todolist should be removed', () => {
    /*let todolistID_1 = v1();
    let todolistID_2 = v1();

    const startState: TodolistsType[] = [
        {id: todolistID_1, title: "What to learn", filter: "all"},
        {id: todolistID_2, title: "What to buy", filter: "all"}
    ]*/


    const endState = todolistReducer(startState, deleteTodolistAC(todolistID_1))

    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe('What to buy');
});

test('correct todolist should be added', () => {


    const endState = todolistReducer(startState, addTodolistAC(
        {id: v1(), title: 'What to learn', addedDate: '', order: 0}
    ))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('What to learn')
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const endState = todolistReducer(startState, newTitleTodolistAC(todolistID_2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterType = 'completed'

    const endState = todolistReducer(startState, changeFilterAC(todolistID_2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

