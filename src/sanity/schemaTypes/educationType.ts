import { defineField, defineType } from "sanity";

import { TaskIcon } from "@sanity/icons";

export const educationType = defineType({
  name: "education",
  title: "Education",
  type: "document",
  icon: TaskIcon,
  fields: [
    defineField({
      name: "school",
      type: "string",
    }),
    defineField({
      name: "award",
      type: "string",
    }),
    defineField({
      name: "dateAwarded",
      type: "date",
    }),
  ],
  preview: {
    select: {
      school: "school",
      award: "award",
    },
    prepare({ school, award }) {
      return {
        title: school,
        subtitle: award,
      };
    },
  },
});
