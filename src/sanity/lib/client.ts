import "server-only";

import { apiVersion, dataset, projectId } from "../env";

import { createClient } from "next-sanity";

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === "preview",
    studioUrl: "/studio",
  },
});
