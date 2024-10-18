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
    const year = skill?.yearStart ? skill.yearStart.substring(0, 4) : null;

    // The totalYears field allows users to override the value of how many years'
    // experience per skill. For example, if it's currently 2024, and the yearStart
    // value is 2014, the auto-calc value is 10 years. But if the user wants to make
    // it clear that they only used this skill for 2 years, for example, they can
    // populate the totalYears value to override it.
    const totalYears = skill?.totalYears
      ? skill.totalYears.toString()
      : year
        ? new Date().getFullYear() - parseInt(year, 10)
        : "1"; // Minimum 1 year.

    const skillWithoutYear = { ...skill };
    delete skillWithoutYear.yearStart;

    skillsByYear[totalYears] = skillsByYear?.[totalYears]
      ? [skillWithoutYear, ...skillsByYear[totalYears]]
      : [skillWithoutYear];
  });

  return (
    <div className={styles.skillsExperienceContainer}>
      {Object.keys(skillsByYear).map((totalYears) => {
        return (
          <React.Fragment key={`skill-group-${totalYears}`}>
            <div className={styles.yearsPrefix}>
              {totalYears ? `${totalYears} year${parseInt(totalYears, 10) > 1 ? "s" : ""}:` : ""}
            </div>
            <div className={styles.skillTagsContainer}>
              {skillsByYear[totalYears].map((skill) => {
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
