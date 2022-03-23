import React from "react";
import styled from "styled-components";

import CalendarHeader from "Components/CalendarHeader";
import CalendarBody from "Components/CalendarBody";

const Home = () => {
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
