"use client";

import { SetStateAction, createContext, useEffect, useState } from "react";

export type ThemeAppearance = "dark" | "light";

interface ThemeAppearanceProviderProps {
  themeAppearance: ThemeAppearance;
  setThemeAppearance: React.Dispatch<SetStateAction<ThemeAppearance>>;
}

export const ThemeAppearanceContext = createContext<ThemeAppearanceProviderProps>({
  themeAppearance: "light",
  setThemeAppearance: () => {},
});

export const ThemeAppearanceProvider = ({ children }: { children?: React.ReactNode }) => {
  const [themeAppearance, setThemeAppearance] = useState<ThemeAppearance>("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setThemeAppearance(e.matches ? "dark" : "light");
    };

    // Detect the current appearance settings immediately.
    if (mediaQuery.matches) {
      handleMediaQueryChange(new MediaQueryListEvent("change", { matches: mediaQuery.matches }));
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <ThemeAppearanceContext.Provider value={{ themeAppearance, setThemeAppearance }}>
      {children}
    </ThemeAppearanceContext.Provider>
  );
};
