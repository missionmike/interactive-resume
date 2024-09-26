import { dataset, projectId } from "../env";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import createImageUrlBuilder from "@sanity/image-url";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
