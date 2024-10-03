import { AllCompany, GET_COMPANIES } from "@/graphql/getCompanies";
import { AllPosition, GET_POSITIONS } from "@/graphql/getPositions";
import { AllProject, GET_PROJECTS } from "@/graphql/getProjects";
import { AllTechnology, GET_TECHNOLOGY } from "@/graphql/getTechnology";

import { TechnologySection } from "@/components/sections/Technology/TechnologySection";
import { WorkExperienceSection } from "@/components/sections/WorkExperience/WorkExperienceSection";
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
      <WorkExperienceSection
        allCompany={allCompanyData.allCompany}
        allPosition={allPositionData.allPosition}
        allProject={allProjectData.allProject}
        allTechnology={allTechnologyData.allTechnology}
      />
    </main>
  );
}
