import { isCronVaild } from '../ReactCron/util';

describe('isCronVaild', () => {
  test('correct cron', () => {
    let input = '* * * * *';
    let actual: boolean = isCronVaild(input);
    let expected = true;

    expect(actual).toBe(expected);
  });

  test('error cron', () => {
    let input = '* * * *';
    let actual: boolean = isCronVaild(input);
    let expected = false;

    expect(actual).toBe(expected);
  });
});
