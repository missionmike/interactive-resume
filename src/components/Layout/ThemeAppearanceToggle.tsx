import { MoonIcon, SunIcon } from "@sanity/icons";

import { Switch } from "@mui/material";
import { ThemeAppearanceContext } from "@/context/ThemeContext";
import styles from "./ThemeAppearanceToggle.module.scss";
import { useContext } from "react";

export const ThemeAppearanceToggle = () => {
  const { themeAppearance, setThemeAppearance } = useContext(ThemeAppearanceContext);

  const toggleThemeAppearance = () => {
    setThemeAppearance(themeAppearance === "light" ? "dark" : "light");
  };

  return (
    <div className={styles.themeAppearanceToggle}>
      <SunIcon />
      <Switch
        checked={themeAppearance === "dark"}
        onChange={toggleThemeAppearance}
        sx={(theme) => ({
          backgroundColor: theme.palette.background.default,
        })}
      />
      <MoonIcon />
    </div>
  );
};
