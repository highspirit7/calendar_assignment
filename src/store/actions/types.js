// selectedMonth(유저가 현재 보고 있는 월), prevMonth, nextMonth, currentMonth
// 현재 월 달력 데이터 생성
// 처음에는 우선 currrentMonth 데이터를 selectedMonth에 복제
export const INIT_CALENDAR = "init_calendar"; // 처음 서비스 실행시 동작
export const MOVE_CALENDAR_TO_LEFT = "move_calendar_to_left"; // 화살표 버튼으로 달력이 이동하는 경우
export const MOVE_CALENDAR_TO_RIGHT = "move_calendar_to_right"; // 화살표 버튼으로 달력이 이동하는 경우
export const MOVE_TO_TODAY = "move_to_today"; // 오늘 버튼 클릭으로 달력이 이동하는 경우
export const GET_HOLIDAYS_REQUEST = "get_holidays_request";
export const GET_HOLIDAYS_SUCCESS = "get_holidays_success";
export const GET_HOLIDAYS_FAILURE = "get_holidays_failure";
