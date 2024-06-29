import React, { ChangeEvent, FC, memo, useState } from 'react';
import TextField from '@mui/material/TextField';
import { StyleObject } from '../Button';

export type EditableSpanType = {
  oldTitle: string
  style?: StyleObject
  onBlurCallBack: (value: string) => void
  size?: 'small' | 'medium'
  className?: string
  disabled?: boolean
}

export const EditableSpan: FC<EditableSpanType> = memo(({ oldTitle,
                                                                    style,
                                                                    onBlurCallBack,
                                                                    size,
                                                                    className,
                                                                    disabled = false,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(oldTitle);
  const activateEdit = () => {
    if (newTitle) { // !!!!!!!!!!!!!!! //
      setEdit(!edit);
      onBlurCallBack(newTitle);
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
             className={className}
             style={style}
             value={newTitle}
             onChange={onChangeHandler}
             onBlur={activateEdit}
             placeholder={!newTitle ? 'Enter title...' : ''}  // !!!!!!!!!//
             size={size || 'small'}
             autoFocus
             color={'info'}
             disabled={disabled}
           />
         : <div style={style}>
              <span style={spanStyle}
                    onDoubleClick={activateEdit}>
                {oldTitle}
              </span>
           </div>
  );
});
