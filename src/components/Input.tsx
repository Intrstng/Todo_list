import React, {ChangeEvent, KeyboardEvent, FocusEvent, FC} from 'react';

type InputPropsType = {
    value: string
    className?: string
    onChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyDownCallback: (e: KeyboardEvent<HTMLInputElement>) => void
    onBlurCallback?: (e: FocusEvent<HTMLInputElement, Element>) => void
}

export const Input: FC<InputPropsType> = (props) => {
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => props.onChangeCallback(e);
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => props.onKeyDownCallback(e);
    const onBlurHandler = (e: FocusEvent<HTMLInputElement, Element>) => props.onBlurCallback && props.onBlurCallback(e);

    return (
        <input value={props.value}
               onChange={onChangeInputHandler}
               onKeyDown={onKeyDownHandler}
               onBlur={onBlurHandler}
               className={props.className}/>
    );
};