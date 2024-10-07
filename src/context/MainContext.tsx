"use client";

import { Company, Skill } from "../../sanity.types";
import { SetStateAction, createContext, useState } from "react";

import { PositionWithRefs } from "@/graphql/getPositions";
import { ProjectWithRefs } from "@/graphql/getProjects";

interface MainProviderProps {
  companies: Company[];
  positions: PositionWithRefs[];
  projects: ProjectWithRefs[];
  skills: Skill[];
}

interface MainContextProps {
  selectedSkillId: string;
  setSelectedSkillId: React.Dispatch<SetStateAction<string>>;
}

export const MainContext = createContext<MainProviderProps & MainContextProps>({
  companies: [],
  positions: [],
  projects: [],
  skills: [],
  selectedSkillId: "",
  setSelectedSkillId: () => {},
});

export const MainProvider = ({
  children,
  companies,
  positions,
  projects,
  skills,
}: MainProviderProps & { children?: React.ReactNode }) => {
  const [selectedSkillId, setSelectedSkillId] = useState("");

  return (
    <MainContext.Provider
      value={{ companies, positions, projects, skills, selectedSkillId, setSelectedSkillId }}
    >
      {children}
    </MainContext.Provider>
  );
};
