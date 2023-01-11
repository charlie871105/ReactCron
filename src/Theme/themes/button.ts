import { ThemeOptions } from '@mui/material';

export const button: ThemeOptions = {
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return {};
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          return {
            fontSize: '14px',
            padding: '6px 12px',
          };
        },
      },
    },
  },
};
