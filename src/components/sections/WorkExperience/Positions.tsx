"use client";

import { MainContext } from "@/context/MainContext";
import { PositionWithRefs } from "@/graphql/getPositions";
import { ProjectWithRefs } from "@/graphql/getProjects";
import { Projects } from "./Projects";
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
          <Projects position={position} projects={projects} />
        </div>
      ))}
    </div>
  );
};
