import React, { ChangeEvent, KeyboardEvent, FocusEvent, FC } from 'react';
import TextField from '@mui/material/TextField';
import { StyleObject } from './Button';

type InputPropsType = {
  value: string
  label?: string
  className?: string
  onChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyDownCallback: (e: KeyboardEvent<HTMLInputElement>) => void
  onBlurCallback?: (e: FocusEvent<HTMLInputElement, Element>) => void
  style?: StyleObject
  size?: 'small' | 'medium'
  error: boolean
  disabled: boolean
}

export const Input: FC<InputPropsType> = (props) => {
  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => props.onChangeCallback(e);
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => props.onKeyDownCallback(e);
  const onBlurHandler = (e: FocusEvent<HTMLInputElement, Element>) => props.onBlurCallback && props.onBlurCallback(e);
  return (
    <TextField
      id='outlined-search'
      label={props.label}
      type='search'
      value={props.value}
      onChange={onChangeInputHandler}
      onKeyDown={onKeyDownHandler}
      onBlur={onBlurHandler}
      className={props.className}
      style={props.style}
      size={props.size || 'small'}
      error={props.error}
      disabled={props.disabled}
    />
  );
};