import { ChangeEvent, FocusEvent, KeyboardEvent, memo, useCallback, useState } from "react"
import { MAX_INPUT_TITLE_LENGTH } from "@/common/constants"
import { statusSelector } from "@/app/slices/appSlice"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { Status } from "@/app/slices/appSlice.types"
import { AddItemFormProps } from "@/common/components/AddItemForm/AddItemForm.types.ts"
import { Input } from "@/common/components/Input/Input.tsx"
import { Button } from "@/common/components/Button/Button.tsx"
import SendIcon from "@mui/icons-material/Send"
import Grid from "@material-ui/core/Grid"
import { buttonAdditionalStyles } from "@/common/components/AddItemForm/AddItemForm.styles.ts"

export const AddItemForm = memo(({ addItem, className, label, titleBtn, disabled = false }: AddItemFormProps) => {
  const [inputTitle, setInputTitle] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const appStatus = useAppSelector<Status>(statusSelector)

  const maxTitleLengthError = inputTitle.length > MAX_INPUT_TITLE_LENGTH

  const addTask = useCallback(() => {
    if (inputTitle.trim() !== "" && !maxTitleLengthError) {
      addItem(inputTitle.trim())
      appStatus !== "failed" && setInputTitle("")
      setError(null)
    }
  }, [addItem, inputTitle, maxTitleLengthError, setInputTitle, setError])

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.currentTarget.value)
    if (
      (event.currentTarget.value.length === MAX_INPUT_TITLE_LENGTH || event.currentTarget.value) &&
      !(event.currentTarget.value.length >= MAX_INPUT_TITLE_LENGTH + 1)
    ) {
      setError(null)
    } else if (event.currentTarget.value.length === MAX_INPUT_TITLE_LENGTH + 1) {
      setError("Your title is too long...")
    }
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputTitle.trim() === "") {
      setError("Field is required...")
      setInputTitle("")
    } else if (e.key === "Enter" && !maxTitleLengthError && inputTitle) {
      addTask()
      setError(null)
    }
  }

  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    setInputTitle(e.currentTarget.value.trim())
  }

  return (
    <Grid container spacing={1} className={className}>
      <Grid>
        <Input
          value={inputTitle}
          error={!!error}
          disabled={disabled}
          label={error ? error : label}
          onChangeCallback={onChangeInputHandler}
          onKeyDownCallback={onKeyDownHandler}
          onBlurCallback={onBlurHandler}
        />
      </Grid>
      <Grid>
        <Button
          startIcon={<SendIcon />}
          variant={!inputTitle.trim() || maxTitleLengthError ? "outlined" : "contained"}
          onClickCallBack={addTask}
          disabled={disabled || !inputTitle.trim() || maxTitleLengthError}
          style={buttonAdditionalStyles}
        >
          {titleBtn}
        </Button>
      </Grid>
    </Grid>
  )
})
