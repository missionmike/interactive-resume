"use client";

import { DataContext } from "@/context/DataContext";
import { PositionsList } from "./PositionsList";
import { formatDate } from "@/lib/format";
import styles from "./WorkExperience.module.scss";
import { useContext } from "react";

export const WorkExperience = () => {
  const { companies, positions } = useContext(DataContext);

  return (
    <section className={styles.section}>
      <h2 className="resumeHeading">Work Experience</h2>
      {companies.map((company) => {
        const positionsInCompany = positions.filter(
          (position) => position?.company?._id === company._id,
        );

        return (
          <div key={`company-${company._id}`} className={styles.companySection}>
            <h3>
              {company.name}
              <span>
                {" "}
                &mdash; {formatDate(company?.dateStart)} to {formatDate(company?.dateEnd)}
              </span>
            </h3>
            <PositionsList positions={positionsInCompany} />
          </div>
        );
      })}
    </section>
  );
};
