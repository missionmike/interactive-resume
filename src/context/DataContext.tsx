"use client";

import { Company, Skill } from "../../sanity.types";
import { SetStateAction, createContext, useState } from "react";

import { PositionWithRefs } from "@/graphql/getPositions";

interface DataProviderProps {
  companies: Company[];
  positions: PositionWithRefs[];
  skills: Skill[];
}

interface DataContextProps {
  selectedSkillId: string;
  setSelectedSkillId: React.Dispatch<SetStateAction<string>>;
}

export const DataContext = createContext<DataProviderProps & DataContextProps>({
  companies: [],
  positions: [],
  skills: [],
  selectedSkillId: "",
  setSelectedSkillId: () => {},
});

export const DataProvider = ({
  children,
  companies,
  positions,
  skills,
}: DataProviderProps & { children?: React.ReactNode }) => {
  const [selectedSkillId, setSelectedSkillId] = useState("");

  return (
    <DataContext.Provider
      value={{ companies, positions, skills, selectedSkillId, setSelectedSkillId }}
    >
      {children}
    </DataContext.Provider>
  );
};
