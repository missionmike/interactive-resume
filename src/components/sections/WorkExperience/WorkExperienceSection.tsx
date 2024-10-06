"use client";

import { MainContext } from "@/context/MainContext";
import { Positions } from "./Positions";
import { formatDate } from "@/lib/format";
import styles from "./WorkExperienceSection.module.scss";
import { useContext } from "react";

export const WorkExperienceSection = () => {
  const { companies, positions, projects } = useContext(MainContext);

  return (
    <section className={styles.section}>
      <h2>Work Experience</h2>
      {companies.map((company) => {
        const positionsInCompany = positions.filter(
          (position) => position?.company?._id === company._id,
        );

        const projectsInPositions = projects.filter(
          (project) =>
            project?.position?._id &&
            positionsInCompany.map((position) => position._id).includes(project.position._id),
        );

        return (
          <div key={`company-${company._id}`}>
            <h3>
              {company.name}
              <span>
                {" "}
                &mdash; {formatDate(company?.dateStart)} to {formatDate(company?.dateEnd)}
              </span>
            </h3>
            <Positions positions={positionsInCompany} projects={projectsInPositions} />
          </div>
        );
      })}
    </section>
  );
};
