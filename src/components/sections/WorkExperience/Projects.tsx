import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { SyntheticEvent, useContext, useState } from "react";

import { ChevronDownIcon } from "@sanity/icons";
import { DataContext } from "@/context/DataContext";
import { PortableTextCustom } from "@/components/PortableTextCustom";
import { ProjectWithRefs } from "@/graphql/getPositions";
import { SkillItem } from "@/components/sections/Skills/SkillItem";
import { SkillWithDescriptionRaw } from "@/graphql/getSkills";
import styles from "./Projects.module.scss";

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

const ProjectAccordion = ({
  project,
  projectSkills,
}: {
  project: ProjectWithRefs;
  projectSkills: SkillWithDescriptionRaw[];
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (event: SyntheticEvent, isExpanded: boolean) => {
    const target = event.target as HTMLElement;
    const isButtonClick = target.closest(".MuiButton-root");
    const isDialogClick = target.closest(".MuiDialog-root");

    if (isButtonClick || isDialogClick) {
      setExpanded(true); // Ensure the accordion remains open.
      return;
    }

    setExpanded(isExpanded);
  };

  return (
    <Accordion
      sx={{
        boxShadow: "none",
        padding: "0",
      }}
      slotProps={{ heading: { component: "h5" } }}
      className={styles.accordion}
      onChange={handleAccordionChange}
      expanded={expanded}
    >
      <AccordionSummary
        expandIcon={<ChevronDownIcon fontSize="2em" className={styles.expandIcon} />}
      >
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
};

/**
 * This is the primary Projects component, which renders as list of all projects.
 * These can be contained in an Accordion component, or as a standalone list item.
 */
export const Projects = ({ projects }: { projects: ProjectWithRefs[] }) => {
  const { skills } = useContext(DataContext);

  return projects.map((project) => {
    const projectSkills = project?.skills?.length
      ? skills.reduce<SkillWithDescriptionRaw[]>((acc, skill) => {
          const skillClone = { ...skill }; // Ensure we're not affecting the original properties.

          const skillIsInProject =
            skillClone?.title && project.skills.map((s) => s.skill._id).includes(skillClone._id);

          if (!skillIsInProject) return acc;

          // It's linked! Ensure we include the project-specific description.
          const matchedSkill = project.skills.find((s) => s.skill._id === skillClone._id);
          if (matchedSkill && matchedSkill?.projectSkillDescriptionRaw) {
            skillClone.descriptionRaw = matchedSkill.projectSkillDescriptionRaw;
          }

          acc.push(skillClone);

          return acc;
        }, [])
      : [];

    // If the project contains a block description, we'll
    // use an Accordion component to render it.
    if (project?.bodyRaw)
      return (
        <ProjectAccordion
          key={`project-${project._id}`}
          project={project}
          projectSkills={projectSkills}
        />
      );

    // Otherwise, show the project overview and skills only.
    return (
      <ProjectItem key={`project-${project._id}`} project={project} projectSkills={projectSkills} />
    );
  });
};
