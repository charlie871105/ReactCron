export type CronMode = 'daily' | 'weekly' | 'monthly' | 'advance';

export type InitValue = [
  CronMode,
  (
    | { daily: DailyState }
    | { weekly: WeeklyState }
    | { monthly: MonthlyState }
    | { advance: string }
  )
];

export type DailyState = {
  hours: string[];
  minutes: string[];
};

export type WeeklyState = {
  dates: string[];
  hour: string;
  minute: string;
};

export type MonthlyState = {
  dates: string[];
  hour: string;
  minute: string;
};

export interface CronState {
  cron: string;
  daily: DailyState;
  weekly: WeeklyState;
  monthly: MonthlyState;
  advance: string;
}

export type CronChangeEvent =
  | { type: 'change_daily'; payload: DailyState }
  | { type: 'change_weekly'; payload: WeeklyState }
  | { type: 'change_monthly'; payload: MonthlyState }
  | { type: 'change_advance'; payload: string }
  | { type: 'set_daily' }
  | { type: 'set_weekly' }
  | { type: 'set_monthly' }
  | { type: 'set_advance' };

export interface ReactCronContextType {
  state: CronState;
  dispatch: React.Dispatch<CronChangeEvent>;
  onChange: UserOnChange;
}
export type UserOnChange = (cron: string, isError: boolean) => void;
