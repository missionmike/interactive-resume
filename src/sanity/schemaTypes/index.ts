import { type SchemaTypeDefinition } from "sanity";

import { companyType } from "./companyType";
import { positionType } from "./positionType";
import { projectType } from "./projectType";
import { technologyType } from "./technologyType";
import { blockContentType } from "./blockContentType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [companyType, positionType, projectType, technologyType, blockContentType],
};
