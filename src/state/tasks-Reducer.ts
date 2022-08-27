import {AddNewTodolistACType, GetTodosACType, RemoveTodolistACType} from './todolist-reducer';
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistAPI,
} from '../stories/axios_query/API/todolist_API';
import {AppRootStateType, AppThunk} from './store';


export type TaskPropsType = {
    [key: string]: TaskType[]
}

let initialProfileState: TaskPropsType = {}


export const tasksReducer = (state = initialProfileState, action: TaskReducerType): TaskPropsType => {
    switch (action.type) {
        case 'SET-TASK':

            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        // return {
        //     ...state,
        //     [action.todolistId]:state[action.todolistId]=action.tasks
        // }

        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            // let newTask: TaskType = {
            //     id: v1(),
            //     title: action.title,
            //     status: TaskStatuses.New,
            //     todoListId: action.todolistId,
            //     startDate: '',
            //     addedDate: '',
            //     deadline: '',
            //     order: 0,
            //     priority: TaskPriorities.Low,
            //     description: ''
            // }
            // return {
            //     ...state,
            //     [action.todolistId]: [newTask, ...state[action.todolistId]]
            // }
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case 'UPDATE-TASK':
            /* return {
                 ...state,
                 [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                     ...t,
                     status: action.status
                 } : t)
             }*/
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t, status: action.status} : t)
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
        case 'SET-TODOS': {
            const stateCopy = {...state}
            action.todolists.forEach(t => {
                stateCopy[t.id] = []
            })
            return stateCopy
        }

        default:
            return state
    }
}

type TaskReducerType =
    RemoveTaskACReducerType
    | AddTaskACReducerType
    | UpdateTaskACPropsType
    | ChangeTaskTitleACReducerType
    | AddNewTodolistACType
    | RemoveTodolistACType
    | GetTodosACType
    | SetTaskType

type RemoveTaskACReducerType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId,
    } as const
}

type AddTaskACReducerType = ReturnType<typeof addTaskAC>

export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        task,
    } as const
}

type UpdateTaskACPropsType = ReturnType<typeof updateTaskAC>


export const updateTaskAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {
        type: 'UPDATE-TASK',
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

type SetTaskType = ReturnType<typeof setTaskAC>

export const setTaskAC = (tasks: TaskType[], todolistId: string) => {
    return {
        type: 'SET-TASK',
        tasks,
        todolistId,
    } as const
}


export const getTaskTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistAPI.getTask(todolistId)
        .then(res => {
            dispatch(setTaskAC(res.data.items, todolistId))
        })
}


export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    todolistAPI.deleteTask({todolistId, taskId})
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}

export const createTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    todolistAPI.createTask({todolistId, title})
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export type UpdateTaskTCType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateTaskTCType): AppThunk => (dispatch, getState: () => AppRootStateType) => {
    //достаём таски с getState с нужного тудулиста и при помощи  find  дастаём нужную таску
    const task = getState().tasks[todolistId].find(t => t.id === taskId)
    if (task) {
        todolistAPI.updateTask(todolistId, taskId, {
            //достаём всё то что нужно отправить для обновления и ...model перезаписываем то что пришло
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...model
        })
            .then(res => {
                // ! мы берём ответсвенность что undefined  не  прийдёт
                dispatch(updateTaskAC(todolistId, taskId, model.status!))
            })
    }
}




