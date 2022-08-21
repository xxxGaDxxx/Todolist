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
        const title = 'NEW TODO'
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
        const todolistId = '2bb02295-e350-48a0-8d08-a1fe736fd99d'
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
        const todolistId = 'f079c698-f4e2-4ff6-9bab-5766adca8397'
        const title = 'TODO 1'
        todolistAPI.updateTodo({todolistId, title})
            .then(res => {
                console.log(res.data)
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const onClickGet = () => {
        todolistAPI.getTask(todolistId)
            .then(res => {
                console.log(res.data)
                setState(res.data.items)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>

            <input value={todolistId} placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={onClickGet}>get task</button>
        </div>
    </div>
}


export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const onClickDelete = () => {
        todolistAPI.deleteTask({todolistId, taskId})
            .then(res => {
                console.log(res.data)
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input value={taskId} placeholder={'taskId'} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <input value={todolistId} placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={onClickDelete}>delete task</button>
        </div>
    </div>
}


export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')


    const onClickCreate = () => {
        todolistAPI.createTask({todolistId, title})
            .then(res => {
                console.log(res.data.data.items)
                setState(res.data.data.items)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input value={title} placeholder={'title'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <input value={todolistId} placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={onClickCreate}>create task</button>
        </div>
    </div>
}


export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const onClickUpdate = () => {
        todolistAPI.updateTask({todolistId, taskId, title})
            .then(res => {
                console.log(res.data)
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input value={title} placeholder={'title'} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <input value={taskId} placeholder={'taskId'} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <input value={todolistId} placeholder={'todolistId'} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={onClickUpdate}>update task</button>
        </div>
    </div>
}