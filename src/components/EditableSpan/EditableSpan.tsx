import React, {ChangeEvent, FC, useReducer} from 'react';
import {activateEditAC, editSpanReducer} from '../reducers/editSpanReducer';
import {changeNewTitleAC, newTitleEditableSpanReducer} from '../reducers/newTitleEditableSpanReducer';

export type EditableSpanType = {
    oldTitle: string
    callBack: (value: string) => void
}

export const EditableSpan: FC<EditableSpanType> = (props) => {
    const [edit, dispatchEdit] = useReducer(editSpanReducer, false);
    const [newTitle, dispatchNewTitle] = useReducer(newTitleEditableSpanReducer, props.oldTitle);

    const activateEdit = () => {
        if (newTitle) {                  // !!!!!!!!!!!!!!! //
            dispatchEdit(activateEditAC(!edit));
            props.callBack(newTitle);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatchNewTitle(changeNewTitleAC(e.currentTarget.value))
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