import React, {ChangeEvent, FC, FocusEvent, KeyboardEvent, useReducer, useState} from 'react';
import {Input} from '../Input';
import S from '../TodoList/TodoList.module.css';
import {Button} from '../Button';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;
import {useAutoAnimate} from '@formkit/auto-animate/react';
import {changeErrorAC, errorAddItemFormReducer} from '../reducers/errorAddItemFormReducer';
import {changeInputTitleAC, inputTitleAddItemFormReducer} from '../reducers/inputTitleAddItemFormReducer';

export type AddItemFormPropsType = {
    addItem: (value: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = (props) => {
    const [inputTitle, dispatchInputTitle] = useReducer(inputTitleAddItemFormReducer, '');


    const [error, dispatchError] = useReducer(errorAddItemFormReducer, null);
    const [textRef] = useAutoAnimate<HTMLParagraphElement>();
    const MAX_INPUT_TITLE_LENGTH = 20;
    const maxTitleLengthError = inputTitle.length > MAX_INPUT_TITLE_LENGTH;

            const addTask = () => {
                if (inputTitle.trim() !== '' && !maxTitleLengthError) {
                    props.addItem(inputTitle.trim());
                    dispatchInputTitle(changeInputTitleAC(''));
                    dispatchError(changeErrorAC(null));
                }
            }

            const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
                dispatchInputTitle(changeInputTitleAC(event.currentTarget.value));
                if ((event.currentTarget.value.length === MAX_INPUT_TITLE_LENGTH || event.currentTarget.value) && !(event.currentTarget.value.length >= MAX_INPUT_TITLE_LENGTH + 1)) {
                    dispatchError(changeErrorAC(null));
                } else if (event.currentTarget.value.length === MAX_INPUT_TITLE_LENGTH + 1) {
                    dispatchError(changeErrorAC('Your title is too long. Please, enter correct title.'));
                }
            }

            const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter' && inputTitle.trim() === '') {
                    dispatchError(changeErrorAC('Field is required...'));
                    dispatchInputTitle(changeInputTitleAC(''));
                } else if (e.key === 'Enter' && !maxTitleLengthError
                    && inputTitle) {
                    addTask();
                    dispatchError(changeErrorAC(null));
                }
            }

            const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
                dispatchInputTitle(changeInputTitleAC(e.currentTarget.value.trim()));
            }

    return (
        <div>
            <Input value={inputTitle}
                   onChangeCallback={onChangeInputHandler}
                   onKeyDownCallback={onKeyDownHandler}
                   onBlurCallback={onBlurHandler}
                   className={error ? S.error : ''}/>
            <Button buttonName={'+'}
                    onClickCallBack={addTask}
                    isDisabled={!inputTitle.trim() || maxTitleLengthError}/>
            {error && <p className={S.errorMessage}
                         ref={textRef}>{error}</p>}
        </div>
    );
};