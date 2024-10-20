"use client";

import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#eee",
      main: "#333",
      dark: "#333",
      contrastText: "#333",
    },
  },
});

export { theme };
