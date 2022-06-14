import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const [edit, setEdit] = useState(false)
    let [newTitle, seNewtTitle] = useState(props.title)

    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        seNewtTitle(e.currentTarget.value)
    }
    const onBlurHandler = () => {
        setEdit(false)
        props.callBack(newTitle)
    }


    let EditTrueHandler = () => {
        setEdit(true)
        seNewtTitle(props.title)
    }

    return (
        edit
            ? <TextField
                variant="standard"
                type="text"
                value={newTitle}
                onBlur={onBlurHandler}
                autoFocus
                onChange={onChangeHandler}
            />
            : <span onDoubleClick={EditTrueHandler}>{props.title}</span>
    );
};

