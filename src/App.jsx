import React from "react";
import { ThemeProvider } from "styled-components";

import "./App.css";

import Home from "Pages/Home";
import GlobalStyles from "./GlobalStyle";

const theme = {
  colors: {
    schedule: "#4D96FF",
    holiday: "#6BCB77",
    today: "#FF6B6B",
    primary: "#343a40",
    secondary: "#adb5bd",
    tertiary: "#dee1e4",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Home />
    </ThemeProvider>
  );
}

export default App;
