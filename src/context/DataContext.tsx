"use client";

import { Company, Education, Skill } from "../../sanity.types";
import { SetStateAction, createContext, useState } from "react";

import { PositionWithRefs } from "@/graphql/getPositions";

interface DataProviderProps {
  skills: Skill[];
  companies: Company[];
  positions: PositionWithRefs[];
  education: Education[];
}

interface DataContextProps {
  selectedSkillId: string;
  setSelectedSkillId: React.Dispatch<SetStateAction<string>>;
}

export const DataContext = createContext<DataProviderProps & DataContextProps>({
  skills: [],
  companies: [],
  positions: [],
  education: [],
  selectedSkillId: "",
  setSelectedSkillId: () => {},
});

export const DataProvider = ({
  children,
  skills,
  companies,
  positions,
  education,
}: DataProviderProps & { children?: React.ReactNode }) => {
  const [selectedSkillId, setSelectedSkillId] = useState("");

  return (
    <DataContext.Provider
      value={{ skills, companies, positions, education, selectedSkillId, setSelectedSkillId }}
    >
      {children}
    </DataContext.Provider>
  );
};
