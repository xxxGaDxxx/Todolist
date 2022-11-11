import React, {ChangeEvent, memo, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
  title: string
  callBack: (title: string) => void
  disabled?: boolean
}

export const EditableSpan: React.FC<EditableSpanPropsType> = memo((props) => {
  const [edit, setEdit] = useState(false)
  const [newTitle, seNewtTitle] = useState(props.title)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    seNewtTitle(e.currentTarget.value)
  }

  const onBlurHandler = () => {
    setEdit(false)
    props.callBack(newTitle)
  }

  const editTrueHandler = () => {
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
        disabled={props.disabled}
      />

      : <span onDoubleClick={editTrueHandler} style={{maxWidth:'280px'}}>{props.title}</span>
  );
});
