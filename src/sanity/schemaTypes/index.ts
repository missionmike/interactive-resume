import { type SchemaTypeDefinition } from "sanity";

import { themeOptionsType } from "./themeOptionsType";
import { companyType } from "./companyType";
import { positionType } from "./positionType";
import { projectType } from "./projectType";
import { skillType } from "./skillType";
import { blockContentType } from "./blockContentType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [themeOptionsType, companyType, positionType, projectType, skillType, blockContentType],
};
