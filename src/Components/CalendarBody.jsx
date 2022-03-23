import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { initCalendar } from "store/actions/calendar";

const CalendarBody = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.calendar);

  useEffect(() => {
    dispatch(initCalendar());
  }, [dispatch]);

  const { selectedMonth } = state;

  function renderDatesInCalendar(startToSlice, endToSlice, index) {
    const TDs = Object.keys(selectedMonth)
      .slice(startToSlice, endToSlice)
      .map((YYYYMMDD) => {
        const month = YYYYMMDD.split("-")[1];
        const date = YYYYMMDD.split("-")[2];

        const dateForCalendar =
          date === "1" ? `${month}월 ${date}일` : `${date}일`;
        return <TD key={YYYYMMDD}>{dateForCalendar}</TD>;
      });

    return <tr key={`${index}_week`}>{TDs}</tr>;
  }

  return (
    <StyledTable>
      <THead>
        <TR>
          <TH>일</TH>
          <TH>월</TH>
          <TH>화</TH>
          <TH>수</TH>
          <TH>목</TH>
          <TH>금</TH>
          <TH>토</TH>
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
`;

export const TD = styled.td`
  // custom css goes here
  width: 100px;
  height: 100px;
  text-align: right;
  border: 1px solid gray;
`;
