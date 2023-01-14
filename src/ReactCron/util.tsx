import cronstrue from 'cronstrue';
import { useTranslation } from 'react-i18next';
import { CronChangeEvent, CronMode } from './type';
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
  { value: 0, label: 'Sun.' },
  { value: 1, label: 'Mon.' },
  { value: 2, label: 'Tues.' },
  { value: 3, label: 'Wed.' },
  { value: 4, label: 'Thurs.' },
  { value: 5, label: 'Fri.' },
  { value: 6, label: 'Sat.' },
];

export const MONTH = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
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

export function toCronTime<T>(time: T[]) {
  return time.length === 0 ? '*' : time.join(',');
}

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
      return `${today.getHours()}`;

    case 'minute':
      return `${today.getMinutes()}`;

    case 'week':
      return `${today.getDay()}`;

    case 'date':
      return `${today.getDate()}`;

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

  let readableCron: string;
  try {
    readableCron = cronstrue.toString(cron, {
      locale,
      use24HourTimeFormat: true,
    });
  } catch (error) {
    readableCron = t('CronExpression is not vaild');
  }
  return readableCron;
}

export function isCronVaild(cron: string) {
  let isVaild = true;
  try {
    cronstrue.toString(cron);
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

export function isWeeklyCron(cronExpression: string) {
  if (!isCronVaild(cronExpression)) return false;
  const cronArray = cronExpression.split(' ');
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

export function isMonthlyCron(cronExpression: string) {
  if (!isCronVaild(cronExpression)) return false;
  const cronArray = cronExpression.split(' ');
  // 只要 0-59 0-23 [1-31,....] * *   就是每週的頻率
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
