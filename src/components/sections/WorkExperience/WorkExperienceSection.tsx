import { Company, Technology } from "../../../../sanity.types";

import { PositionWithRefs } from "@/graphql/getPositions";
import { Positions } from "./Positions";
import { ProjectWithRefs } from "@/graphql/getProjects";
import { formatDate } from "@/lib/format";
import styles from "./WorkExperienceSection.module.scss";

export const WorkExperienceSection = ({
  allCompany,
  allPosition,
  allProject,
  allTechnology,
}: {
  allCompany: Company[];
  allPosition: PositionWithRefs[];
  allProject: ProjectWithRefs[];
  allTechnology: Technology[];
}) => (
  <section className={styles.section}>
    <h2>Work Experience</h2>
    {allCompany.map((company) => {
      const positions = allPosition.filter((position) => position?.company?._id === company._id);
      const projects = allProject.filter(
        (project) =>
          project?.position?._id &&
          positions.map((position) => position._id).includes(project.position._id),
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
          <Positions positions={positions} projects={projects} allTechnology={allTechnology} />
        </div>
      );
    })}
  </section>
);
