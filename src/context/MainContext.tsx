"use client";

import { Company, Skill } from "../../sanity.types";
import { SetStateAction, createContext, useState } from "react";

import { PositionWithRefs } from "@/graphql/getPositions";

interface MainProviderProps {
  companies: Company[];
  positions: PositionWithRefs[];
  skills: Skill[];
}

interface MainContextProps {
  selectedSkillId: string;
  setSelectedSkillId: React.Dispatch<SetStateAction<string>>;
}

export const MainContext = createContext<MainProviderProps & MainContextProps>({
  companies: [],
  positions: [],
  skills: [],
  selectedSkillId: "",
  setSelectedSkillId: () => {},
});

export const MainProvider = ({
  children,
  companies,
  positions,
  skills,
}: MainProviderProps & { children?: React.ReactNode }) => {
  const [selectedSkillId, setSelectedSkillId] = useState("");

  return (
    <MainContext.Provider
      value={{ companies, positions, skills, selectedSkillId, setSelectedSkillId }}
    >
      {children}
    </MainContext.Provider>
  );
};
