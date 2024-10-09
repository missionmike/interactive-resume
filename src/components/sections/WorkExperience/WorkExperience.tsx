"use client";

import { MainContext } from "@/context/MainContext";
import { Positions } from "./Positions";
import { formatDate } from "@/lib/format";
import styles from "./WorkExperience.module.scss";
import { useContext } from "react";

export const WorkExperience = () => {
  const { companies, positions } = useContext(MainContext);

  return (
    <section className={styles.section}>
      <h2>Work Experience</h2>
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
            <Positions positions={positionsInCompany} />
          </div>
        );
      })}
    </section>
  );
};
