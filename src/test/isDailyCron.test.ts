import { isDailyCron } from '../ReactCron/util';

describe('isDailyCron', () => {
  test('correct daily', () => {
    let input = '00,8,10,59 00,2,22,13,0 * * *';
    let actual: boolean = isDailyCron(input);
    let expected = true;

    expect(actual).toBe(expected);
  });

  test('error daily', () => {
    let input = '24,a,b 00,01,59,60 * 2 *';
    let actual: boolean = isDailyCron(input);
    let expected = false;

    expect(actual).toBe(expected);
  });
});
