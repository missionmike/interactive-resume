import { MainContext } from "@/context/MainContext";
import { PositionWithRefs } from "@/graphql/getPositions";
import { ProjectWithRefs } from "@/graphql/getProjects";
import { TagItem } from "@/components/TagItem";
import styles from "./Projects.module.scss";
import { useContext } from "react";

export const Projects = ({
  position,
  projects,
}: {
  position: PositionWithRefs;
  projects: ProjectWithRefs[];
}) => {
  const { skills } = useContext(MainContext);

  return (
    <ul className={styles.projectList}>
      {projects.map((project) => {
        if (project?.position?._id !== position._id) return;

        const skillTitles = project?.skills
          ? skills.reduce<string[]>((acc, skill) => {
              // Check if the skill is linked to the project
              if (skill?.title && project.skills.map((s) => s._id).includes(skill._id)) {
                acc.push(skill.title);
              }
              return acc;
            }, [])
          : [];

        return (
          <li key={`project-${project._id}`}>
            <div>{project.title}</div>
            <div className={styles.projectTagContainer}>
              {skillTitles.map((skillTitle) => (
                <TagItem title={skillTitle} className="projectTag" />
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
