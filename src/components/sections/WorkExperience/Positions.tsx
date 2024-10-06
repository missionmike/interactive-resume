"use client";

import { MainContext } from "@/context/MainContext";
import { PositionWithRefs } from "@/graphql/getPositions";
import { ProjectWithRefs } from "@/graphql/getProjects";
import { formatDate } from "@/lib/format";
import styles from "./Positions.module.scss";
import { useContext } from "react";

export const Positions = ({
  positions,
  projects,
}: {
  positions: PositionWithRefs[];
  projects: ProjectWithRefs[];
}) => {
  const { skills } = useContext(MainContext);

  return (
    <div className={styles.container}>
      {positions.map((position) => (
        <div key={`position-${position._id}`}>
          <h4>
            {position.title}{" "}
            {positions.length > 1 ? (
              <span>
                &mdash; {formatDate(position?.dateStart)} - {formatDate(position?.dateEnd)}
              </span>
            ) : null}
          </h4>
          <ul>
            {projects.map((project) => {
              if (project?.position?._id !== position._id) return;

              const skillTitles = project?.skills
                ? skills.map((skill) => {
                    // Only display relevant skills linked to the project.
                    if (!project.skills?.map((s) => s._id).includes(skill._id)) return;

                    return skill.title;
                  })
                : [];

              return (
                <li key={`project-${project._id}`}>
                  {project.title} <span>{skillTitles.join(", ")}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};
