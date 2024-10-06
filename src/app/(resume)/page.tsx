import { AllCompany, GET_COMPANIES } from "@/graphql/getCompanies";
import { AllPosition, GET_POSITIONS } from "@/graphql/getPositions";
import { AllProject, GET_PROJECTS } from "@/graphql/getProjects";
import { AllSkill, GET_SKILLS } from "@/graphql/getSkills";

import { MainProvider } from "@/context/MainContext";
import { SkillSection } from "@/components/sections/SkillSection";
import { WorkExperienceSection } from "@/components/sections/WorkExperience/WorkExperienceSection";
import { getApolloClient } from "@/lib/apolloClient";
import styles from "./page.module.scss";

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

  const { data: allSkillData } = await client.query<AllSkill>({
    query: GET_SKILLS,
  });

  return (
    <MainProvider
      allSkill={allSkillData.allSkill}
      allCompany={allCompanyData.allCompany}
      allPosition={allPositionData.allPosition}
      allProject={allProjectData.allProject}
    >
      <main className={styles.main}>
        <h1>
          Michael R. Dinerstein
          <br />
          <span>Senior Full Stack Software Engineer</span>
        </h1>
        <SkillSection />
        <WorkExperienceSection />
      </main>
    </MainProvider>
  );
}
