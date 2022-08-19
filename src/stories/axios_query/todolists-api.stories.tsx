import React, {useEffect, useState} from 'react'
import {todolistAPI} from './API/todolist_API';

export default {
    title: 'API'
}

// let settings = {
//     withCredentials:true,
//     headers:{
//         'API-KEY': '488c5e6a-adac-41ee-8371-dbe45d10120a'
//     },
// }
// 'https://social-network.samuraijs.com/api/1.1'

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
      /*  axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',settings)*/
        todolistAPI.getTodo()
            .then(res => {
                console.log(res.data)
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = 'NEW TODO'
        todolistAPI.createTodo(title)
            .then(res => {
                console.log(res.data.data.item)
                setState(res.data.data.item)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '2bb02295-e350-48a0-8d08-a1fe736fd99d'
        todolistAPI.deleteTodo(todolistId)
            .then(res => {
                console.log(res.data)
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = 'f079c698-f4e2-4ff6-9bab-5766adca8397'
        let title = 'TODO 1'
        todolistAPI.updateTodo({todolistId, title})
            .then(res => {
                console.log(res.data)
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}