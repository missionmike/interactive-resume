import { type SchemaTypeDefinition } from "sanity";

import { themeOptionsType } from "./themeOptionsType";
import { skillType } from "./skillType";
import { companyType } from "./companyType";
import { positionType } from "./positionType";
import { projectType } from "./projectType";
import { educationType } from "./educationType";
import { blockContentType } from "./blockContentType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    themeOptionsType,
    companyType,
    positionType,
    projectType,
    skillType,
    educationType,
    blockContentType,
  ],
};
