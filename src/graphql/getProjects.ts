import { Position, Project, Technology } from "../../sanity.types";

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
      technology {
        _id
      }
    }
  }
`;

export type AllProject = {
  allProject: (Omit<Project, "position" | "technology"> & {
    position: Position;
    technology: Technology[];
  })[];
};
