import { INIT_CALENDAR, MOVE_CALENDAR } from "../actions/types";

import { initCalendar } from "store/actions/calendar";

const INITIAL_STATE = {
  prevMonth: {},
  selectedMonth: {},
  nextMonth: {},
  currentMonth: {},
};

const currentDate = new Date();

function makeCalendar(dateObject) {
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth();

  // Date 객체 마지막 인자에 0을 넣으면 이전달 마지막 날짜를 반환
  const prevMonthLast = new Date(year, month, 0);
  const thisMonthLast = new Date(year, month + 1, 0);
  const nextMonthFirst = new Date(year, month + 1, 1);

  const PMLDate = prevMonthLast.getDate();
  const PMLDay = prevMonthLast.getDay(); // Sunday - Saturday : 0 - 6

  const TMLDate = thisMonthLast.getDate();
  const TMLDay = thisMonthLast.getDay();

  const prevDates = [];
  const thisDates = [...Array(TMLDate + 1).keys()].slice(1);
  const nextDates = [];
  const result = {};

  if (PMLDay !== 6) {
    // 토요일인 경우 달력 상에서 저번달 날짜가 표시될 필요가 없다.
    for (let i = 0; i < PMLDay + 1; i++) {
      prevDates.unshift(PMLDate - i);
    }

    prevDates.forEach((date) => {
      const YYYYMMDD = `${prevMonthLast.getFullYear()}-${
        prevMonthLast.getMonth() + 1
      }-${date}`;

      result[YYYYMMDD] = [];
    });
  }

  thisDates.forEach((date) => {
    const YYYYMMDD = `${year}-${month + 1}-${date}`;

    result[YYYYMMDD] = [];
  });

  for (let i = 1; i < 7 - TMLDay; i++) {
    nextDates.push(i);
  }

  if ([...prevDates, ...thisDates, ...nextDates].length === 35) {
    const copyOfNextDates = nextDates.slice();
    // 요구사항의 달력은 6줄이기에 마지막에 한 줄 더 추가하기 위한 작업
    for (let i = 1; i < 8; i++) {
      nextDates.push(copyOfNextDates[copyOfNextDates.length - 1] + i);
    }
  }

  nextDates.forEach((date) => {
    const YYYYMMDD = `${nextMonthFirst.getFullYear()}-${
      nextMonthFirst.getMonth() + 1
    }-${date}`;

    result[YYYYMMDD] = [];
  });

  return result;
}

const calendar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_CALENDAR: {
      return {
        ...state,
        selectedMonth: makeCalendar(currentDate),
      };
    }
    default:
      return state;
  }
};

export default calendar;
