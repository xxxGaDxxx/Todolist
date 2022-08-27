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
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'Todolist 3 '
        todolistAPI.createTodo(title)
            .then(res => {
                setState(res.data.data.item)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'db16dcd1-6a53-4946-8978-85c19f5f1a74'
        todolistAPI.deleteTodo(todolistId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '30cada72-0bf6-4e4c-b5d9-a145eb047b19'
        const title = 'TODO 1111111111111'
        todolistAPI.updateTodo({todolistId, title})
            .then(res => {
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
                setState(res.data.data.item)
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
    const [title, setTitle] = useState<string>('title 1')
    const [description, setDescription] = useState<string>('description 1')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const onClickUpdate = () => {
        todolistAPI.updateTask(todolistId, taskId, {
            title: title,
            deadline: '',
            description: description,
            status: status,
            priority: priority,
            startDate: '',
        })
            .then(res => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input value={description} placeholder={'description'} onChange={(e) => {
                setDescription(e.currentTarget.value)
            }}/>
            <input value={status} placeholder={'status'} type={'number'} onChange={(e) => {
                setStatus(Number(e.currentTarget.value))
            }}/>
            <input value={priority} placeholder={'priority'} type={'number'} onChange={(e) => {
                setPriority(Number(e.currentTarget.value))
            }}/>
            <input value={startDate} placeholder={'startDate'} onChange={(e) => {
                setStartDate(e.currentTarget.value)
            }}/>
            <input value={deadline} placeholder={'deadline'} onChange={(e) => {
                setDeadline(e.currentTarget.value)
            }}/>
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