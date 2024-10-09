import { Company } from "../../sanity.types";
import { gql } from "@apollo/client";

export const GET_COMPANIES = gql`
  query getCompanies {
    allCompany(sort: [{ dateEnd: DESC }]) {
      _id
      name
      dateStart
      dateEnd
    }
  }
`;

export type AllCompany = {
  allCompany: Company[];
};
