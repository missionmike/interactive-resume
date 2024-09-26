import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { Posts } from "@/components/Posts";
import { sanityFetch } from "@/sanity/lib/client";

export default async function Page() {
  const posts = await sanityFetch({
    query: PROJECTS_QUERY,
  });

  return <Posts posts={posts} />;
}
