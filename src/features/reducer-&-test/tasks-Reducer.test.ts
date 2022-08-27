import {
    addTaskAC,
    updateTaskAC,
    removeTaskAC,
    TaskPropsType,
    tasksReducer
} from './tasks-Reducer'
import {addTodolistAC, deleteTodolistAC} from './todolist-reducer';
import {TaskStatuses} from '../../api/todolist_API';
import {v1} from 'uuid';

let startState: TaskPropsType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ]
    }
})


test('correct task should be deleted from correct array', () => {
    /* const startState: TaskPropsType = {
         'todolistId1': [
             {id: '1', title: 'CSS', isDone: false},
             {id: '2', title: 'JS', isDone: true},
             {id: '3', title: 'React', isDone: false}
         ],
         'todolistId2': [
             {id: '1', title: 'bread', isDone: false},
             {id: '2', title: 'milk', isDone: true},
             {id: '3', title: 'tea', isDone: false}
         ]
     }*/

    const action = removeTaskAC('todolistId2', '2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                description: '',
                todoListId: 'todolistId1',
                order: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ]
    })
})


test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        id: '123',
        title: 'WWWWWWWWWW',
        status: TaskStatuses.New,
        description: '',
        todoListId: 'todolistId1',
        order: 0,
        priority: 0,
        startDate: '',
        deadline: '',
        addedDate: ''
    })

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId1'][0].title).toBe('WWWWWWWWWW')
    expect(endState['todolistId2'][0].status).toBe(0)
})


test('status of specified task should be changed', () => {
    const action = updateTaskAC('todolistId2', '2', {
        title: 'new AC123',
        status: 0,
        description: '',
        priority: 0,
        startDate: '',
        deadline: '',
    })

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].status).toBe(2)
    expect(endState['todolistId2'][1].status).toBe(0)
    expect(endState['todolistId2'][1].title).toBe('new AC123')

})


test('title of specified task should be changed', () => {
    const action = updateTaskAC('todolistId2', '2', {
        title: 'new AC',
        status: TaskStatuses.New,
        description: '',
        priority: 0,
        startDate: '',
        deadline: '',
    })

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId2'][1].title).toBe('new AC')
    expect(endState['todolistId2'].length).toBe(3)

})


test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({id: v1(), title: 'What to learn', addedDate: '', order: 0})

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})


test('property with todolistId should be deleted', () => {
    const action = deleteTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})