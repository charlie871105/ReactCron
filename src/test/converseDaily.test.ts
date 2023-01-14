import { converseDaily } from '../ReactCron/util';

describe('converseDaily', () => {
  test('test converseDaily', () => {
    let input = '00,2,56 0,23 * * *'.split(' ');
    let actual = converseDaily(input);
    let expected = {
      hours: ['00', '23'],
      minutes: ['00', '02', '56'],
    };

    expect(actual).toStrictEqual(expected);
  });
});
