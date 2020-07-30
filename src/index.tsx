/* tslint:disable:no-unused-variable */
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ffffff",
      main: "#fafafa",
      dark: "#c7c7c7",
    },
    secondary: {
      light: "#484848",
      main: "#212121",
      dark: "#000000",
    },
  },
  shape: {
    borderRadius: 0,
  },
  overrides: {
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "blue",
        },
      },
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
