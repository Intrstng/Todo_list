import React, { ChangeEvent, FC, FocusEvent, KeyboardEvent, memo, useCallback, useMemo, useState } from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import SendIcon from '@mui/icons-material/Send';
import { Grid } from '@material-ui/core';

export type AddItemFormPropsType = {
    addItem: (value: string) => void
    className?: string
    label?: string
    titleBtn: string
}


export const AddItemForm: FC<AddItemFormPropsType> = memo(({addItem,
             className,
             label,
             titleBtn
    }) => {
    const [inputTitle, setInputTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [textRef] = useAutoAnimate<HTMLParagraphElement>();
    const MAX_INPUT_TITLE_LENGTH = 12;
    const maxTitleLengthError = inputTitle.length > MAX_INPUT_TITLE_LENGTH;
            const addTask = useCallback(() => {
                if (inputTitle.trim() !== '' && !maxTitleLengthError) {
                    addItem(inputTitle.trim());
                    setInputTitle('');
                    setError(null);
                }
            }, [addItem, inputTitle, maxTitleLengthError, setInputTitle, setError])

            const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
                setInputTitle(event.currentTarget.value);
                if ((event.currentTarget.value.length === MAX_INPUT_TITLE_LENGTH || event.currentTarget.value) && !(event.currentTarget.value.length >= MAX_INPUT_TITLE_LENGTH + 1)) {
                    setError(null);
                } else if (event.currentTarget.value.length === MAX_INPUT_TITLE_LENGTH + 1) {
                    setError('Your title is too long...');
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

            // const inputFullClassName = `${S.inputField} ${error ? S.error : ''}`;

            const buttonAdditionalStyles = useMemo(() => ({
                maxWidth: '150px',
                maxHeight: '40px',
                minWidth: '100px',
                minHeight: '40px',
                fontSize: '12px',
            }), []);
  return (
        <Grid container spacing={1} className={className}>
            <Grid item>
                <Input value={inputTitle}
                       error={!!error}
                       label={error ? error : label}
                       onChangeCallback={onChangeInputHandler}
                       onKeyDownCallback={onKeyDownHandler}
                       onBlurCallback={onBlurHandler}
                />
            </Grid>
          {/*or AddBox*/}
          {/*<IconButton color={'primary'} onClick={addTask}*/}
          {/*            disabled={!inputTitle.trim() || maxTitleLengthError}>*/}
          {/*  <AddBox fontSize={'large'} />*/}
          {/*</IconButton>*/}
            <Grid item>
                  <Button startIcon={<SendIcon />}
                          variant={!inputTitle.trim() || maxTitleLengthError ? 'outlined' : 'contained'}
                          onClickCallBack={addTask}
                          disabled={!inputTitle.trim() || maxTitleLengthError}
                          style={buttonAdditionalStyles}>{titleBtn}
                  </Button>
            </Grid>
          {/*<Grid item>*/}
          {/*  {error && <p className={S.errorMessage}*/}
          {/*               ref={textRef}>{error}</p>}*/}
          {/*</Grid>*/}
        </Grid>
    );
});