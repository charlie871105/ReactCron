import { styled, TextField } from '@mui/material';

export const TimeField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    caretColor: 'transparent',

    '.MuiInputAdornment-root': {
      position: 'relative',
      '.MuiButton-root': {
        backgroundColor: 'transparent',
        minWidth: '0px',
        padding: '0px',
        display: 'none',
        position: 'absolute',
        top: '-10px',
        right: '28px',
        zIndex: 999,
      },
    },
  },
  ':hover': {
    '& .MuiOutlinedInput-root': {
      '.MuiInputAdornment-root': {
        '.MuiButton-root': {
          display: 'block',
        },
      },
    },
  },
  ':focus': {
    '& .MuiOutlinedInput-root': {
      '.MuiInputAdornment-root': {
        '.MuiButton-root': {
          display: 'block',
        },
      },
    },
  },
});
