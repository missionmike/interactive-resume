import { Company, Technology } from "../../../sanity.types";

import { PositionWithRefs } from "@/graphql/getPositions";
import { ProjectWithRefs } from "@/graphql/getProjects";

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
  <section>
    <h2>Work Experience</h2>
    {allCompany.map((company) => (
      <div key={`company-${company._id}`}>
        <h3>{company.name}</h3>
        {allPosition.map((position) => {
          if (position?.company?._id !== company._id) return;

          return (
            <div key={`position-${position._id}`}>
              <h4>{position.title}</h4>
              <ul>
                {allProject.map((project) => {
                  if (project?.position?._id !== position._id) return;

                  const technologyTitles = allTechnology.map((technology) => {
                    if (
                      !project.technology
                        ?.map((technology) => technology._id)
                        .includes(technology._id)
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
          );
        })}
      </div>
    ))}
  </section>
);
