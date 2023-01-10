import { CronAction, CronState } from './type';
import { toCronTime } from './util';

export const cronReducer = (state: CronState, action: CronAction) => {
  const { daily, weekly, monthly, advance } = state;
  switch (action.type) {
    case 'change_daily':
      return { ...state, daily: action.payload };

    case 'change_weekly':
      return { ...state, weekly: action.payload };

    case 'change_monthly':
      return { ...state, monthly: action.payload };

    case 'change_advance':
      return { ...state, advance: action.payload };

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
      return { ...state, cron: advance };

    default:
      throw new Error();
  }
};
