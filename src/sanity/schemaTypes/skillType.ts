import { defineField, defineType } from "sanity";

import { TagIcon } from "@sanity/icons";

export const skillType = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "icon",
      type: "string",
    }),
    defineField({
      name: "yearStart",
      type: "date",
      options: {
        dateFormat: "YYYY",
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      yearStart: "yearStart",
    },
    prepare({ title, yearStart }) {
      let subtitle = "";

      try {
        const currentDateYear = new Date().getFullYear();
        const pastDateYear = parseInt(yearStart.split("-")[0], 10);
        const yearsExperience = currentDateYear - pastDateYear;
        subtitle = `${yearsExperience} years (since ${pastDateYear})`;
      } catch {
        // Error parsing the date, use default.
      }

      return {
        title,
        subtitle,
      };
    },
  },
});
