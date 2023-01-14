import cronstrue from 'cronstrue';
import { useTranslation } from 'react-i18next';
import {
  CronChangeEvent,
  CronMode,
  DailyState,
  InitValue,
  MonthlyState,
  WeeklyState,
} from './type';
import 'cronstrue/locales/zh_TW';

export const HOURS = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];
export const MINUTES = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
];

export const WEEK = [
  { value: '00', label: 'Sun.' },
  { value: '01', label: 'Mon.' },
  { value: '02', label: 'Tues.' },
  { value: '03', label: 'Wed.' },
  { value: '04', label: 'Thurs.' },
  { value: '05', label: 'Fri.' },
  { value: '06', label: 'Sat.' },
];

export const MONTH = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
];

export const FREQUENCY_TYPE: CronMode[] = [
  'daily',
  'weekly',
  'monthly',
  'advance',
];

export const FREQUENCY_DEFAULT = {
  cron: '* * * * *',
  daily: { hours: [], minutes: [] },
  weekly: {
    dates: [getCurrentTime('week')],
    hour: getCurrentTime('hour'),
    minute: getCurrentTime('minute'),
  },
  monthly: {
    dates: [getCurrentTime('date')],
    hour: getCurrentTime('hour'),
    minute: getCurrentTime('minute'),
  },
  advance: '* * * * *',
};

/** 
  change time array to cron string
*/
export function toCronTime<T>(time: T[]) {
  return time.length === 0 ? '*' : time.join(',');
}

/** 
  used to trim too long input value to show
*/
export function formatDaily(time: string[] | string) {
  if (typeof time === 'string') {
    return time;
  }
  let sorted = time.sort(
    (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10)
  );

  let trimed = sorted.slice(0, 6);

  return trimed.join(',');
}

/** 
 accept cron changeEvent and return cronExpression
*/
export function toCron(event: CronChangeEvent) {
  switch (event.type) {
    case 'change_daily':
      return `${toCronTime(event.payload.minutes)} ${toCronTime(
        event.payload.hours
      )} * * *`;

    case 'change_weekly':
      return `${event.payload.minute} ${event.payload.hour} * * ${toCronTime(
        event.payload.dates
      )}`;

    case 'change_monthly':
      return `${event.payload.minute} ${event.payload.hour} ${toCronTime(
        event.payload.dates
      )} * *`;

    case 'change_advance':
      return event.payload;

    default:
      throw new Error('Unknow toCron type');
  }
}

export function getCurrentTime(type: 'hour' | 'minute' | 'week' | 'date') {
  const today = new Date(Date.now());
  switch (type) {
    case 'hour':
      return formatTime(`${today.getHours()}`);

    case 'minute':
      return formatTime(`${today.getMinutes()}`);

    case 'week':
      return formatTime(`${today.getDay()}`);

    case 'date':
      return formatTime(`${today.getDate()}`);

    default:
      throw new Error('Unknow gettime type');
  }
}

export function useReadableCron(cron: string) {
  let locale = 'en';
  const { t, i18n } = useTranslation();

  if (i18n.languages.includes('zh')) {
    locale = 'zh_TW';
  }

  if (!isCronVaild(cron)) {
    return t('CronExpression is not vaild');
  }

  let readableCron = cronstrue.toString(cron, {
    locale,
    use24HourTimeFormat: true,
  });

  return readableCron;
}

export function isCronVaild(cron: string) {
  let isVaild = true;
  let cronArray: string[] = [];
  try {
    cronstrue.toString(cron);
    cronArray = cron.split(' ');
    if (cronArray.length !== 5) {
      isVaild = false;
    }
  } catch (error) {
    isVaild = false;
  }

  return isVaild;
}

export function formatLabel(str: string, num: number) {
  if (str.length > num) {
    return str.substring(0, num) + '...';
  }
  return str;
}

