import { CronChangeEvent, CronState } from './type';
import { toCronTime } from './util';

export const cronReducer = (state: CronState, action: CronChangeEvent) => {
  const { daily, weekly, monthly, advance } = state;
  switch (action.type) {
    case 'change_daily':
      return {
        ...state,
        daily: action.payload,
        cron: `${toCronTime(action.payload.minutes)} ${toCronTime(
          action.payload.hours
        )} * * *`,
      };

    case 'change_weekly':
      return {
        ...state,
        weekly: action.payload,
        cron: `${action.payload.minute} ${action.payload.hour} * * ${toCronTime(
          action.payload.dates
        )}`,
      };

    case 'change_monthly':
      return {
        ...state,
        monthly: action.payload,
        cron: `${action.payload.minute} ${action.payload.hour} ${toCronTime(
          action.payload.dates
        )} * *`,
      };

    case 'change_advance':
      return { ...state, advance: action.payload, cron: action.payload };
    case 'set_daily':
      return {
        ...state,
        cron: `${toCronTime(daily.minutes)} ${toCronTime(daily.hours)} * * *`,
      };

    case 'set_weekly':
      return {
        ...state,
        cron: `${weekly.minute} ${weekly.hour} * * ${toCronTime(weekly.dates)}`,
      };

    case 'set_monthly':
      return {
        ...state,
        cron: `${monthly.minute} ${monthly.hour} ${toCronTime(
          monthly.dates
        )} * *`,
      };

    case 'set_advance':
      return {
        ...state,
        cron: advance,
      };

    default:
      throw new Error('Unknow reducer event');
  }
};
