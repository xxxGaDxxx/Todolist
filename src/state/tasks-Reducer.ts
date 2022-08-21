import {v1} from 'uuid';
import {AddNewTodolistACType, RemoveTodolistACType} from './todolist-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../stories/axios_query/API/todolist_API';


export type TaskPropsType = {
    [key: string]: TaskType[]
}

let initialProfileState: TaskPropsType = {}


export const tasksReducer = (state = initialProfileState, action: TaskReducerType): TaskPropsType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            let newTask:TaskType = {id: v1(), title: action.title, status:TaskStatuses.New,todoListId:action.todolistId,startDate:'',addedDate:'',deadline:'',order:0,priority:TaskPriorities.Low,description:''}
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case 'CHANGE-STATUS-TASK':

            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status:action.status
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
            return state
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

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId,
    } as const
}

type AddTaskACReducerType = ReturnType<typeof addTaskAC>

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId,
    } as const
}

type ChangeTaskStatusACReducerType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (todolistId: string, taskId: string, status:TaskStatuses) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        todolistId,
        taskId,
        status,
    } as const
}


type ChangeTaskTitleACReducerType = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        taskId,
        title,
        todolistId,
    } as const
}
