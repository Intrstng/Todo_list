import { styled, Theme } from '@mui/material/styles'
import Button from '@mui/material/Button'


// Reusable component (styled)

type MenuButtonProps = {
  customTheme?: Theme
  background?: string
}

export const MenuButton = styled(Button)<MenuButtonProps>(({customTheme, background}) => ({
  minWidth: '110px',
  fontWeight: 'bold',
  boxShadow: `0 0 0 2px ${customTheme && customTheme.palette.primary.dark},
              4px 4px 0 0 ${customTheme && customTheme.palette.primary.dark}`,
  borderRadius: '2px',
  textTransform: 'capitalize',
  margin: '0 10px',
  padding: '8px 24px',
  color: customTheme && customTheme.palette.primary.contrastText,
  background: background || customTheme && customTheme.palette.primary.light,
}))