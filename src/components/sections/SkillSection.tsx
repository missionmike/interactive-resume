"use client";

import { MainContext } from "@/context/MainContext";
import styles from "./SkillSection.module.scss";
import { useContext } from "react";

export const SkillSection = () => {
  const { skills } = useContext(MainContext);

  console.log({ skills });

  return (
    <section className={styles.section}>
      <h2>Skills</h2>
      <div className={styles.tagContainer}>
        {skills.map((skill) => {
          return (
            <div key={`skill-${skill.title}`} className={styles.tagItem}>
              {skill.title}
            </div>
          );
        })}
      </div>
    </section>
  );
};
