import { defineQuery } from "next-sanity";

export const PROJECTS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)][0...12]{
  _id, title, slug
}`);

export const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  title, body, mainImage
}`);
