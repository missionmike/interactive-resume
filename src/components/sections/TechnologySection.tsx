"use client";

import { MainContext } from "@/context/MainContext";
import styles from "./TechnologySection.module.scss";
import { useContext } from "react";

export const TechnologySection = () => {
  const { allTechnology } = useContext(MainContext);

  return (
    <section className={styles.section}>
      <h2>Technology</h2>
      <div className={styles.tagContainer}>
        {allTechnology.map((technology) => {
          return (
            <div key={`technology-${technology.title}`} className={styles.tagItem}>
              {technology.title}
            </div>
          );
        })}
      </div>
    </section>
  );
};
