import { defineField, defineType } from "sanity";

import { TagIcon } from "@sanity/icons";

export const technologyType = defineType({
  name: "technology",
  title: "Technology",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
  ],
});
