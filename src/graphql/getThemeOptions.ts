import { ThemeOptions } from "../../sanity.types";
import { gql } from "@apollo/client";

export const GET_THEME_OPTIONS = gql`
  query getThemeOptions {
    allThemeOptions {
      userName
      userTitle
      siteTitle
      siteDescription
      siteImage {
        asset {
          url
          metadata {
            dimensions {
              width
              height
            }
          }
        }
      }
    }
  }
`;

type ImageAsset = {
  url: string;
  metadata: {
    dimensions: {
      width: number;
      height: number;
    };
  };
};

export type AllThemeOptions = {
  allThemeOptions: ThemeOptions[] &
    Omit<ThemeOptions, "siteImage"> &
    {
      siteImage: {
        asset: ImageAsset | null;
      };
    }[];
};
