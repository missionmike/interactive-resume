import { ImageAsset } from "./types";
import { ThemeOptions } from "../../sanity.types";
import { gql } from "@apollo/client";

export const GET_THEME_OPTIONS = gql`
  query getThemeOptions {
    allThemeOptions {
      userName
      userTitle
      userContact
      userLocation
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

export type AllThemeOptions = {
  allThemeOptions: ThemeOptions[] &
    Omit<ThemeOptions, "siteImage"> &
    {
      siteImage: {
        asset: ImageAsset | null;
      };
    }[];
};
