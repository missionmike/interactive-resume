"use client";

import React from "react";
import { SkillItem } from "./SkillItem";
import { SkillWithDescriptionRaw } from "@/graphql/getSkills";
import styles from "./SkillsCloud.module.scss";

export const SkillsCloud = ({ skills }: { skills: SkillWithDescriptionRaw[] }) => (
  <div className={styles.skillsCloudContainer}>
    {skills.map((skill) =>
      skill?.title ? <SkillItem key={`skill-${skill.title}`} skill={skill} /> : null,
    )}
  </div>
);
