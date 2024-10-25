import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import {
  PortableText,
  PortableTextMarkComponentProps,
  PortableTextReactComponents,
} from "next-sanity";

import { DataContext } from "@/context/DataContext";
import Image from "next/image";
import Link from "next/link";
import { ProjectWithRefs } from "@/graphql/getPositions";
import { SkillItem } from "@/components/sections/Skills/SkillItem";
import { SkillWithDescriptionRaw } from "@/graphql/getSkills";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import styles from "./Projects.module.scss";
import { useContext } from "react";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
});

// Re-used builder instance.
const builder = imageUrlBuilder(sanityClient);

/**
 * Generates image URLs from the Sanity CDN.
 */
const urlFor = (source: string) => builder.image(source);

/**
 * We're using the Next.js <Image /> component to serve the image
 * block from Sanity.
 */
const CustomImage = ({ value }: { value: { alt: string; asset: string } }) => {
  const imageUrl = urlFor(value.asset).url();
  return (
    <Image
      src={imageUrl}
      alt={value.alt || "Image"}
      width={1200}
      height={500}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
};

/**
 * We're using the Next.js <Link /> component to serve links from Sanity.
 * This way, we can optionally add the target and rel attributes.
 */
const CustomLink = ({ children, value }: PortableTextMarkComponentProps) => {
  const target = value?.href?.startsWith("http") ? "_blank" : undefined;

  return (
    <Link
      href={value?.href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
};

/**
 * The components value is used to serve custom component responses
 * based on the values in the Sanity block.
 */
const components: Partial<PortableTextReactComponents> = {
  types: {
    image: CustomImage, // Map "image" type to your custom component
  },
  marks: {
    link: CustomLink,
  },
};

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
            <PortableText value={project.bodyRaw} components={components} />
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
