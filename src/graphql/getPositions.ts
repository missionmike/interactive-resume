import { BlockContent, Company, Position, Project } from "../../sanity.types";

import { SkillWithDescriptionRaw } from "./getSkills";
import { gql } from "@apollo/client";

export const GET_POSITIONS = gql`
  query getPositions($companyIds: [ID!]) {
    allPosition(where: { company: { _id: { in: $companyIds } } }, sort: [{ dateEnd: DESC }]) {
      _id
      title
      dateStart
      dateEnd
      company {
        _id
        name
      }
      projects {
        _id
        title
        bodyRaw
        skills {
          skill {
            _id
          }
          projectSkillDescriptionRaw
        }
      }
    }
  }
`;

export type ProjectWithRefs = Omit<Project, "skills" | "bodyRaw"> & {
  skills: {
    skill: SkillWithDescriptionRaw;
    projectSkillDescriptionRaw: BlockContent;
  }[];
  bodyRaw: BlockContent;
};

export type PositionWithRefs = Omit<Position, "company" | "projects"> & {
  company: Company;
  projects: ProjectWithRefs[];
};

export type AllPosition = {
  allPosition: PositionWithRefs[];
};
