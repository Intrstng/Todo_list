import { Button as MuiButton } from "@mui/material"
import { buttonAdditionalStyles } from "@/common/components/AddItemForm/AddItemForm.styles.ts"

export const MyButton = ({
  primary = false,
  size = "medium",
  onClickCallBack,
  variant,
  color,
  children,
  ...rest
}: MyButtonProps) => {
  // const mode = primary ? "storybook-button--primary" : "storybook-button--secondary"

  const onClickHandler = () => onClickCallBack()
  return (
    <MuiButton
      onClick={onClickHandler}
      variant={variant}
      color={color || "primary"}
      // className={["storybook-button", `storybook-button--${size}`, mode].join(" ")}
      {...rest}
      style={buttonAdditionalStyles}
    >
      {children}
    </MuiButton>
  )
}

export type MyButtonProps = {
  /** Is this the principal call to action on the page? */
  primary?: boolean
  /** Onclick handler */
  onClickCallBack: () => void
  /** Optional class name */
  className?: string
  /** Optional disabled state */
  disabled?: boolean
  /** Optional button variant type */
  variant?: "text" | "contained" | "outlined"
  /** Optional button color */
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
  /** Optional button size */
  size?: "small" | "medium" | "large"
  /** Optional icon for button in front */
  startIcon?: React.ReactNode
  /** Optional icon for button at the end */
  endIcon?: React.ReactNode
  /** Optional css styles */
  style?: React.CSSProperties
  /** Children passed to NewButton */
  children: React.ReactNode
}
