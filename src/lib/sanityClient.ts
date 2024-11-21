import { apiVersion, dataset, projectId } from "@/sanity/env";

import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
