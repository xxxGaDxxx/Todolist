import axios from 'axios';

const settings = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '488c5e6a-adac-41ee-8371-dbe45d10120a'
    },
})



export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
    data: D
}

export type GetTaskResponseType = {
    error: string | null
    fieldsErrors: string[]
    totalCount: number
    items: TaskType[]
}
export type PostTaskResponseType = {
    error: string | null
    fieldsErrors: string[]
    totalCount: number
    data: {
        items: TaskType[]
    }
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}

export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


export const todolistAPI = {
    getTodo() {
        return settings.get<TodolistType[]>('todo-lists')
    },
    createTodo(title: string) {
        return settings.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return settings.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodo(p: { todolistId: string, title: string }) {
        return settings.put<ResponseType>(`todo-lists/${p.todolistId}`, {title: p.title})
    },
    getTask(todolistId: string) {
        return settings.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(p: { todolistId: string, taskId: string }) {
        return settings.delete<ResponseType>(`todo-lists/${p.todolistId}/tasks/${p.taskId}`)
    },
    createTask(p: { todolistId: string, title: string }) {
        return settings.post<PostTaskResponseType>(`todo-lists/${p.todolistId}/tasks`, {title: p.title})
    },
    updateTask(p: { todolistId: string, taskId: string, title: string }) {
        return settings.put<GetTaskResponseType>(`todo-lists/${p.todolistId}/tasks/${p.taskId}`, {title: p.title})
    },
}