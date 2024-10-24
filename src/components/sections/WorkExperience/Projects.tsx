import { DataContext } from "@/context/DataContext";
import { ProjectWithRefs } from "@/graphql/getPositions";
import { SkillItem } from "@/components/sections/Skills/SkillItem";
import { SkillWithDescriptionRaw } from "@/graphql/getSkills";
import styles from "./Projects.module.scss";
import { useContext } from "react";

export const Projects = ({ projects }: { projects: ProjectWithRefs[] }) => {
  const { skills } = useContext(DataContext);

  return (
    <ul className={styles.projectList}>
      {projects.map((project) => {
        const projectSkills = project?.skills
          ? skills.reduce<SkillWithDescriptionRaw[]>((acc, skill) => {
              // Check if the skill is linked to the project
              if (skill?.title && project.skills.map((s) => s._id).includes(skill._id)) {
                acc.push(skill);
              }
              return acc;
            }, [])
          : [];

        return (
          <li key={`project-${project._id}`}>
            <div>{project.title}</div>
            <div className={styles.projectTagContainer}>
              {projectSkills.map((skill) =>
                skill?.title ? <SkillItem key={`skill-${skill.title}`} skill={skill} /> : null,
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
