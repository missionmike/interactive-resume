import {
  PortableText,
  PortableTextMarkComponentProps,
  PortableTextReactComponents,
} from "next-sanity";

import Image from "next/image";
import Link from "next/link";
import { TypedObject } from "sanity";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import styles from "./PortableTextCustom.module.scss";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-10-01",
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
 * This is the primary Projects component, which renders as list of all projects.
 * These can be contained in an Accordion component, or as a standalone list item.
 */
export const PortableTextCustom = ({ value }: { value: TypedObject | TypedObject[] }) => (
  <div className={styles.portableTextCustom}>
    <PortableText value={value} components={components} />
  </div>
);
