"use client";

import { DataContext } from "@/context/DataContext";
import { formatDate } from "@/lib/format";
import styles from "./Education.module.scss";
import { useContext } from "react";

export const Education = () => {
  const { education } = useContext(DataContext);

  return (
    <section className={styles.section}>
      <h2>Education</h2>
      {education.map((edu) => (
        <div key={`education-${edu._id}`}>
          <h3>{edu.school}</h3>
          <h4>
            {edu.award}
            <span> &mdash; {formatDate(edu?.dateAwarded)}</span>
          </h4>
        </div>
      ))}
    </section>
  );
};
