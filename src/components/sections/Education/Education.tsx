"use client";

import React, { useContext } from "react";

import { DataContext } from "@/context/DataContext";
import type { Education as EducationType } from "../../../../sanity.types";
import { formatDate } from "@/lib/format";
import styles from "./Education.module.scss";

export const Education = () => {
  const { education } = useContext(DataContext);

  // Group education by school name. This was a simpler
  // approach than to create a separate type speficially to group
  // by school in Sanity.
  const educationGroupedBySchool: { [key: string]: EducationType[] } = {};
  education.map((edu) => {
    if (!edu?.school) return;

    educationGroupedBySchool[edu.school] = educationGroupedBySchool[edu.school]
      ? [...educationGroupedBySchool[edu.school], edu]
      : [edu];
  });

  return (
    <section className={styles.section}>
      <h2 className="resumeHeading">Education</h2>
      {Object.keys(educationGroupedBySchool).map((school) => (
        <React.Fragment key={`education-${school}`}>
          <h3>{school}</h3>
          {educationGroupedBySchool[school].map((edu) => (
            <div key={`education-${edu._id}`}>
              <h4>
                {edu.award}
                <span> &mdash; {formatDate(edu?.dateAwarded)}</span>
              </h4>
            </div>
          ))}
        </React.Fragment>
      ))}
    </section>
  );
};
