import {
  INIT_CALENDAR,
  MOVE_CALENDAR_TO_LEFT,
  MOVE_CALENDAR_TO_RIGHT,
  MOVE_TO_TODAY,
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
