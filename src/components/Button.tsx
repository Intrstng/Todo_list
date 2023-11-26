import React, {FC} from 'react';

type ButtonPropsType = {
    buttonName: string
    callBack: () => void
    className?: string
}

export const Button: FC<ButtonPropsType> = (props) => {
    const onClickHandler = () => props.callBack();

    return (
        <button onClick={onClickHandler}
                className={props.className}>
            {props.buttonName}
        </button>
    );
};