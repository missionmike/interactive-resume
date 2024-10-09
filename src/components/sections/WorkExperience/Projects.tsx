import { startTransition, useContext, useEffect, useState, useTransition } from "react";

import { MainContext } from "@/context/MainContext";
import { ProjectWithRefs } from "@/graphql/getPositions";
import { Skill } from "../../../../sanity.types";
import { SkillItem } from "@/components/sections/Skills/SkillItem";
import styles from "./Projects.module.scss";

export const Projects = ({ projects }: { projects: ProjectWithRefs[] }) => {
  const { skills, selectedSkillId } = useContext(MainContext);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTransitioning, startViewTransition] = useTransition();

  const [projectList, setProjectList] = useState(projects);

  useEffect(() => {
    if (!selectedSkillId) {
      setProjectList(projects);
      return;
    }

    /**
     * If a skill is selected, sort the projects so that projects with the
     * selected skill appear first in the list.
     */
    const sortedProjectList = [...projectList].sort((a, b) => {
      const projectSkillsA = a?.skills
        ? skills.reduce<string[]>((acc, skill) => {
            if (skill?.title && a.skills.map((s) => s._id).includes(skill._id)) {
              acc.push(skill._id);
            }
            return acc;
          }, [])
        : [];

      const projectSkillsB = b?.skills
        ? skills.reduce<string[]>((acc, skill) => {
            if (skill?.title && b.skills.map((s) => s._id).includes(skill._id)) {
              acc.push(skill._id);
            }
            return acc;
          }, [])
        : [];

      if (projectSkillsA.includes(selectedSkillId) && !projectSkillsB.includes(selectedSkillId))
        return -1;

      if (!projectSkillsA.includes(selectedSkillId) && projectSkillsB.includes(selectedSkillId))
        return 1;

      return 0;
    });

    startTransition(() => {
      startViewTransition(() => setProjectList(sortedProjectList));
    });
  }, [selectedSkillId, projectList, projects, skills]);

  return (
    <ul className={styles.projectList}>
      {projectList.map((project) => {
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
