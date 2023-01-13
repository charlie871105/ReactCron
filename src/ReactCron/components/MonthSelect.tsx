import {
  Box,
  Paper,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MONTH } from '../util';

type MonthSelectProps = {
  value: string[];
  onChange: (value: string[]) => void;
};
export function MonthSelect({ value, onChange }: MonthSelectProps) {
  const { t } = useTranslation();

  const handleMonth = (
    event: React.MouseEvent<HTMLElement>,
    dates: string[]
  ) => {
    if (dates.length >= 1) {
      onChange(dates);
    }
  };

  return (
    <Box>
      <InputLabel>{t('Choose Month')}</InputLabel>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '250px',
          paddingY: '2px',
          paddingLeft: '4px',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <ToggleButtonGroup
          color="primary"
          value={value}
          onChange={handleMonth}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '238px',
            '.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
              marginLeft: '0px !important',
              boxSizing: 'border-box',
              width: '30px',
              height: '30px',
              margin: '4px',
              border: 'none',
              borderRadius: '5px',
            },
            '.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
              boxSizing: 'border-box',
              width: '30px',
              height: '30px',
              margin: '4px',
              border: 'none',
              borderRadius: '5px',
            },
            '.MuiToggleButtonGroup-grouped:first-of-type': {
              boxSizing: 'border-box',
              marginLeft: '0px',
            },
          }}
        >
          {MONTH.map((date) => (
            <ToggleButton
              sx={{ margin: '5px' }}
              key={date}
              disableRipple={true}
              value={date}
            >
              {date}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Paper>
    </Box>
  );
}
