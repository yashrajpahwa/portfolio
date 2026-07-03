import { getAllPosts } from "@/lib/blog";
import PostList from "@/components/blog/PostList";

export const metadata = {
  title: "Blog",
  description: "Writing by Yashraj Singh Pahwa.",
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-14">
      <h1 className="text-xl font-medium tracking-tight mb-8">Blog</h1>
      <PostList posts={posts} />
    </div>
  );
}
