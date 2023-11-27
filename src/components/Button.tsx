import React, {FC} from 'react';

type ButtonPropsType = {
    buttonName: string
    callBack: () => void
    className?: string
    isDisabled?: boolean
}

export const Button: FC<ButtonPropsType> = (props) => {
    const onClickHandler = () => props.callBack();

    return (
        <button onClick={onClickHandler}
                className={props.className}
                disabled={props.isDisabled}>
            {props.buttonName}
        </button>
    );
};