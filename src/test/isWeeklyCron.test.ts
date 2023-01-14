import { isWeeklyCron } from '../ReactCron/util';

describe('isWeeklyCron', () => {
  test('correct week', () => {
    let input = '00 9 * * 6';
    let actual: boolean = isWeeklyCron(input);
    let expected = true;

    expect(actual).toBe(expected);
  });

  test('error week', () => {
    let input = '00 59 * * 7';
    let actual: boolean = isWeeklyCron(input);
    let expected = false;

    expect(actual).toBe(expected);
  });
});
