import {
  dateToTime,
  formatDateShort,
  formatDateMedium,
  formatDateLong,
  formatDateTimeMedium,
  getMinutesAgo,
  getMonthName,
  getTimeAgo,
  parseDate,
  timeToDate,
  timeFrom24HourTime,
  dateTo24HourTime
} from './utils-date';

describe('utils-date', () => {
  const date = new Date();

  test('dateToTime works', () => {
    let date = new Date(Date.UTC(2021, 6, 21, 7, 5, 45));
    expect(dateToTime('en-US', date)).toBe('7:05 am');

    date = new Date(Date.UTC(2021, 6, 21, 16, 59, 45));
    expect(dateToTime('en-US', date)).toBe('4:59 pm');
  });

  test('formatDateLong works', () => {
    const date = new Date(1961, 3, 16);
    expect(formatDateLong(date)).toBe('April 16, 1961');
  });

  test('formatDateMedium works', () => {
    const date = new Date(Date.UTC(1961, 3, 16));
    expect(formatDateMedium(date)).toBe('1961-04-16');
  });

  test('formatDateShort works', () => {
    const date = new Date(Date.UTC(1961, 3, 16));
    expect(formatDateShort('en-US', date)).toBe('04/16/61');
  });

  test('formatDateTimeMedium works', () => {
    let date = new Date(1961, 3, 16, 10, 19, 20);
    expect(formatDateTimeMedium(date)).toBe('1961-04-16 10:19:20');

    date = new Date(1961, 3, 16, 15, 19, 20);
    expect(formatDateTimeMedium(date)).toBe('1961-04-16 15:19:20');
    expect(formatDateTimeMedium(date, true)).toBe('1961-04-16 03:19:20 PM');
  });

  test('getMinutesAgo works', () => {
    const delta = 5;
    let date = new Date();
    date.setMinutes(date.getMinutes() - delta);
    expect(getMinutesAgo(date)).toBe(delta + ' minutes ago');

    date = new Date();
    date.setMinutes(date.getMinutes() + delta);
    expect(getMinutesAgo(date)).toBe('in ' + delta + ' minutes');

    date = new Date();
    expect(getMinutesAgo(date)).toBe('this minute');
  });

  test('getMonthName works', () => {
    date.setUTCMonth(0);
    expect(getMonthName(date)).toBe('January');
    date.setUTCMonth(11);
    expect(getMonthName(date)).toBe('December');
  });

  test('getTimeAgo works', () => {
    const delta = 5;
    let date = new Date();
    date.setUTCMinutes(date.getUTCMinutes() - delta);
    date.setUTCHours(date.getUTCHours() - delta);
    date.setUTCDate(date.getUTCDate() - delta);
    expect(getTimeAgo(date)).toBe('5D 5H 5M ago');

    date = new Date();
    date.setUTCMinutes(date.getUTCMinutes() + delta);
    date.setUTCHours(date.getUTCHours() + delta);
    date.setUTCDate(date.getUTCDate() + delta);
    expect(getTimeAgo(date)).toBe('future');

    date = new Date();
    expect(getTimeAgo(date)).toBe('now');
  });

  test('parseDate works', () => {
    const year = 1961;
    const month = 3;
    const day = 16;
    const hour = 10;
    const minute = 19;
    const second = 20;
    const text = `${year}-${month + 1}-${day} ${hour}:${minute}:${second}Z`;
    const date = parseDate(text);
    expect(date.getFullYear()).toBe(year);
    expect(date.getMonth()).toBe(month);
    expect(date.getDate()).toBe(day);
    expect(date.getHours()).toBe(hour);
    expect(date.getMinutes()).toBe(minute);
    expect(date.getSeconds()).toBe(second);
  });

  test('timeToDate works', () => {
    const t1 = '1:23 am';
    const d1 = timeToDate(t1);
    expect(d1.getHours()).toBe(1);
    expect(d1.getMinutes()).toBe(23);

    const t2 = '2:34 pm';
    const d2 = timeToDate(t2);
    expect(d2.getHours()).toBe(14);
    expect(d2.getMinutes()).toBe(34);
  });

  [
    ['Test AM time', '08:00', '8:00 am'],
    ['Test minutes', '08:30', '8:30 am'],
    ['Test PM time', '20:00', '8:00 pm'],
    ['Test midnight', '00:00', '12:00 am'],
    ['Test noon', '12:00', '12:00 pm']
  ].forEach(([explain, input, expected]) => {
    test(`timeFrom24HourTime : ${explain}`, () => {
      expect(timeFrom24HourTime('en-US', input)).toBe(expected);
    });
  });

  [
    ['Test Zero Padding Minutes', new Date(1961, 3, 16, 10, 1), '10:01'],
    ['Test Zero Padding Hours', new Date(1961, 3, 16, 4, 0), '04:00'],
    ['Test No Zero Padding', new Date(1961, 3, 16, 10, 15), '10:15'],
    ['Test Past 12', new Date(1961, 3, 16, 22, 0), '22:00'],
    ['Test Midnight', new Date(1961, 3, 16, 0, 0), '00:00'],
    ['Test Noon', new Date(1961, 3, 16, 12, 0), '12:00']
  ].forEach(([explain, input, expected]: [string, Date, string]) => {
    test(`dateTo24HourTime : ${explain}`, () => {
      expect(dateTo24HourTime(input)).toBe(expected);
    });
  });
});
