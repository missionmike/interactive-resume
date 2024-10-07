"use client";

import React from "react";
import { Skill } from "../../../../sanity.types";
import { SkillItem } from "./SkillItem";
import styles from "./SkillsCloud.module.scss";

export const SkillsCloud = ({ skills }: { skills: Skill[] }) => (
  <div className={styles.skillsCloudContainer}>
    {skills.map((skill) =>
      skill?.title ? <SkillItem key={`skill-${skill.title}`} skill={skill} /> : null,
    )}
  </div>
);
