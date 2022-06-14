import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {AddCircle} from '@mui/icons-material';

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
            <TextField
                variant="outlined"
                label="Type value"
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                helperText={error}
            />
            {/*<Button onClick={onClickHandler} variant={'contained'} color={'primary'}>+</Button>*/}
            <IconButton onClick={onClickHandler} color={'primary'}>
                <AddCircle/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;