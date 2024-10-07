"use client";

import React from "react";
import { Skill } from "../../../../sanity.types";
import { SkillItem } from "./SkillItem";
import styles from "./SkillsExperience.module.scss";

export const SkillsExperience = ({ skills }: { skills: Skill[] }) => {
  const skillsByYear: {
    [year: string]: Skill[];
  } = {};

  /**
   * Group the skills data by year. Converts data format from:
   *
   * [
   *   {
   *     _id: 12345,
   *     title: 'Some Skill',
   *     yearStart: '2020-01-01',
   *   },
   *   ...
   * ]
   *
   * to:
   *
   * {
   *   2020: [
   *     {
   *       _id: 12345,
   *       title: 'Some Skill',
   *     },
   *     ...
   *   ],
   *   ...
   * }
   *
   */
  skills.forEach((skill) => {
    // If yearStart isn't defined, use "0" as the object key to indicate
    // that there's no year. We can filter on this value later to conditionally
    // display a label.
    const year = skill?.yearStart ? skill.yearStart.substring(0, 4) : "0";

    const skillWithoutYear = { ...skill };
    delete skillWithoutYear.yearStart;

    skillsByYear[year] = skillsByYear?.[year]
      ? [skillWithoutYear, ...skillsByYear[year]]
      : [skillWithoutYear];
  });

  return (
    <div className={styles.skillsExperienceContainer}>
      {Object.keys(skillsByYear).map((year) => {
        const totalYears = year !== "0" ? new Date().getFullYear() - parseInt(year, 10) : null;

        return (
          <React.Fragment key={`skill-group-${year}`}>
            <div className={styles.yearsPrefix}>
              {totalYears ? `${totalYears} year${totalYears > 1 ? "s" : ""}:` : ""}
            </div>
            <div className={styles.skillTagsContainer}>
              {skillsByYear[year].map((skill) => {
                return skill?.title ? (
                  <SkillItem key={`skill-${skill.title}`} skill={skill} />
                ) : null;
              })}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
