import { defineField, defineType } from "sanity";

import { UserIcon } from "@sanity/icons";

export const positionType = defineType({
  name: "position",
  title: "Position",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "company",
      type: "reference",
      to: [{ type: "company" }],
    }),
    defineField({
      name: "dateStart",
      type: "date",
    }),
    defineField({
      name: "dateEnd",
      type: "date",
    }),
  ],
});
