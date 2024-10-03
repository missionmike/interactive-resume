import { Company, Position } from "../../sanity.types";

import { gql } from "@apollo/client";

export const GET_POSITIONS = gql`
  query getPositions($companyIds: [ID!]) {
    allPosition(where: { company: { _id: { in: $companyIds } } }) {
      _id
      title
      dateStart
      dateEnd
      company {
        _id
      }
    }
  }
`;

export type PositionWithRefs = Omit<Position, "company"> & { company: Company };

export type AllPosition = {
  allPosition: PositionWithRefs[];
};
