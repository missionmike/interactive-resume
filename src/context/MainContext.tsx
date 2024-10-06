"use client";

import { Company, Skill } from "../../sanity.types";

import { PositionWithRefs } from "@/graphql/getPositions";
import { ProjectWithRefs } from "@/graphql/getProjects";
import { createContext } from "react";

interface MainContextProps {
  allCompany: Company[];
  allPosition: PositionWithRefs[];
  allProject: ProjectWithRefs[];
  allSkill: Skill[];
}

export const MainContext = createContext<MainContextProps>({
  allCompany: [],
  allPosition: [],
  allProject: [],
  allSkill: [],
});

export const MainProvider = ({
  children,
  allCompany,
  allPosition,
  allProject,
  allSkill,
}: MainContextProps & { children?: React.ReactNode }) => {
  return (
    <MainContext.Provider value={{ allCompany, allPosition, allProject, allSkill }}>
      {children}
    </MainContext.Provider>
  );
};
