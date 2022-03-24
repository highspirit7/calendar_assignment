import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import CalendarHeader from "Components/CalendarHeader";
import CalendarBody from "Components/CalendarBody";

import { initCalendar } from "store/actions/calendar";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCalendar());
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
