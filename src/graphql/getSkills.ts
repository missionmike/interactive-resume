import { BlockContent, Skill } from "../../sanity.types";

import { gql } from "@apollo/client";

export const GET_SKILLS = gql`
  query getSkills {
    allSkill {
      _id
      title
      icon
      yearStart
      totalYears
      descriptionRaw
    }
  }
`;

export type SkillWithDescriptionRaw = Skill & {
  descriptionRaw: BlockContent;
};

export type AllSkill = {
  allSkill: SkillWithDescriptionRaw[];
};
