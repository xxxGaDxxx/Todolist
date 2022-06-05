import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    callBack: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {
    let [title, setTitle] = useState('')
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
            props.callBack(title.trim())
            setTitle('')
        } else {
            setError('Title is reqired')
        }
    }
    return (
        <div>
            <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}
                   className={error ? 'error' : ''}/>
            <button onClick={onClickHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

export default AddItemForm;