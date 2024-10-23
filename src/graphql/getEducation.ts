import { Education } from "../../sanity.types";
import { gql } from "@apollo/client";

export const GET_EDUCATION = gql`
  query getEducation {
    allEducation(sort: [{ dateAwarded: DESC }]) {
      _id
      school
      award
      dateAwarded
    }
  }
`;

export type AllEducation = {
  allEducation: Education[];
};
