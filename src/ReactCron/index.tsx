import React, { useMemo, useReducer } from 'react';
import { ReactCronContext } from './ReactCronContext';
import { cronReducer } from './reducer';

function ReactCron() {
  const [state, dispatch] = useReducer(cronReducer, {
    cron: '* * * * *',
    daily: { hours: [], minutes: [] },
    weekly: { dates: [], hour: '0', minute: '0' },
    monthly: { dates: [], hour: '0', minute: '0' },
    advance: '* * * * *',
  });

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ReactCronContext.Provider value={contextValue}>
      ReactCron
    </ReactCronContext.Provider>
  );
}

export default ReactCron;
