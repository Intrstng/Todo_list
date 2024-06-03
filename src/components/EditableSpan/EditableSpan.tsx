import React, { ChangeEvent, FC, memo, useState } from 'react';
import TextField from '@mui/material/TextField';
import { StyleObject } from '../Button';

export type EditableSpanType = {
  oldTitle: string
  style?: StyleObject
  onBlurCallBack: (value: string) => void
  size?: 'small' | 'medium'
  className?: string
}

export const EditableSpan: FC<EditableSpanType> = memo((props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(props.oldTitle);
  const activateEdit = () => {
    if (newTitle) { // !!!!!!!!!!!!!!! //
      setEdit(!edit);
      props.onBlurCallBack(newTitle);
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  }

  const spanStyle = {
    overflow: 'hidden'
  }

  return (
    edit ? <TextField
             id='standard-search'
             type='search'
             variant='standard'
             error={!newTitle.length}
             className={props.className}
             style={props.style}
             value={newTitle}
             onChange={onChangeHandler}
             onBlur={activateEdit}
             placeholder={!newTitle ? 'Enter title...' : ''}  // !!!!!!!!!//
             size={props.size || 'small'}
             autoFocus
             color={'info'}
           />
         : <div style={props.style}>
              <span style={spanStyle}
                    onDoubleClick={activateEdit}>
                {props.oldTitle}
              </span>
           </div>
  );
});
