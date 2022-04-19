export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function clearTime(date: Date): void {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
}

export function dateTo24HourTime(date: Date): string {
  return `${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`;
}

export function dateToTime(locale: string, date: Date): string {
  //const offset = date.getTimezoneOffset();
  const copy = new Date(date);
  //copy.setMinutes(copy.getMinutes() + offset);
  copy.setMinutes(copy.getMinutes());
  return copy
    .toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: '2-digit'
    });
}

// Returns a string in the format m-name d, yyyy.
export function formatDateLong(date: Date): string {
  const year = date.getFullYear();
  const month = getMonthName(date);
  const day = date.getDate();
  return `${month} ${day}, ${year}`;
}

const zeroPad = (n: number) => n.toString().padStart(2, '0');

// Returns a string in the format yyyy-mm-dd.
export function formatDateMedium(date: Date): string {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return year + '-' + zeroPad(month) + '-' + zeroPad(day);
}

export function formatDateLocalMedium(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return year + '-' + zeroPad(month) + '-' + zeroPad(day);
}

export function formatDateShort(date: Date): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Returns a string in the format yyyy-mm-dd hh:mm:ss.
export function formatDateTimeMedium(date: Date, includeAmPm = false): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let amPm = 'AM';
  let hours = date.getHours();
  if (includeAmPm && hours >= 12) {
    if (hours > 12) hours -= 12;
    amPm = 'PM';
  }
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const text =
    `${year}-${zeroPad(month)}-${zeroPad(day)} ` +
    `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`;
  return includeAmPm ? text + ' ' + amPm : text;
}

export function formatDateTimeUTCMedium(
  date: Date,
  includeAmPm = false
): string {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  let amPm = 'AM';
  let hours = date.getUTCHours();
  if (includeAmPm && hours >= 12) {
    if (hours > 12) hours -= 12;
    amPm = 'PM';
  }
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const text =
    `${year}-${zeroPad(month)}-${zeroPad(day)} ` +
    `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`;
  return includeAmPm ? text + ' ' + amPm : text;
}

// Returns a date that is one second before midnight today.
export function getEndOfToday(): Date {
  const today = new Date();
  clearTime(today);
  // Add one day.
  today.setDate(today.getDate() + 1);
  // Subtract one second.
  today.setSeconds(today.getSeconds() - 1);
  // Now we have a date that represents the end of today.
  return today;
}

export function getLocalDate(dateString: string): Date | null {
  if (!dateString) return null;
  const [y, m, d] = dateString.split('-');
  return new Date(Number(y), Number(m) - 1, Number(d));
}

export function getMinutesAgo(date: Date): string {
  if (!date) return '';

  const now = new Date();
  const msDiff = date.getTime() - now.getTime();
  const minutes = Math.round(msDiff / 1000 / 60);

  const formatter = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto'
  });
  return formatter.format(minutes, 'minutes');
}

export function getMonthName(date: Date): string {
  return MONTH_NAMES[date.getMonth()];
}

export function getNowUtc(): Date {
  const date = new Date();
  date.setHours(date.getHours() + date.getTimezoneOffset() / 60);
  return date;
}

// When maxDay is true, the largest time reported will be just under 24 hours.
// If it is 24 hours or more, the string "> 1 day ago" will be returned.
export function getTimeAgo(date: Date, maxDay = false): string {
  const timeAgo = getMinutesAgo(date);
  if (timeAgo === 'this minute') return 'now';
  if (timeAgo.startsWith('in ')) return 'future';

  let minutes = parseInt(timeAgo.replace(/,/g, ''));
  let hours = 0;
  let days = 0;
  if (minutes >= 60) {
    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    if (hours >= 24) {
      if (maxDay) return '> 1 day ago';
      days = Math.floor(hours / 24);
      hours = hours % 24;
    }
  }

  const text = days
    ? `${days}D ${hours}H ${minutes}M`
    : hours
    ? `${hours}H ${minutes}M`
    : `${minutes}M`;
  return text + ' ago';
}

// THIS IS PROBABLY WRONG!
export function getUtcDate(dateString: string): Date | null {
  if (!dateString) return null;
  const [y, m, d] = dateString.split('-');
  const date = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
  return date;
}

export function parseDate(text: string): Date {
  const [date, time] = text.split(' ');
  const [year, month, day] = date.split('-');
  const [hour, minute, second] = time.split(':');
  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    parseInt(second) // handles timezone characters at end
  );
}

// Creates a Date object from a time string
// in the format "hh:mm AM|PM".  For example, "7:12 AM".
export function timeToDate(time: string): Date {
  if (!time) time = '0:00';
  const [t, amPm] = time.split(' ');
  const [hours, minutes] = t.split(':');

  let h = Number(hours);
  const m = Number(minutes);
  if (amPm === 'PM') h += 12;

  const date = new Date();
  clearTime(date);
  date.setHours(h);
  date.setMinutes(m);
  return date;
}

export function timeFrom24Hour(locale: string, time: string): string {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const date = new Date();
  date.setUTCHours(Number(hours));
  date.setUTCMinutes(Number(minutes));
  return dateToTime(locale, date);
}

export function validateDateRange(
  start: string,
  end: string,
  requireFuture = false
): string {
  const today = new Date();
  clearTime(today);

  const startDate = getLocalDate(start);
  const endDate = getLocalDate(end);

  const message =
    requireFuture && startDate && startDate < today
      ? 'The start date cannot be before today.'
      : requireFuture && endDate && endDate < today
      ? 'The end date cannot be before today.'
      : startDate && endDate && startDate >= endDate
      ? 'The end date must be after the start date.'
      : '';
  return message;
}
