import { dataset, projectId } from "@/sanity/env";

/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: { projectId, dataset },
  // @see https://www.sanity.io/docs/graphql
  graphql: [
    {
      playground: false,
    },
  ],
});
