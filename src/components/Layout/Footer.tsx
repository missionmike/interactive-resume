"use client";

import React, { useContext } from "react";

import { BottomNavigation } from "@mui/material";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { ThemeAppearanceContext } from "@/context/ThemeContext";
import { ThemeAppearanceToggle } from "./ThemeAppearanceToggle";
import cx from "classnames";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const { themeAppearance } = useContext(ThemeAppearanceContext);

  return (
    <BottomNavigation
      className={styles.footer}
      component="footer"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
      })}
    >
      <div className={styles.footerContents}>
        <div className={styles.link}>
          <Icon
            icon="devicon:github"
            fontSize={23}
            color="light"
            className={cx(styles.iconify, themeAppearance === "dark" ? styles.invert : "")}
          />
          <Link href="https://github.com/missionmike/interactive-resume" target="_blank">
            <span>/missionmike/interactive-resume</span>
          </Link>
        </div>{" "}
        <ThemeAppearanceToggle />
      </div>
    </BottomNavigation>
  );
};
