import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { ReactCronContext } from '../../ReactCronContext';
import { ReactCronContextType } from '../../type';
import { toCron } from '../../util';
import { TimeSelect } from '../TimeSelect';

export function Monthly() {
  const context = useContext(ReactCronContext);
  if (!context) {
    throw new Error('Unknow Context');
  }
  const { state, dispatch, onChange } = context;
  const { daily } = state;

  return (
    <Box
      height="400px"
      padding="30px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="60px"
    >
      <TimeSelect
        mode="muti"
        type="hour"
        value={daily.hours}
        onChange={(value) => {
          dispatch({
            type: 'change_daily',
            payload: { hours: value, minutes: daily.minutes },
          });
          onChange(
            toCron({
              type: 'change_daily',
              payload: { hours: value, minutes: daily.minutes },
            })
          );
        }}
      />
      <TimeSelect
        mode="muti"
        type="minute"
        value={daily.minutes}
        onChange={(value) => {
          dispatch({
            type: 'change_daily',
            payload: { minutes: value, hours: daily.hours },
          });
          onChange(
            toCron({
              type: 'change_daily',
              payload: { minutes: value, hours: daily.hours },
            })
          );
        }}
      />
    </Box>
  );
}