export function isDailyCron(cron: string) {
  // 先排除不是合法的cronExpression
  if (!isCronVaild(cron)) return false;
  const cronArray = cron.split(' ');
  // [00-59,00-59... || *] [00-23,00-23... || *] * * * 符合每天的頻率格式
  if (
    /^((([0-5]?[0-9]),)*([0-5]?[0-9])|(\*))$/.test(cronArray[0]) &&
    /^(((2[0-3]|1[0-9]|[0]?[0-9]),)*(2[0-3]|1[0-9]|0[0-9]|[0-9])|(\*))$/.test(
      cronArray[1]
    ) &&
    cronArray[2] === '*' &&
    cronArray[3] === '*' &&
    cronArray[4] === '*'
  ) {
    return true;
  }
  return false;
}

export function isWeeklyCron(cron: string) {
  if (!isCronVaild(cron)) return false;
  const cronArray = cron.split(' ');
  // 只要 0-59 0-23 * * [0-6,....]  就是每週的頻率
  if (
    /^([0-5]?[0-9])$/.test(cronArray[0]) &&
    /^(2[0-3]|1[0-9]|[0]?[0-9])$/.test(cronArray[1]) &&
    cronArray[2] === '*' &&
    cronArray[3] === '*' &&
    cronArray[4].split(',').every((day) => /([0]?[0-6])/.test(day))
  )
    return true;

  return false;
}

export function isMonthlyCron(cron: string) {
  if (!isCronVaild(cron)) return false;
  const cronArray = cron.split(' ');
  // 只要 0-59 0-23 [1-31,....] * *   is match monthly
  if (
    /^([0-5]?[0-9])$/.test(cronArray[0]) &&
    /^(2[0-3]|1[0-9]|0[0-9]|[0-9])$/.test(cronArray[1]) &&
    cronArray[2]
      .split(',')
      .every((date) => /3[01]|[12][0-9]|[0]?[1-9]/.test(date)) &&
    cronArray[3] === '*' &&
    cronArray[4] === '*'
  )
    return true;

  return false;
}

/** 
 check the time array is every time
 ex: [1,*,9] => with * => everytime
*/
export function isEveryTime(timeArray: string[]) {
  return timeArray.some((hour) => hour === '*');
}

/** 
 fromat time to match toggle button
 toggle button only acept 00 - 09
*/
export function formatTime(time: string) {
  let parsedTime = parseInt(time, 10);
  if (parsedTime < 10) {
    return `0${parsedTime}`;
  }
  return `${parsedTime}`;
}

/** 
 remove duplicate time and format time to match toggle button
*/
export function formatTimeArray(timeArray: string[]) {
  let timeSet = new Set(timeArray);
  return Array.from(timeSet).map((time) => formatTime(time));
}

export function converseDaily(cronArray: string[]): DailyState {
  let hourArray = cronArray[1].split(',');
  let minuteArray = cronArray[0].split(',');

  return {
    hours: isEveryTime(hourArray) ? [] : formatTimeArray(hourArray),
    minutes: isEveryTime(minuteArray) ? [] : formatTimeArray(minuteArray),
  };
}

export function converseWeekly(cronArray: string[]): WeeklyState {
  let weekArray = cronArray[4].split(',');
  let hour = formatTime(cronArray[1]);
  let minute = formatTime(cronArray[0]);

  return {
    dates: isEveryTime(weekArray) ? [] : formatTimeArray(weekArray),
    hour,
    minute,
  };
}

export function converseMonthly(cronArray: string[]): MonthlyState {
  let monthArray = cronArray[2].split(',');
  let hour = formatTime(cronArray[1]);
  let minute = formatTime(cronArray[0]);

  return {
    dates: isEveryTime(monthArray) ? [] : formatTimeArray(monthArray),
    hour,
    minute,
  };
}

/**
  convert input value to init value
*/
export function convertInitCron(cron = '* * * * *'): InitValue {
  // invalid cron
  if (!isCronVaild(cron)) return ['advance', { advance: cron }];

  const cronArray = cron.split(' ');

  if (isDailyCron(cron)) return ['daily', { daily: converseDaily(cronArray) }];

  if (isWeeklyCron(cron))
    return ['weekly', { weekly: converseWeekly(cronArray) }];

  if (isMonthlyCron(cron))
    return ['monthly', { monthly: converseMonthly(cronArray) }];

  return ['advance', { advance: cron }];
}
