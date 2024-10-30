import { defineField, defineType } from "sanity";

export const projectSkillType = defineType({
  name: "projectSkill",
  title: "Project Skill",
  type: "object",
  fields: [
    defineField({
      name: "skill",
      type: "reference",
      to: { type: "skill" },
    }),
    defineField({
      name: "projectSkillDescription",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "skill.title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title || "(No skill name)",
      };
    },
  },
});
