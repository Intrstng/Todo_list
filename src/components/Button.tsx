import React, { FC } from 'react';
import { Button as MuiButton } from '@mui/material';
//import Button from '@mui/material/Button'; // импорт MUI лучше так делать

export type StyleObject = {
    [key: string]: string | number | undefined;
}

type ButtonPropsType = {
    buttonName: string
    onClickCallBack: () => void
    className?: string
    isDisabled?: boolean
    variant?: 'text' | 'contained' | 'outlined'
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    size?: 'small' | 'medium' | 'large'
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
    style?: StyleObject
}

export const Button: FC<ButtonPropsType> = (props) => {
    const onClickHandler = () => props.onClickCallBack();
    return (
        <MuiButton onClick={onClickHandler}
            className={props.className}
            disabled={props.isDisabled}
            variant={props.variant}
            color={props.color || 'primary'}
            size={props.size || 'small'}
            startIcon={props.startIcon}
            endIcon={props.endIcon}
            style={props.style}
        >
            {props.buttonName}
        </MuiButton>
    );
};