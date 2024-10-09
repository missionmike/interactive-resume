import { defineArrayMember, defineField, defineType } from "sanity";

import { DocumentTextIcon } from "@sanity/icons";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "skills",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "skill" } })],
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      position: "position.title",
      company: "position.company.name",
    },
    prepare(selection) {
      const { title, media, position, company } = selection;
      return {
        title,
        media,
        subtitle: `${position} at ${company}`,
      };
    },
  },
});
