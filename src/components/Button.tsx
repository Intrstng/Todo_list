import React, {FC} from 'react';

type ButtonPropsType = {
    buttonName: string
    onClickCallBack: () => void
    className?: string
    isDisabled?: boolean
}

export const Button: FC<ButtonPropsType> = (props) => {
    const onClickHandler = () => props.onClickCallBack();

    return (
        <button onClick={onClickHandler}
                className={props.className}
                disabled={props.isDisabled}>
            {props.buttonName}
        </button>
    );
};