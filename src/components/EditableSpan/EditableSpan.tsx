import React, {ChangeEvent, FC, useState} from 'react';

export type EditableSpanType = {
    oldTitle: string
    callBack: (value: string) => void
}

export const EditableSpan: FC<EditableSpanType> = (props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(props.oldTitle);

    const activateEdit = () => {
        setEdit(!edit);
        props.callBack(newTitle);
    }

    return (
        edit ? <input type={'text'}
                             value={newTitle}
                             onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)}
                             onBlur={activateEdit}
                             autoFocus/>
             : <span onDoubleClick={activateEdit}>{props.oldTitle}</span>
    );
};