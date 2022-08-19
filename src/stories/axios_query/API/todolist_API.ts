import axios from 'axios';

const settings = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '488c5e6a-adac-41ee-8371-dbe45d10120a'
    },
})

export type GetTodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type CommonResponseType<T = {}> = {
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
    data: T
}


export const todolistAPI = {
    getTodo() {
        return settings.get<GetTodoType[]>('todo-lists')
    },
    createTodo(title: string) {
        return settings.post<CommonResponseType<{ item: GetTodoType }>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return settings.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodo(p: { todolistId: string, title: string }) {
        return settings.put<CommonResponseType>(`todo-lists/${p.todolistId}`, {title: p.title})
    },
}