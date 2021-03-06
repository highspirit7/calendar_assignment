import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { padLeadingZeros } from "utils";
import {
  moveCalendarToLeft,
  moveCalendarToRight,
  moveToToday,
  getHolidaysRequest,
} from "store/actions/calendar";

const CalendarHeader = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.calendar);

  const { selectedYYYYMM } = state;
  const [selectedYYYY, selectedMM] = selectedYYYYMM.split("-");

  const selectedYYYYMMInHeader =
    selectedYYYY && selectedMM ? `${selectedYYYY}년 ${selectedMM}월` : "";

  const handleArrowButtonToLeft = () => {
    dispatch(moveCalendarToLeft());

    const dateObj = new Date(selectedYYYY, selectedMM - 2);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;

    dispatch(
      getHolidaysRequest({
        year,
        month: month < 10 ? padLeadingZeros(month, 2) : month.toString(),
      }),
    );
  };

  const handleArrowButtonToRight = () => {
    dispatch(moveCalendarToRight());

    const dateObj = new Date(selectedYYYY, selectedMM);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;

    dispatch(
      getHolidaysRequest({
        year,
        month: month < 10 ? padLeadingZeros(month, 2) : month.toString(),
      }),
    );
  };

  const handleTodayButton = () => {
    dispatch(moveToToday());
  };

  return (
    <StyledHeader>
      <h1>{selectedYYYYMMInHeader}</h1>
      <div>
        <ArrowButton onClick={() => handleArrowButtonToLeft()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </ArrowButton>
        <TodayButton onClick={() => handleTodayButton()}>오늘</TodayButton>
        <ArrowButton onClick={() => handleArrowButtonToRight()}>
          <FontAwesomeIcon icon={faChevronRight} />
        </ArrowButton>
      </div>
    </StyledHeader>
  );
};

export default CalendarHeader;

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: black;
  font-size: 26px;
  font-weight: 600;
  margin: 16px 0;
  z-index: 10;
`;

const ArrowButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid gray;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: ${({ theme }) => theme.colors.tertiary};
  }
`;

const TodayButton = styled.button`
  height: 24px;
  padding: 0 6px;
  margin: 0 4px;
  border: 1px solid gray;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: ${({ theme }) => theme.colors.tertiary};
  }
`;
