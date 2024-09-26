import { POSTS_QUERYResult } from "../../sanity.types";

export function Posts({ posts }: { posts: POSTS_QUERYResult }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <a href={`/posts/${post?.slug?.current}`}>{post?.title}</a>
        </li>
      ))}
    </ul>
  );
}
