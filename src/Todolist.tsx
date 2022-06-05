import React from 'react';
import {FilterType} from './App';
import {Button} from '@mui/material';
import AddItemForm from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    filter: FilterType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    editTodolistHandler: (todolistId: string, title: string) => void
    editTask: (todolistId: string, taskID: string, newTitle: string) => void
}

export const Todolist: React.FC<PropsType> = (props) => {
    /*  let [title, setTitle] = useState('')
      let [error, setError] = useState<string | null>(null)

      let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
          setTitle(e.currentTarget.value)
      }
      let onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
          setError(null)
          if (e.key === 'Enter') {
              onClickHandler()
          }
      }
      let onClickHandler = () => {
          if (title.trim() !== '') {
              props.addTask(props.todolistId, title.trim())
              setTitle('')
          } else {
              setError('Title is reqired')
          }
      }*/
    let onClickAll = () => props.changeFilter(props.todolistId, 'all')
    let onClickActive = () => props.changeFilter(props.todolistId, 'active')
    let onClickComplited = () => props.changeFilter(props.todolistId, 'complited')

    let removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    let addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }
    let addEditableHandler = (newTitle: string) => {
        props.editTodolistHandler(props.todolistId, newTitle)
    }
    let addEditableTask = (taskID: string, newTitle: string) => {
        props.editTask(props.todolistId, taskID, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={addEditableHandler}/>
                {/*{props.title}*/}
                <Button variant="outlined" onClick={removeTodolistHandler}>x</Button>
            </h3>
            <AddItemForm callBack={addTaskHandler}/>
            {/*<div>
                <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={onClickHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>*/}
            <ul>
                {
                    props.tasks.map(t => {
                        let onClickHandler = () => props.removeTask(props.todolistId, t.id)
                        let onChangeCheckbox = () => {
                            props.changeTaskStatus(props.todolistId, t.id, !t.isDone)
                        }


                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={t.isDone} onChange={onChangeCheckbox}/>
                                <EditableSpan title={t.title}
                                              callBack={(newTitle) => addEditableTask(t.id, newTitle)}/> {/*//появился промежуточный ему приходит и от отдаёт уже 2 аргумента */}
                                {/*<span>{t.title}</span>*/}
                                <button onClick={onClickHandler}>x</button>
                            </li>
                        )
                    })
                }

            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onClickAll}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onClickActive}>Active
                </button>
                <button className={props.filter === 'complited' ? 'active-filter' : ''}
                        onClick={onClickComplited}>Complited
                </button>
            </div>
        </div>
    )
}