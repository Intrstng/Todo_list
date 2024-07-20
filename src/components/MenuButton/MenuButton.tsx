import { styled, Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';

// Reusable component (styled)

type MenuButtonProps = {
  theme?: Theme;
  background?: string;
};

export const MenuButton = styled(Button)<MenuButtonProps>(({ theme, background }) => ({
  minWidth: '110px',
  fontWeight: 'bold',
  boxShadow: `0 0 0 2px ${theme && theme.palette.primary.dark},
              4px 4px 0 0 ${theme && theme.palette.primary.dark}`,
  borderRadius: '2px',
  textTransform: 'capitalize',
  margin: '0 10px',
  padding: '8px 24px',
  color: theme && theme.palette.primary.contrastText,
  background: background || (theme && theme.palette.primary.light),
}));
