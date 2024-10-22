"use client";

import React, { useContext } from "react";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { Footer } from "./Footer";
import { ThemeAppearanceContext } from "@/context/ThemeContext";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { themeAppearance } = useContext(ThemeAppearanceContext);

  const theme = createTheme({
    palette: {
      primary: {
        main: themeAppearance === "dark" ? "#eee" : "#333",
      },
      mode: themeAppearance,
    },
  });

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>{children}</main>
        <Footer />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
