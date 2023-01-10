type DailyState = {
  hours: string[],
  minutes: string[],
};

type WeeklyState = {
  dates: string[],
  hour: string,
  minute: string,
};

type MonthlyState = {
  dates: string[],
  hour: string,
  minute: string,
};

export interface CronState {
  cron: string;
  daily: DailyState;
  weekly: WeeklyState;
  monthly: MonthlyState;
  advance: string;
}

export type CronAction =
  | { type: 'set_daily' }
  | { type: 'set_weekly' }
  | { type: 'set_monthly' }
  | { type: 'set_advance' }
  | { type: 'change_daily', payload: DailyState }
  | { type: 'change_weekly', payload: WeeklyState }
  | { type: 'change_monthly', payload: MonthlyState }
  | { type: 'change_advance', payload: string };

export interface ReactCronContextType {
  state: CronState;
  dispatch: React.Dispatch<CronAction>;
}
