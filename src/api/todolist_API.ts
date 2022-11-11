import {AxiosResponse} from 'axios';
import {RequestStatusType} from '../app/reducer/app-reducer';
import {instance} from './config';


// api
export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: string }>>>('auth/login', data)
  },

  me() {
    return instance.get<ResponseType<{ id: string, email: string, login: string }>>('auth/me')
  },

  logout() {
    return instance.delete<ResponseType>('auth/login')
  },
}


export const todolistAPI = {
  getTodo() {
    return instance.get<TodolistType[]>('todo-lists')
  },

  addTodo(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
  },

  deleteTodo(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },

  updateTodo(p: { todolistId: string, title: string }) {
    return instance.put<ResponseType>(`todo-lists/${p.todolistId}`, {title: p.title})
  },
}


export const taskAPI = {
  getTask(todolistId: string) {
    return instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
  },

  deleteTask(p: { todolistId: string, taskId: string }) {
    return instance.delete<ResponseType>(`todo-lists/${p.todolistId}/tasks/${p.taskId}`)
  },

  addTask(p: { todolistId: string, title: string }) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${p.todolistId}/tasks`, {title: p.title}).then(res => {
      return res
    })
  },

  updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
    return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}


//types

export type LoginParamsType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type FieldsErrorsType = {
  field: string
  message: string
}

export type ResponseType<D = {}> = {
  messages: string[]
  fieldsErrors: FieldsErrorsType[]
  resultCode: number
  data: D
}
export type GetTaskResponseType = {
  error: string | null
  fieldsErrors: string[]
  totalCount: number
  items: TaskType[]
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
  entityStatus: RequestStatusType
}
export type UpdateTaskType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}