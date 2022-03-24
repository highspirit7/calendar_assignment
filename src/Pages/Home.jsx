import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import CalendarHeader from "Components/CalendarHeader";
import CalendarBody from "Components/CalendarBody";
import { padLeadingZeros } from "utils";
import { initCalendar, getHolidaysRequest } from "store/actions/calendar";

const Home = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = currentDate.getMonth() + 1;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCalendar());
    dispatch(
      getHolidaysRequest({
        year,
        month: month < 10 ? padLeadingZeros(month, 2) : month.toString(),
      }),
    );
  }, [dispatch]);
  return (
    <Wrapper>
      <CalendarHeader />
      <CalendarBody />
    </Wrapper>
  );
};
export default Home;

const Wrapper = styled.main`
  margin: 36px;
  display: flex;
  flex-direction: column;
`;
