import { AllCompany, GET_COMPANIES } from "@/graphql/getCompanies";
import { AllPosition, GET_POSITIONS } from "@/graphql/getPositions";
import { AllSkill, GET_SKILLS } from "@/graphql/getSkills";
import { AllThemeOptions, GET_THEME_OPTIONS } from "@/graphql/getThemeOptions";

import { DataProvider } from "@/context/DataContext";
import { Skills } from "@/components/sections/Skills/Skills";
import { WorkExperience } from "@/components/sections/WorkExperience/WorkExperience";
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

  const { data: allSkillData } = await client.query<AllSkill>({
    query: GET_SKILLS,
  });

  const { data: allThemeOptions } = await client.query<AllThemeOptions>({
    query: GET_THEME_OPTIONS,
  });

  return (
    <DataProvider
      companies={allCompanyData.allCompany}
      positions={allPositionData.allPosition}
      skills={allSkillData.allSkill}
    >
      <main className={styles.main}>
        <h1>
          {allThemeOptions.allThemeOptions[0]?.userName}
          <br />
          <span>{allThemeOptions.allThemeOptions[0]?.userTitle}</span>
        </h1>
        <Skills />
        <WorkExperience />
      </main>
    </DataProvider>
  );
}
