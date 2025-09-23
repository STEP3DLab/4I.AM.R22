export const COURSE_START_ISO = '2025-10-20T09:00:00+03:00';

export const COURSE_START = new Date(COURSE_START_ISO);

if (Number.isNaN(COURSE_START.valueOf())) {
  throw new Error('COURSE_START_ISO must represent a valid date');
}
