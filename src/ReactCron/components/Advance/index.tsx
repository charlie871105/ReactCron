import { Box, InputLabel, TextField } from '@mui/material';
import { t } from 'i18next';
import React, { useContext } from 'react';
import { ReactCronContext } from '../../ReactCronContext';
import { toCron } from '../../util';

export function Advance() {
  const context = useContext(ReactCronContext);
  if (!context) {
    throw new Error('Unknow Context');
  }
  const { state, dispatch, onChange } = context;
  const { advance } = state;

  return (
    <Box
      height="404px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="28px"
    >
      <Box>
        <InputLabel>{t('CronExpression')}</InputLabel>
        <TextField
          sx={{ width: '250px' }}
          size="small"
          value={advance}
          onChange={(e) => {
            dispatch({
              type: 'change_advance',
              payload: e.target.value,
            });
            onChange(
              toCron({
                type: 'change_advance',
                payload: e.target.value,
              })
            );
          }}
        />
      </Box>
    </Box>
  );
}
