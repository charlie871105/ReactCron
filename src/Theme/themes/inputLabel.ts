import { ThemeOptions } from '@mui/material';

export const inputLabel: ThemeOptions = {
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: ({ _, theme }) => {
          return {
            color: theme.palette.text.primary,
            margin: '4px 0',
            fontWeight: '400',
            fontSize: '12px',
            lineHeight: '16px',
          };
        },
      },
    },
  },
};
