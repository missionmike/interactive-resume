import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { technologyType } from "./technologyType";
import { projectType } from "./projectType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, technologyType, projectType],
};
