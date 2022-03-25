import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { showModalToAddSchedule, setDateForModal } from "store/actions/modal";

const DateInCalendar = (props) => {
  const dispatch = useDispatch();
  const { isToday, year, month, date } = props;

  const calendarState = useSelector((state) => state.calendar);
  const { isTodayBtnClicked } = calendarState;

  const showModal = () => {
    dispatch(setDateForModal(`${year}-${month}-${date}`));
    dispatch(showModalToAddSchedule());
  };

  if (date === "1") {
    return (
      <TextDate onClick={() => showModal()}>
        {month + "월 "}
        {isToday && isTodayBtnClicked ? <Circle>{date}</Circle> : date}일
      </TextDate>
    );
  } else {
    return (
      <TextDate onClick={() => showModal()}>
        {isToday && isTodayBtnClicked ? <Circle>{date}</Circle> : date}일
      </TextDate>
    );
  }
};

export default DateInCalendar;

const TextDate = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  line-height: 24px;

  &:hover {
    border-radius: 4px;
    background: #f4fcd9;
  }
`;

export const Circle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  text-align: center;
  background: ${({ theme }) => theme.colors.today};
  height: 24px;
  width: 24px;
  color: #fff;
`;
