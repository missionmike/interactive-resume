import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { DataContext } from "@/context/DataContext";
import { PortableTextCustom } from "@/components/PortableTextCustom";
import { ProjectWithRefs } from "@/graphql/getPositions";
import { SkillItem } from "@/components/sections/Skills/SkillItem";
import { SkillWithDescriptionRaw } from "@/graphql/getSkills";
import styles from "./Projects.module.scss";
import { useContext } from "react";

/**
 * This contains the top-level project description and skill tags. It can
 * be used as standalone, or within the Accordion.
 */
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

/**
 * This is the primary Projects component, which renders as list of all projects.
 * These can be contained in an Accordion component, or as a standalone list item.
 */
export const Projects = ({ projects }: { projects: ProjectWithRefs[] }) => {
  const { skills } = useContext(DataContext);

  return projects.map((project) => {
    // Get all the skills used in this project.
    const projectSkills = project?.skills
      ? skills.reduce<SkillWithDescriptionRaw[]>((acc, skill) => {
          // Check if the skill is linked to the project
          if (skill?.title && project.skills.map((s) => s._id).includes(skill._id)) {
            acc.push(skill);
          }

          return acc;
        }, [])
      : [];

    // If the project contains a block description, we'll
    // use an Accordion component to render it.
    if (project?.bodyRaw) {
      return (
        <Accordion
          sx={{
            boxShadow: "none",
            padding: "0",
          }}
          key={`project-${project._id}`}
          slotProps={{ heading: { component: "h5" } }}
          className={styles.accordion}
        >
          <AccordionSummary>
            <ProjectItem project={project} projectSkills={projectSkills} />
          </AccordionSummary>
          <AccordionDetails
            sx={(theme) => ({
              backgroundColor: theme.palette.primary.light,
              padding: "2rem",
            })}
            className={styles.accordionDetails}
          >
            <PortableTextCustom value={project.bodyRaw} />
          </AccordionDetails>
        </Accordion>
      );
    }

    // Otherwise, show the project overview and skills only.
    return (
      <ProjectItem key={`project-${project._id}`} project={project} projectSkills={projectSkills} />
    );
  });
};
