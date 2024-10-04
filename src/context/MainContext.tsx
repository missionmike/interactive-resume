"use client";

import { Company, Technology } from "../../sanity.types";

import { PositionWithRefs } from "@/graphql/getPositions";
import { ProjectWithRefs } from "@/graphql/getProjects";
import { createContext } from "react";

interface MainContextProps {
  allCompany: Company[];
  allPosition: PositionWithRefs[];
  allProject: ProjectWithRefs[];
  allTechnology: Technology[];
}

export const MainContext = createContext<MainContextProps>({
  allCompany: [],
  allPosition: [],
  allProject: [],
  allTechnology: [],
});

export const MainProvider = ({
  children,
  allCompany,
  allPosition,
  allProject,
  allTechnology,
}: MainContextProps & { children?: React.ReactNode }) => {
  return (
    <MainContext.Provider value={{ allCompany, allPosition, allProject, allTechnology }}>
      {children}
    </MainContext.Provider>
  );
};
