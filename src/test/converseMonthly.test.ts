import { converseMonthly } from '../ReactCron/util';

describe('converseMonthly', () => {
  test('test converseMonthly', () => {
    let input = '0 00 14,1,02 * *'.split(' ');
    let actual = converseMonthly(input);
    let expected = {
      dates: ['14', '01', '02'],
      hour: '00',
      minute: '00',
    };

    expect(actual).toStrictEqual(expected);
  });
});
