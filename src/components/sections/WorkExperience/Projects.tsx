import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { ArrowDownIcon } from "@sanity/icons";
import { DataContext } from "@/context/DataContext";
import { PortableText } from "next-sanity";
import { ProjectWithRefs } from "@/graphql/getPositions";
import { SkillItem } from "@/components/sections/Skills/SkillItem";
import { SkillWithDescriptionRaw } from "@/graphql/getSkills";
import styles from "./Projects.module.scss";
import { useContext } from "react";

const ProjectItem = ({
  project,
  projectSkills,
}: {
  project: ProjectWithRefs;
  projectSkills: SkillWithDescriptionRaw[];
}) => (
  <div className={styles.projectOverview}>
    <div>{project.title}</div>
    <div className={styles.projectTagContainer}>
      {projectSkills.map((skill) =>
        skill?.title ? <SkillItem key={`skill-${skill.title}`} skill={skill} /> : null,
      )}
    </div>
  </div>
);

export const Projects = ({ projects }: { projects: ProjectWithRefs[] }) => {
  const { skills } = useContext(DataContext);

  return projects.map((project) => {
    const projectSkills = project?.skills
      ? skills.reduce<SkillWithDescriptionRaw[]>((acc, skill) => {
          // Check if the skill is linked to the project
          if (skill?.title && project.skills.map((s) => s._id).includes(skill._id)) {
            acc.push(skill);
          }
          return acc;
        }, [])
      : [];

    return project?.bodyRaw ? (
      <Accordion
        sx={{ boxShadow: "none", padding: "0" }}
        key={`project-${project._id}`}
        slotProps={{ heading: { component: "h5" } }}
        className={styles.accordion}
      >
        <AccordionSummary expandIcon={project?.bodyRaw ? <ArrowDownIcon /> : null}>
          <ProjectItem project={project} projectSkills={projectSkills} />
        </AccordionSummary>
        <AccordionDetails>
          <PortableText value={project.bodyRaw} />
        </AccordionDetails>
      </Accordion>
    ) : (
      <ProjectItem key={`project-${project._id}`} project={project} projectSkills={projectSkills} />
    );
  });
};
