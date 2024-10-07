import { MainContext } from "@/context/MainContext";
import { PositionWithRefs } from "@/graphql/getPositions";
import { ProjectWithRefs } from "@/graphql/getProjects";
import { Skill } from "../../../../sanity.types";
import { SkillItem } from "@/components/sections/Skills/SkillItem";
import styles from "./Projects.module.scss";
import { useContext } from "react";

export const Projects = ({
  position,
  projects,
}: {
  position: PositionWithRefs;
  projects: ProjectWithRefs[];
}) => {
  const { skills, selectedSkillId } = useContext(MainContext);

  return (
    <ul className={styles.projectList}>
      {projects.map((project) => {
        if (project?.position?._id !== position._id) return;

        const projectSkills = project?.skills
          ? skills.reduce<Skill[]>((acc, skill) => {
              // Check if the skill is linked to the project
              if (skill?.title && project.skills.map((s) => s._id).includes(skill._id)) {
                acc.push(skill);
              }
              return acc;
            }, [])
          : [];

        return (
          <li
            key={`project-${project._id}`}
            data-selected={
              selectedSkillId
                ? projectSkills.map((skill) => skill._id).includes(selectedSkillId)
                : true
            }
          >
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
