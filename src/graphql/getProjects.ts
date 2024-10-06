import { Position, Project, Skill } from "../../sanity.types";

import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query getProjects($positionIds: [ID!]) {
    allProject(where: { position: { _id: { in: $positionIds } } }) {
      _id
      title
      position {
        _id
      }
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
`;

export type ProjectWithRefs = Omit<Project, "position" | "skills"> & {
  position: Position;
  skills: Skill[];
};

export type AllProject = {
  allProject: ProjectWithRefs[];
};
