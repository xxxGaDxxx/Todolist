import {AddTodolistACType, SetTodosACType, RemoveTodolistACType} from './todolist-reducer';
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistAPI,
} from '../../api/todolist_API';
import {AppRootStateType, AppThunk} from '../../app/store';

let initialProfileState: TaskPropsType = {}

export const tasksReducer = (state = initialProfileState, action: TaskReducerType): TaskPropsType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'SET-TASK':
            return {...state, [action.todolistId]: action.tasks}
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOS':
            // return action.todolists.reduce((acc,el)=>{
            //     stateCopy[el.id]=[]
            //     return stateCopy
            // },{...state})
            const stateCopy = {...state}
            action.todolists.forEach(t => {
                stateCopy[t.id] = []
            })
            return stateCopy
        default:
            return state
    }
}

type TaskReducerType =
    | RemoveTaskACType
    | AddTaskACType
    | UpdateTaskACType
    | SetTaskType
    | AddTodolistACType
    | RemoveTodolistACType
    | SetTodosACType

//action
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId,
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        task,
    } as const
}

type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskModelType) => {
    return {
        type: 'UPDATE-TASK',
        todolistId,
        taskId,
        model,
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


//thunk
export const getTaskTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistAPI.getTask(todolistId)
        .then(res => {
            dispatch(setTaskAC(res.data.items, todolistId))
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk =>
    (dispatch) => {
        todolistAPI.deleteTask({todolistId, taskId})
            .then(res => {
                dispatch(removeTaskAC(todolistId, taskId))
            })
    }

export const createTaskTC = (todolistId: string, title: string): AppThunk =>
    (dispatch) => {
        todolistAPI.createTask({todolistId, title})
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }

export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateTaskModelType): AppThunk =>
    (dispatch, getState: () => AppRootStateType) => {
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
                    dispatch(updateTaskAC(todolistId, taskId, model))
                })
        }
        console.warn('task not found')
        return
    }

//types
export type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TaskPropsType = {
    [key: string]: TaskType[]
}
