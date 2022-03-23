import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const CalendarHeader = () => {
  const date = new Date();

  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  return (
    <StyledHeader>
      <h1>{` ${viewYear}년 ${viewMonth + 1}월 `}</h1>
      <div>
        <ArrowButton>
          <FontAwesomeIcon icon={faChevronLeft} />
        </ArrowButton>
        <TodayButton>오늘</TodayButton>
        <ArrowButton>
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
  font-weight: 500;
  margin: 16px 0;
  z-index: 10;
`;

const ArrowButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid gray;
  border-radius: 8px;
  background-color: white;
`;

const TodayButton = styled.button`
  height: 24px;
  padding: 0 6px;
  border: 1px solid gray;
  border-radius: 8px;
  background-color: white;
`;
