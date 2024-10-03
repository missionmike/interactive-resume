import { AllCompany, GET_COMPANIES } from "@/graphql/getCompanies";
import { AllPosition, GET_POSITIONS } from "@/graphql/getPositions";
import { AllProject, GET_PROJECTS } from "@/graphql/getProjects";
import { AllTechnology, GET_TECHNOLOGY } from "@/graphql/getTechnology";

import { TechnologySection } from "@/components/sections/Technology/TechnologySection";
import { getApolloClient } from "@/lib/apolloClient";
import styles from "./page.module.css";

export default async function Page() {
  const client = getApolloClient();

  const { data: allCompanyData } = await client.query<AllCompany>({
    query: GET_COMPANIES,
  });

  const { data: allPositionData } = await client.query<AllPosition>({
    query: GET_POSITIONS,
    variables: {
      companyIds: allCompanyData.allCompany.map((company) => company._id),
    },
  });

  const { data: allProjectData } = await client.query<AllProject>({
    query: GET_PROJECTS,
    variables: {
      positionIds: allPositionData.allPosition.map((position) => position._id),
    },
  });

  const { data: allTechnologyData } = await client.query<AllTechnology>({
    query: GET_TECHNOLOGY,
  });

  return (
    <main className={styles.main}>
      <h1>
        Michael R. Dinerstein
        <br />
        Senior Full Stack Software Engineer
      </h1>
      <TechnologySection allTechnologyData={allTechnologyData} />
      <section>
        <h2>Work Experience</h2>
        {allCompanyData.allCompany.map((company) => (
          <div key={`company-${company._id}`}>
            <h3>{company.name}</h3>
            {allPositionData.allPosition.map((position) => {
              if (position?.company?._id !== company._id) return;

              return (
                <div key={`position-${position._id}`}>
                  <h4>{position.title}</h4>
                  <ul>
                    {allProjectData.allProject.map((project) => {
                      if (project?.position?._id !== position._id) return;

                      const technologyTitles = allTechnologyData.allTechnology.map((technology) => {
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
    </main>
  );
}
