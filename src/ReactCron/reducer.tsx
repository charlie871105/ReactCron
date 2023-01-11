import { CronChangeEvent, CronState } from './type';
import { toCronTime } from './util';

export const cronReducer = (state: CronState, action: CronChangeEvent) => {
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

    default:
      throw new Error('Unknow reducer event');
  }
};
