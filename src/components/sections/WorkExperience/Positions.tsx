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
  const { allTechnology } = useContext(MainContext);

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

              const technologyTitles = allTechnology.map((technology) => {
                if (
                  !project.technology?.map((technology) => technology._id).includes(technology._id)
                )
                  return;

                return technology.title;
              });

              return (
                <li key={`project-${project._id}`}>
                  {project.title} <span>{technologyTitles.join(", ")}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};
