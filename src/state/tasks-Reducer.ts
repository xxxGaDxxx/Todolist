import {TaskPropsType} from '../App';
import {v1} from 'uuid';
import {AddNewTodolistACType, RemoveTodolistACType} from './todolists-Reducer';


export const tasksReducer = (state: TaskPropsType, action: TaskReducerType): TaskPropsType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case 'CHANGE-STATUS-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case 'CHANGE-TITLE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            throw new Error('I don\'t understand this type')
    }
}

type TaskReducerType =
    RemoveTaskACReducerType
    | AddTaskACReducerType
    | ChangeTaskStatusACReducerType
    | ChangeTaskTitleACReducerType
    | AddNewTodolistACType
    | RemoveTodolistACType

type RemoveTaskACReducerType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId,
    } as const
}

type AddTaskACReducerType = ReturnType<typeof addTaskAC>

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId,
    } as const
}

type ChangeTaskStatusACReducerType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        taskId,
        isDone,
        todolistId,
    } as const
}


type ChangeTaskTitleACReducerType = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        taskId,
        title,
        todolistId,
    } as const
}
