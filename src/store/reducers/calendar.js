import {
  INIT_CALENDAR,
  MOVE_CALENDAR,
  MOVE_CALENDAR_TO_LEFT,
  MOVE_CALENDAR_TO_RIGHT,
  MOVE_TO_TODAY,
  GET_HOLIDAYS_REQUEST,
  GET_HOLIDAYS_SUCCESS,
  GET_HOLIDAYS_FAILURE,
} from "../actions/types";

import { initCalendar } from "store/actions/calendar";
import { addHyphenToDate } from "utils";

const INITIAL_STATE = {
  selectedYYYYMM: "",
  prevMonth: {},
  selectedMonth: {},
  nextMonth: {},
  currentMonth: {},
  isTodayBtnClicked: false,
};

const currentDate = new Date();

function makeCalendar(dateObject) {
  console.log(dateObject);
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

  if (TMLDay !== 6) {
    for (let i = 1; i < 7 - TMLDay; i++) {
      nextDates.push(i);
    }
  }

  if ([...prevDates, ...thisDates, ...nextDates].length === 35) {
    const copyOfNextDates = nextDates.slice();
    // 요구사항의 달력은 6줄이기에 마지막에 한 줄 더 추가하기 위한 작업
    if (nextDates.length > 0) {
      for (let i = 1; i < 8; i++) {
        nextDates.push(copyOfNextDates[copyOfNextDates.length - 1] + i);
      }
    } else {
      // 이전달의 마지막 날이 토요일인 경우 nextDates 배열은 비어있을 것이다.
      // 그런 경우 그냥 1일부터 7일까지 넣어서 달력 마지막 한 줄을 더 추가해준다.
      for (let i = 1; i < 8; i++) {
        nextDates.push(i);
      }
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
      const currentYYYYMM = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }`;
      const [currentYear, currentMonth] = currentYYYYMM.split("-");

      const currentMonthCalendar = makeCalendar(currentDate);

      return {
        selectedYYYYMM: currentYYYYMM,
        prevMonth: makeCalendar(new Date(currentYear, currentMonth - 1, 0)),
        selectedMonth: currentMonthCalendar,
        nextMonth: makeCalendar(new Date(currentYear, currentMonth)),
        currentMonth: currentMonthCalendar,
      };
    }
    case MOVE_CALENDAR_TO_LEFT: {
      // 현재 년월이 2022-3인 경우라면..
      const [year, month] = state.selectedYYYYMM.split("-");
      const prevMonthDate = new Date(year, month - 2); // 2022-2

      // 다음달 혹은 그 이전달로 selectedYYYYMM(현재 유저가 보고 있는 월)을 업데이트 시
      // 년도까지 바꾸는 경우가 있기에 단순히 월을 플러스 마이너스 1하는 것이 아니라
      // Date 객체로 계산하여 업데이트되게 하였다.

      return {
        ...state,
        prevMonth: makeCalendar(new Date(year, month - 3)), // 2022-1
        selectedMonth: { ...state.prevMonth }, // 2022-2
        nextMonth: { ...state.selectedMonth }, // 2022-3
        selectedYYYYMM: `${prevMonthDate.getFullYear()}-${
          prevMonthDate.getMonth() + 1
        }`, // 2022-2
      };
    }
    case MOVE_CALENDAR_TO_RIGHT: {
      // 현재 년월이 2022-3인 경우라면..
      const [year, month] = state.selectedYYYYMM.split("-");
      const nextMonthDate = new Date(year, month); // 2022-4

      return {
        ...state,
        prevMonth: { ...state.selectedMonth }, // 2022-3
        selectedMonth: { ...state.nextMonth }, // 2022-4
        nextMonth: makeCalendar(new Date(year, parseInt(month) + 1)), // 2022-5
        selectedYYYYMM: `${nextMonthDate.getFullYear()}-${
          nextMonthDate.getMonth() + 1
        }`, // 2022-4
      };
    }
    case MOVE_TO_TODAY: {
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      return {
        ...state,
        isTodayBtnClicked: true,
        selectedYYYYMM: `${currentYear}-${currentMonth + 1}`,
        prevMonth: makeCalendar(new Date(currentYear, currentMonth - 1)),
        selectedMonth: { ...state.currentMonth },
        nextMonth: makeCalendar(new Date(currentYear, currentMonth + 1)),
      };
    }
    case GET_HOLIDAYS_REQUEST: {
      return {
        ...state,
      };
    }
    case GET_HOLIDAYS_SUCCESS: {
      const { selectedMonth } = state;

      if (action.payload) {
        if (Array.isArray(action.payload)) {
          const holidays = action.payload.map((data) => {
            const locdate = data.locdate.toString();

            return {
              ...data,
              locdate: addHyphenToDate(locdate),
            };
          });

          holidays.forEach((data) => {
            const itemsOfDate = selectedMonth[data.locdate];
            const isThereSameHolidayAlready = itemsOfDate.some(
              (item) => item.name === data.dateName,
            );

            if (!isThereSameHolidayAlready) {
              const id = itemsOfDate.length > 0 ? itemsOfDate[0].id + 1 : 1;
              const holidayObj = {
                id,
                name: data.dateName,
                isHoliday: data.isHoliday,
                date: data.locdate,
              };
              selectedMonth[data.locdate].unshift(holidayObj);
            }
          });
        } else {
          // 공휴일이 하나일 때는 객체 형태로 전달받는다.
          const data = action.payload;
          data.locdate = addHyphenToDate(data.locdate.toString());

          const itemsOfDate = selectedMonth[data.locdate];
          const id = itemsOfDate.length > 0 ? itemsOfDate[0].id + 1 : 1;
          const holidayObj = {
            id,
            name: data.dateName,
            isHoliday: data.isHoliday,
            date: data.locdate,
          };

          selectedMonth[data.locdate].unshift(holidayObj);
        }
      }

      return {
        ...state,
      };
    }
    case GET_HOLIDAYS_FAILURE: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default calendar;
