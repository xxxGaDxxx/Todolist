import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    let [newTitle, seNewtTitle] = useState(props.title)

    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        seNewtTitle(e.currentTarget.value)
    }

    let addTask = () => {
        if (newTitle.trim() !== '') {
            props.callBack(newTitle.trim())
        }
    }


    const [edit, setEdit] = useState(false)
    let EditTrueHandler = () => {
        setEdit(!edit)
        addTask()
    }

    return (
        edit
            ? <input
                type="text"
                value={newTitle}
                onBlur={EditTrueHandler}
                autoFocus
                onChange={onChangeHandler}
            />
            : <span onDoubleClick={EditTrueHandler}>{props.title}</span>
    );
};

