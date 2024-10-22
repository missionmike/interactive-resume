"use client";

import { Box, Button } from "@mui/material";
import React, { MouseEvent, useState } from "react";

import { MainContext } from "@/context/MainContext";
import { SkillsCloud } from "./SkillsCloud";
import { SkillsExperience } from "./SkillsExperience";
import styles from "./Skills.module.scss";
import { useContext } from "react";

export const Skills = () => {
  const { skills } = useContext(MainContext);

  const [skillsLayout, setSkillsLayout] = useState<"experience" | "cloud">("experience");

  const toggleSkillsLayout = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target;

    if (!(target instanceof HTMLButtonElement)) return;

    const layout = target.dataset.layout;

    if (!layout || (layout !== "experience" && layout !== "cloud")) return;

    setSkillsLayout(layout);
  };

  return (
    <section className={styles.skillsSection}>
      <h2>Skills</h2>
      <Box>
        Group by:{" "}
        <Button
          data-active={skillsLayout === "experience"}
          data-layout="experience"
          onClick={toggleSkillsLayout}
          color={skillsLayout === "experience" ? "primary" : "secondary"}
        >
          Experience
        </Button>{" "}
        |{" "}
        <Button
          data-active={skillsLayout === "cloud"}
          data-layout="cloud"
          onClick={toggleSkillsLayout}
          color={skillsLayout === "cloud" ? "primary" : "secondary"}
        >
          Cloud
        </Button>
      </Box>
      {skillsLayout === "experience" ? (
        <SkillsExperience skills={skills} />
      ) : (
        <SkillsCloud skills={skills} />
      )}
    </section>
  );
};
