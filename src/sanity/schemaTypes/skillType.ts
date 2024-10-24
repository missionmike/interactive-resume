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
    defineField({
      name: "totalYears",
      type: "number",
      description: "Enter a value here if you want to override the auto-calculated value.",
    }),
    defineField({
      name: "description",
      type: "blockContent",
      description: "Displayed in a modal pop-up if users click on the skill.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      yearStart: "yearStart",
      totalYears: "totalYears",
    },
    prepare({ title, yearStart, totalYears }) {
      let subtitle = "";

      try {
        const currentDateYear = new Date().getFullYear();
        const pastDateYear = parseInt(yearStart.split("-")[0], 10);
        const yearsExperience = totalYears ? totalYears : currentDateYear - pastDateYear;

        subtitle = `${yearsExperience} years ${totalYears ? "" : `(since ${pastDateYear})`}`;
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
