import React, {ChangeEvent, FC, FocusEvent, KeyboardEvent, useReducer, useState} from 'react';
import {Input} from '../Input';
import S from '../TodoList/TodoList.module.css';
import {Button} from '../Button';
import {useAutoAnimate} from '@formkit/auto-animate/react';

export type AddItemFormPropsType = {
    addItem: (value: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = (props) => {
    const [inputTitle, setInputTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [textRef] = useAutoAnimate<HTMLParagraphElement>();
    const MAX_INPUT_TITLE_LENGTH = 20;
    const maxTitleLengthError = inputTitle.length > MAX_INPUT_TITLE_LENGTH;

            const addTask = () => {
                if (inputTitle.trim() !== '' && !maxTitleLengthError) {
                    props.addItem(inputTitle.trim());
                    setInputTitle('');
                    setError(null);
                }
            }

            const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
                setInputTitle(event.currentTarget.value);
                if ((event.currentTarget.value.length === MAX_INPUT_TITLE_LENGTH || event.currentTarget.value) && !(event.currentTarget.value.length >= MAX_INPUT_TITLE_LENGTH + 1)) {
                    setError(null);
                } else if (event.currentTarget.value.length === MAX_INPUT_TITLE_LENGTH + 1) {
                    setError('Your title is too long. Please, enter correct title.');
                }
            }

            const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter' && inputTitle.trim() === '') {
                    setError('Field is required...');
                    setInputTitle('');
                } else if (e.key === 'Enter' && !maxTitleLengthError
                    && inputTitle) {
                    addTask();
                    setError(null);
                }
            }

            const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
                setInputTitle(e.currentTarget.value.trim());
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