import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  color: {
    background: "#021426",
    base: "#36689A",
    base_hover: "#90B5DA",
    danger: "#CE0000",
    danger_hover: "#FF0200",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
