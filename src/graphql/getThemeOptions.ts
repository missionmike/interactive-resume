import { gql } from "@apollo/client";

export const GET_THEME_OPTIONS = gql`
  query getThemeOptions {
    allThemeOptions {
      userName
      userTitle
    }
  }
`;

export type AllThemeOptions = {
  allThemeOptions: {
    userName: string;
    userTitle: string;
  }[];
};
