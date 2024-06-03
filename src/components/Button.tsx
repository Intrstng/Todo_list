import React, { FC, memo } from 'react';
import { Button as MuiButton } from '@mui/material';
//import Button from '@mui/material/Button'; // импорт MUI лучше так делать

export type StyleObject = {
    [key: string]: string | number | undefined;
}

type ButtonPropsType = {
    onClickCallBack: () => void
    className?: string
    disabled?: boolean
    variant?: 'text' | 'contained' | 'outlined'
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    size?: 'small' | 'medium' | 'large'
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
    style?: React.CSSProperties
    children: React.ReactNode
}

export const Button: FC<ButtonPropsType> = memo(({   onClickCallBack,
                                                variant,
                                                color,
                                                children,
                                                ...rest}) => {
    const onClickHandler = () => onClickCallBack();
    return (
        <MuiButton onClick={onClickHandler}
                   variant={variant}
                   color={color || 'primary'}
                   {...rest}
        >
            {children}
        </MuiButton>
    );
});