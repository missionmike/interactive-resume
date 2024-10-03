import { Technology } from "../../sanity.types";
import { gql } from "@apollo/client";

export const GET_TECHNOLOGY = gql`
  query getTechnology {
    allTechnology {
      _id
      title
    }
  }
`;

export type AllTechnology = {
  allTechnology: Technology[];
};
