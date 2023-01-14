import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { ReactCronContext } from '../../ReactCronContext';
import { toCron } from '../../util';
import { MonthSelect } from '../MonthSelect';
import { TimeSelect } from '../TimeSelect';

export function Monthly() {
  const context = useContext(ReactCronContext);
  if (!context) {
    throw new Error('Unknow Context');
  }
  const { state, dispatch, onChange } = context;
  const { monthly } = state;

  return (
    <Box
      height="404px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="28px"
    >
      <MonthSelect
        value={monthly.dates}
        onChange={(value) => {
          dispatch({
            type: 'change_monthly',
            payload: {
              dates: value,
              hour: monthly.hour,
              minute: monthly.minute,
            },
          });
          onChange(
            toCron({
              type: 'change_monthly',
              payload: {
                dates: value,
                hour: monthly.hour,
                minute: monthly.minute,
              },
            }),
            false
          );
        }}
      />
      <TimeSelect
        mode="single"
        type="hour"
        value={monthly.hour}
        onChange={(value) => {
          dispatch({
            type: 'change_monthly',
            payload: {
              dates: monthly.dates,
              hour: value,
              minute: monthly.minute,
            },
          });
          onChange(
            toCron({
              type: 'change_monthly',
              payload: {
                dates: monthly.dates,
                hour: value,
                minute: monthly.minute,
              },
            }),
            false
          );
        }}
      />
      <TimeSelect
        mode="single"
        type="minute"
        value={monthly.minute}
        onChange={(value) => {
          dispatch({
            type: 'change_monthly',
            payload: {
              dates: monthly.dates,
              hour: monthly.hour,
              minute: value,
            },
          });
          onChange(
            toCron({
              type: 'change_monthly',
              payload: {
                dates: monthly.dates,
                hour: monthly.hour,
                minute: value,
              },
            }),
            false
          );
        }}
      />
    </Box>
  );
}
