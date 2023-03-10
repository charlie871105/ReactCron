import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { ReactCronContext } from '../../ReactCronContext';
import { toCron } from '../../util';
import { TimeSelect } from '../TimeSelect';
import { WeekSelect } from '../WeekSelect';

export function Weekly() {
  const context = useContext(ReactCronContext);
  if (!context) {
    throw new Error('Unknow Context');
  }
  const { state, dispatch, onChange } = context;
  const { weekly } = state;

  return (
    <Box
      height="404px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="28px"
    >
      <WeekSelect
        value={weekly.dates}
        onChange={(value) => {
          dispatch({
            type: 'change_weekly',
            payload: { dates: value, hour: weekly.hour, minute: weekly.minute },
          });
          onChange(
            toCron({
              type: 'change_weekly',
              payload: {
                dates: value,
                hour: weekly.hour,
                minute: weekly.minute,
              },
            }),
            false
          );
        }}
      />
      <TimeSelect
        mode="single"
        type="hour"
        value={weekly.hour}
        onChange={(value) => {
          dispatch({
            type: 'change_weekly',
            payload: {
              dates: weekly.dates,
              hour: value,
              minute: weekly.minute,
            },
          });
          onChange(
            toCron({
              type: 'change_weekly',
              payload: {
                dates: weekly.dates,
                hour: value,
                minute: weekly.minute,
              },
            }),
            false
          );
        }}
      />
      <TimeSelect
        mode="single"
        type="minute"
        value={weekly.minute}
        onChange={(value) => {
          dispatch({
            type: 'change_weekly',
            payload: {
              dates: weekly.dates,
              hour: weekly.hour,
              minute: value,
            },
          });
          onChange(
            toCron({
              type: 'change_weekly',
              payload: {
                dates: weekly.dates,
                hour: weekly.hour,
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
