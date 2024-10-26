"use client";

import { Company, Education } from "../../sanity.types";

import { PositionWithRefs } from "@/graphql/getPositions";
import { SkillWithDescriptionRaw } from "@/graphql/getSkills";
import { createContext } from "react";

interface DataProviderProps {
  skills: SkillWithDescriptionRaw[];
  companies: Company[];
  positions: PositionWithRefs[];
  education: Education[];
}

export const DataContext = createContext<DataProviderProps>({
  skills: [],
  companies: [],
  positions: [],
  education: [],
});

export const DataProvider = ({
  children,
  skills,
  companies,
  positions,
  education,
}: DataProviderProps & { children?: React.ReactNode }) => (
  <DataContext.Provider value={{ skills, companies, positions, education }}>
    {children}
  </DataContext.Provider>
);
