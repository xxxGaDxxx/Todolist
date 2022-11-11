import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {AddCircle} from '@mui/icons-material';

type AddItemFormPropsType = {
  callBack: (title: string) => void
  disabled?: boolean
}

export const AddItemForm: React.FC<AddItemFormPropsType> = memo((props) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onChangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error) setError(null)
    if (e.key === 'Enter') {
      onClickAddTodoAndTask()
    }
  }

  const onClickAddTodoAndTask = () => {
    if (title.trim() !== '') {
      props.callBack(title.trim())
      setTitle('')
    }
    else {
      setError('Title is required')
    }
  }

  return (
    <div>
      <TextField style={{textAlign: 'center'}}
                 variant={'outlined'}
                 size={'small'}
                 label={'enter item title'}
                 helperText={error && 'Error! Typing is expected'}
                 value={title}
                 onChange={onChangeValueInput}
                 onKeyDown={onKeyDownHandler}
                 error={!!error}
                 disabled={props.disabled}

      />
      <IconButton onClick={onClickAddTodoAndTask} color={'primary'} disabled={props.disabled}
                  style={{marginLeft: '10px'}}>
        <AddCircle/>
      </IconButton>
    </div>
  );
});
