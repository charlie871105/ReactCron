export function toCronTime<T>(time: T[]) {
  return time.length === 0 ? '*' : time.join(',');
}
