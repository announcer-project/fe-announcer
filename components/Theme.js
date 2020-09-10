import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  color: {
    base: "#050042",
    base_hover: "#0C009B",
    danger: "#CE0000",
    danger_hover: "#FF0200",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
