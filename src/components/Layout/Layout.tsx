"use client";

import React, { useContext } from "react";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { Footer } from "./Footer";
import { ThemeAppearanceContext } from "@/context/ThemeContext";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { usePathname } from "next/navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { themeAppearance } = useContext(ThemeAppearanceContext);

  // If we're rendering a Sanity Studio page, return the children
  // immediately because we don't need to augment the layout at all.
  if (usePathname().startsWith("/studio/")) return children;

  const theme = createTheme({
    palette: {
      primary: {
        main: themeAppearance === "dark" ? "#eee" : "#333",
        light: themeAppearance === "dark" ? "#333" : "#eee",
      },
      mode: themeAppearance,
    },
  });

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        <Footer />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
