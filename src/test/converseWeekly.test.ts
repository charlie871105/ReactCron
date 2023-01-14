import { converseWeekly } from '../ReactCron/util';

describe('converseWeekly', () => {
  test('test converseWeekly', () => {
    let input = '0 00 * * 06,0,04'.split(' ');
    let actual = converseWeekly(input);
    let expected = {
      dates: ['06', '00', '04'],
      hour: '00',
      minute: '00',
    };

    expect(actual).toStrictEqual(expected);
  });
});
