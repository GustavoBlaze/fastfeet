import { isBefore, isAfter, setSeconds, setMinutes, setHours } from 'date-fns';

export function checkIndividualDate(date) {
  const initHour = date
    ? setSeconds(setMinutes(setHours(date, 8), 0), 0)
    : null;

  const terminateHour = date
    ? setSeconds(setMinutes(setHours(date, 18), 0), 0)
    : null;

  if (!isAfter(date, initHour) || !isBefore(date, terminateHour)) {
    return { error: 'The date must be between 8:00 and 18:00' };
  }

  return { error: null };
}

/*
  This code below could be written with a lot of lines less
  but it works perfectly, so let's keep it for a while
*/

export function CheckDate(start_date, end_date) {
  const startDayInitHour = start_date
    ? setSeconds(setMinutes(setHours(start_date, 8), 0), 0)
    : null;

  const startDayTerminateHour = start_date
    ? setSeconds(setMinutes(setHours(start_date, 18), 0), 0)
    : null;

  const endDayInitHour = end_date
    ? setSeconds(setMinutes(setHours(end_date, 8), 0), 0)
    : null;

  const endDayTerminateHour = end_date
    ? setSeconds(setMinutes(setHours(end_date, 18), 0), 0)
    : null;

  if (
    (start_date && isBefore(start_date, new Date())) ||
    (end_date && isBefore(end_date, new Date()))
  ) {
    return { error: 'start_date and end_date can not be in the past' };
  }

  if (start_date && isBefore(start_date, startDayInitHour)) {
    return { error: 'start_date must be after 8:00 hour' };
  }

  if (start_date && isAfter(start_date, startDayTerminateHour)) {
    return { error: 'start_date must be before 18:00 hour' };
  }

  if (end_date && isBefore(end_date, endDayInitHour)) {
    return { error: 'end_date must be after 8:00 hour' };
  }

  if (end_date && isAfter(end_date, endDayTerminateHour)) {
    return { error: 'end_date must be before 18:00 hour' };
  }

  if (start_date && end_date) {
    if (isAfter(start_date, end_date)) {
      return { error: 'start_date must be before end_date' };
    }
    if (isBefore(end_date, start_date)) {
      return { error: 'end_date must be after start_date' };
    }
  }

  return { error: null };
}
