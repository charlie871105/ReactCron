import { Paper, Tab, Tabs } from '@mui/material';
import React, { useMemo, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactCronContext } from './ReactCronContext';
import { cronReducer } from './reducer';
import { CronMode, UserOnChange } from './type';
import {
  convertInitCron,
  FREQUENCY_DEFAULT,
  FREQUENCY_TYPE,
  isCronVaild,
  toCron,
} from './util';
import { Daily, Weekly, Monthly, Advance } from './components';
import './i18n';
import ReadableCronLabel from './components/ReadableCronLabel';

export type ReactCronProps = {
  initValue?: string;
  onChange: UserOnChange;
};

function ReactCron({ initValue = '* * * * *', onChange }: ReactCronProps) {
  const [initType, initFreq] = convertInitCron(initValue);
  const [tab, setTab] = useState(initType);

  const { t } = useTranslation();

  const [state, dispatch] = useReducer(cronReducer, {
    ...FREQUENCY_DEFAULT,
    ...initFreq,
  });

  const { cron, daily, weekly, monthly, advance } = state;

  const contextValue = useMemo(
    () => ({ state, dispatch, onChange }),
    [state, dispatch, onChange]
  );

  const handleTab = (mode: CronMode) => {
    setTab(mode);
    switch (mode) {
      case 'daily':
        dispatch({ type: 'set_daily' });
        onChange(
          toCron({
            type: 'change_daily',
            payload: { hours: daily.hours, minutes: daily.minutes },
          }),
          false
        );
        break;
      case 'weekly':
        dispatch({ type: 'set_weekly' });
        onChange(
          toCron({
            type: 'change_weekly',
            payload: {
              dates: weekly.dates,
              hour: weekly.hour,
              minute: weekly.minute,
            },
          }),
          false
        );
        break;
      case 'monthly':
        dispatch({ type: 'set_weekly' });
        onChange(
          toCron({
            type: 'change_monthly',
            payload: {
              dates: monthly.dates,
              hour: monthly.hour,
              minute: monthly.minute,
            },
          }),
          false
        );
        break;
      case 'advance':
        dispatch({ type: 'set_advance' });
        onChange(
          toCron({
            type: 'change_advance',
            payload: advance,
          }),
          !isCronVaild(
            toCron({
              type: 'change_advance',
              payload: advance,
            })
          )
        );
        break;

      default:
        throw new Error('Unknow Tab');
    }
  };

  return (
    <ReactCronContext.Provider value={contextValue}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid',
          borderColor: 'divider',
          alignItems: 'center',
          gap: '28px',
          pb: '28px',
        }}
        variant="outlined"
        elevation={0}
      >
        <Tabs value={tab}>
          {FREQUENCY_TYPE.map((type) => (
            <Tab
              key={type}
              label={t(type[0].toLocaleUpperCase() + type.substring(1))}
              value={type}
              onClick={() => handleTab(type)}
            />
          ))}
        </Tabs>

        <ReadableCronLabel cron={cron} />

        {tab === 'daily' && <Daily />}
        {tab === 'weekly' && <Weekly />}
        {tab === 'monthly' && <Monthly />}
        {tab === 'advance' && <Advance />}
      </Paper>
    </ReactCronContext.Provider>
  );
}

export default ReactCron;
