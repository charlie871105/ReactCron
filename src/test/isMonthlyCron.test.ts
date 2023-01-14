import { isMonthlyCron } from '../ReactCron/util';

describe('isMonthlyCron', () => {
  test('correct month', () => {
    let input = '33 17 01,2,14 * *';
    let actual: boolean = isMonthlyCron(input);
    let expected = true;

    expect(actual).toBe(expected);
  });

  test('error month', () => {
    let input = '33 17 00,2,14,32 * *';
    let actual: boolean = isMonthlyCron(input);
    let expected = false;

    expect(actual).toBe(expected);
  });
});
