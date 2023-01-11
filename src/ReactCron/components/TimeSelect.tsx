import {
  Box,
  Button,
  InputAdornment,
  InputLabel,
  Popover,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';
import { formatDaily, HOURS, MINUTES } from '../util';
import { TimeField } from './TimeField';

type TimeSelectProps =
  | {
      value: string[],
      onChange: (value: string[]) => void,
      type: 'hour' | 'minute',
      mode: 'muti',
    }
  | {
      value: string,
      onChange: (value: string) => void,
      type: 'hour' | 'minute',
      mode: 'single',
    };

export function TimeSelect({ mode, type, value, onChange }: TimeSelectProps) {
  const { t } = useTranslation();

  const options = type === 'hour' ? HOURS : MINUTES;
  const label = type === 'hour' ? 'Choose Hour' : 'Choose Minute';
  const everyTime = type === 'hour' ? 'hourly' : 'minutely';

  const handleMutiValue = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string[]
  ) => {
    if (mode === 'muti') {
      onChange(newValue);
    }
  };

  const handleSingleValue = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    if (mode === 'single' && newValue !== null) {
      onChange(newValue);
    }
  };

  const [selectionAnchor, setSelectionAnchor] = useState<null | HTMLElement>(
    null
  );

  const openSelection = (event: React.MouseEvent<HTMLDivElement>) => {
    setSelectionAnchor(event.currentTarget);
  };

  const closeSelection = () => {
    setSelectionAnchor(null);
  };

  const isOpen = Boolean(selectionAnchor);

  return (
    <Box>
      <InputLabel>{t(label)}</InputLabel>
      <TimeField
        size="small"
        sx={{ width: '240px' }}
        value={
          value.length === 0
            ? t(everyTime)
            : `${formatDaily(value)}${value.length > 6 ? ' ...' : ''}`
        }
        onClick={openSelection}
        InputProps={{
          endAdornment:
            mode === 'muti' ? (
              <InputAdornment position="end">
                <Button
                  onClick={(event) => {
                    handleMutiValue(event, []);
                    event.stopPropagation();
                  }}
                >
                  <ClearIcon fontSize="small" />
                </Button>
                {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </InputAdornment>
            ) : null,
        }}
      />
      <Popover
        open={isOpen}
        anchorEl={selectionAnchor}
        onClose={closeSelection}
        elevation={1}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box width="240px" paddingLeft="2px">
          <ToggleButtonGroup
            color="primary"
            exclusive={mode === 'single'}
            value={value}
            onChange={mode === 'muti' ? handleMutiValue : handleSingleValue}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '240px',
              '.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
                marginLeft: '0px !important',
                boxSizing: 'border-box',
                width: '38px',
                height: '38px',
                margin: '2px',
                border: 'none',
                borderRadius: '5px',
              },
              '.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
                boxSizing: 'border-box',
                width: '38px',
                height: '38px',
                margin: '2px',
                border: 'none',
                borderRadius: '5px',
              },
              '.MuiToggleButtonGroup-grouped:first-of-type': {
                boxSizing: 'border-box',
                marginLeft: '0px',
              },
            }}
          >
            {options.map((time) => (
              <ToggleButton key={time} disableRipple={true} value={`${time}`}>
                {time}
              </ToggleButton>
            ))}
            );
          </ToggleButtonGroup>
        </Box>
      </Popover>
    </Box>
  );
}
