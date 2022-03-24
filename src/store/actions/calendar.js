import {
  INIT_CALENDAR,
  MOVE_CALENDAR_TO_LEFT,
  MOVE_CALENDAR_TO_RIGHT,
  MOVE_TO_TODAY,
  GET_HOLIDAYS_REQUEST,
  GET_HOLIDAYS_SUCCESS,
  GET_HOLIDAYS_FAILURE,
} from "./types";

export const initCalendar = () => ({
  type: INIT_CALENDAR,
});

export const moveCalendarToLeft = () => ({
  type: MOVE_CALENDAR_TO_LEFT,
});

export const moveCalendarToRight = () => ({
  type: MOVE_CALENDAR_TO_RIGHT,
});

export const moveToToday = () => ({
  type: MOVE_TO_TODAY,
});

export const getHolidaysRequest = (data) => ({
  type: GET_HOLIDAYS_REQUEST,
  data,
});

export const getHolidaysSuccess = (data) => ({
  type: GET_HOLIDAYS_SUCCESS,
  data,
});

export const getHolidaysFailure = (message) => ({
  type: GET_HOLIDAYS_FAILURE,
  message,
});
