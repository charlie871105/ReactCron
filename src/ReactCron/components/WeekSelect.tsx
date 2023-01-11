import {
  Box,
  Paper,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { WEEK } from '../util';

type WeekSelectProps = {
  value: string[],
  onChange: (value: string[]) => void,
};
export function WeekSelect({ value, onChange }: WeekSelectProps) {
  const { t } = useTranslation();

  const handleWeek = (
    event: React.MouseEvent<HTMLElement>,
    dates: string[]
  ) => {
    if (dates.length >= 1) {
      onChange(dates);
    }
  };

  return (
    <Box>
      <InputLabel>{t('Choose Week')}</InputLabel>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '240px',
          paddingY: '4px',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <ToggleButtonGroup
          color="primary"
          value={value}
          onChange={handleWeek}
          sx={{
            display: 'flex',
            '.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
              marginLeft: '0px !important',
              boxSizing: 'border-box',
              border: 'none',
              margin: '2px',
              borderRadius: '5px',
              width: 'auto',
              height: '30px',
            },
            '.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
              boxSizing: 'border-box',
              border: 'none',
              margin: '2px',
              borderRadius: '5px',
              width: '30px',
              height: '30px',
            },
            '.MuiToggleButtonGroup-grouped:first-of-type': {
              boxSizing: 'border-box',
              marginLeft: '0px',
            },
          }}
        >
          {WEEK.map((date) => (
            <ToggleButton
              key={date.value}
              disableRipple={true}
              value={`${date.value}`}
            >
              {t(date.label)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Paper>
    </Box>
  );
}
