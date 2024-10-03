import { defineArrayMember, defineField, defineType } from "sanity";

import { CaseIcon } from "@sanity/icons";
import { formatDate } from "@/lib/format";

export const companyType = defineType({
  name: "company",
  title: "Company",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
    }),
    defineField({
      name: "dateStart",
      type: "date",
    }),
    defineField({
      name: "dateEnd",
      type: "date",
    }),
    defineField({
      name: "positions",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "position" } })],
    }),
  ],
  preview: {
    select: {
      companyName: "name",
      dateStart: "dateStart",
      dateEnd: "dateEnd",
    },
    prepare({ companyName, dateStart, dateEnd }) {
      return {
        title: companyName,
        subtitle: `${formatDate(dateStart)} - ${formatDate(dateEnd)}`,
      };
    },
  },
});
