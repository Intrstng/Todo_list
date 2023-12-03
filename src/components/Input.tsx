import React, {ChangeEvent, KeyboardEvent, FC} from 'react';

type InputPropsType = {
    value: string
    className?: string
    onChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyDownCallback: (e: KeyboardEvent<HTMLInputElement>) => void
}

export const Input: FC<InputPropsType> = (props) => {
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => props.onChangeCallback(e);
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => props.onKeyDownCallback(e);

    return (
        <input value={props.value}
               onChange={onChangeInputHandler}
               onKeyDown={onKeyDownHandler}
               className={props.className}/>
    );
};