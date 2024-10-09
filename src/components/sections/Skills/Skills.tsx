"use client";

import React, { MouseEvent, useState } from "react";

import { MainContext } from "@/context/MainContext";
import { SkillsCloud } from "./SkillsCloud";
import { SkillsExperience } from "./SkillsExperience";
import styles from "./Skills.module.scss";
import { useContext } from "react";

export const Skills = () => {
  const { skills } = useContext(MainContext);

  const [skillsLayout, setSkillsLayout] = useState<"experience" | "cloud">("cloud");

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target;

    if (!(target instanceof HTMLButtonElement)) return;

    const layout = target.dataset.layout;

    if (!layout || (layout !== "experience" && layout !== "cloud")) return;

    setSkillsLayout(layout);
  };

  return (
    <section>
      <h2>Skills</h2>
      <div className={styles.viewOptions}>
        Group by:{" "}
        <button
          data-active={skillsLayout === "experience"}
          data-layout="experience"
          onClick={handleClick}
        >
          Experience
        </button>{" "}
        |{" "}
        <button data-active={skillsLayout === "cloud"} data-layout="cloud" onClick={handleClick}>
          Cloud
        </button>
      </div>
      {skillsLayout === "experience" ? (
        <SkillsExperience skills={skills} />
      ) : (
        <SkillsCloud skills={skills} />
      )}
    </section>
  );
};
