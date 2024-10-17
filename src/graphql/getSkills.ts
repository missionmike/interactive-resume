import { Skill } from "../../sanity.types";
import { gql } from "@apollo/client";

export const GET_SKILLS = gql`
  query getSkills {
    allSkill {
      _id
      title
      icon
      yearStart
    }
  }
`;

export type AllSkill = {
  allSkill: Skill[];
};
