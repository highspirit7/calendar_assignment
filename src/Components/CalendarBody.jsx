import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { initCalendar } from "store/actions/calendar";
import { DAYS } from "constants";

const CalendarBody = () => {
  const state = useSelector((state) => state.calendar);

  const { selectedMonth, selectedYYYYMM } = state;

  function renderDatesInCalendar(startToSlice, endToSlice, index) {
    const TDs = Object.keys(selectedMonth)
      .slice(startToSlice, endToSlice)
      .map((YYYYMMDD) => {
        const month = YYYYMMDD.split("-")[1];
        const date = YYYYMMDD.split("-")[2];

        const [selectedYYYY, selectedMM] = selectedYYYYMM.split("-");

        const dateForCalendar =
          date === "1" ? `${month}월 ${date}일` : `${date}일`;

        return (
          <TD
            key={YYYYMMDD}
            date={YYYYMMDD}
            isSelectedMonth={selectedMM == month}
          >
            {dateForCalendar}
          </TD>
        );
      });

    return <tr key={`${index}_week`}>{TDs}</tr>;
  }

  return (
    <StyledTable>
      <THead>
        <TR>
          {DAYS.map((day) => (
            <TH key={day}>{day}</TH>
          ))}
        </TR>
      </THead>
      <TBody>
        {Array.from({ length: 7 }, (v, i) => i).map((i) => {
          return renderDatesInCalendar(i * 7, i * 7 + 7, i + 1);
        })}
      </TBody>
    </StyledTable>
  );
};

export default CalendarBody;

export const StyledTable = styled.table`
  // custom css goes here
  color: ${({ theme }) => theme.colors.primary};
`;

export const THead = styled.thead`
  // custom css goes here
  /* color: ${({ theme }) => theme.colors.secondary}; */
`;

export const TBody = styled.tbody`
  // custom css goes here
`;

export const TR = styled.tr`
  // custom css goes here
`;

export const TH = styled.th`
  // custom css goes here
  width: 100px;
  text-align: right;
  font-weight: 600;
  color: ${(props) => {
    if (props.children === "일" || props.children === "토") {
      return props.theme.colors.secondary;
    }
  }};
`;

export const TD = styled.td`
  // custom css goes here
  width: 100px;
  height: 100px;
  text-align: right;
  font-weight: 600;
  border: 1px solid gray;
  background: ${(props) => {
    const { date } = props;
    const [YYYY, MM, DD] = date.split("-");
    const dateObj = new Date(YYYY, MM - 1, DD);

    if (dateObj.getDay() === 0 || dateObj.getDay() === 6) {
      return props.theme.colors.tertiary;
    }
  }};
  color: ${(props) => {
    const { date } = props;
    const [YYYY, MM, DD] = date.split("-");
    const dateObj = new Date(YYYY, MM - 1, DD);

    if (!props.isSelectedMonth) {
      return props.theme.colors.secondary;
    }

    if (dateObj.getDay() === 0 || dateObj.getDay() === 6) {
      return props.theme.colors.secondary;
    }
  }};
`;
