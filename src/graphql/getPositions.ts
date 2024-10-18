import { Company, Position, Project, Skill } from "../../sanity.types";

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
        mainImage {
          asset {
            url
          }
        }
        skills {
          _id
        }
      }
    }
  }
`;

export type ProjectWithRefs = Omit<Project, "skills"> & {
  skills: Skill[];
};

export type PositionWithRefs = Omit<Position, "company" | "projects"> & {
  company: Company;
  projects: ProjectWithRefs[];
};

export type AllPosition = {
  allPosition: PositionWithRefs[];
};
