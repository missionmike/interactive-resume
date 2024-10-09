"use client";

import { PositionWithRefs } from "@/graphql/getPositions";
import { Projects } from "./Projects";
import { formatDate } from "@/lib/format";
import styles from "./Positions.module.scss";

export const Positions = ({ positions }: { positions: PositionWithRefs[] }) => {
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
          <Projects projects={position.projects} />
        </div>
      ))}
    </div>
  );
};
