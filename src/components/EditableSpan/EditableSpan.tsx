import React, {ChangeEvent, FC, useState} from 'react';

export type EditableSpanType = {
    oldTitle: string
    callBack: (value: string) => void
}

export const EditableSpan: FC<EditableSpanType> = (props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(props.oldTitle);

    const activateEdit = () => {
        if (newTitle) {                  // !!!!!!!!!!!!!!! //
            setEdit(!edit);
            props.callBack(newTitle);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }

    return (
        edit ? <input type={'text'}
                             value={newTitle}
                             onChange={onChangeHandler}
                             onBlur={activateEdit}
                             placeholder={!newTitle ? 'Enter title...' : ''}  // !!!!!!!!!!! //
                             autoFocus/>
             : <span onDoubleClick={activateEdit}>{props.oldTitle}</span>
    );
};