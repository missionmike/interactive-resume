"use client";

import { Company, Skill } from "../../sanity.types";

import { PositionWithRefs } from "@/graphql/getPositions";
import { ProjectWithRefs } from "@/graphql/getProjects";
import { createContext } from "react";

interface MainContextProps {
  companies: Company[];
  positions: PositionWithRefs[];
  projects: ProjectWithRefs[];
  skills: Skill[];
}

export const MainContext = createContext<MainContextProps>({
  companies: [],
  positions: [],
  projects: [],
  skills: [],
});

export const MainProvider = ({
  children,
  companies,
  positions,
  projects,
  skills,
}: MainContextProps & { children?: React.ReactNode }) => {
  return (
    <MainContext.Provider value={{ companies, positions, projects, skills }}>
      {children}
    </MainContext.Provider>
  );
};
