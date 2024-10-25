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

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

// Function to generate image URLs
function urlFor(source: string) {
  return builder.image(source);
}

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

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: CustomImage, // Map "image" type to your custom component
  },
  marks: {
    link: CustomLink,
  },
};

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
    ) : (
      <ProjectItem key={`project-${project._id}`} project={project} projectSkills={projectSkills} />
    );
  });
};
