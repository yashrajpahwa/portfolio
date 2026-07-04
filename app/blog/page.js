import Link from "next/link";
import { Rss } from "lucide-react";
import { getAllPosts, getAllTags } from "@/lib/blog";
import PostList from "@/components/blog/PostList";

export const metadata = {
  title: "Blog",
  description: "Writing by Yashraj Singh Pahwa.",
  alternates: { canonical: "/blog" },
};

export default async function Blog({ searchParams }) {
  const { tag } = await searchParams;
  const tags = getAllTags();
  const activeTag = tags.includes(tag) ? tag : null;

  const posts = getAllPosts().filter(
    (post) => !activeTag || (post.tags ?? []).includes(activeTag)
  );

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-14">
      <div className="flex items-baseline justify-between mb-6">
        <h1 className="text-xl font-medium tracking-tight">Blog</h1>
        <a
          href="/feed.xml"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors duration-150 ease-out hover:text-accent"
        >
          <Rss size={12} strokeWidth={1.5} /> rss
        </a>
      </div>

      {tags.length > 0 && (
        <nav
          aria-label="Filter by tag"
          className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs mb-8"
        >
          <Link
            href="/blog"
            className={`transition-colors duration-150 ease-out ${
              activeTag ? "text-muted hover:text-accent" : "text-accent"
            }`}
          >
            all
          </Link>
          {tags.map((t) => (
            <Link
              key={t}
              href={`/blog?tag=${encodeURIComponent(t)}`}
              className={`transition-colors duration-150 ease-out ${
                activeTag === t ? "text-accent" : "text-muted hover:text-accent"
              }`}
            >
              {t}
            </Link>
          ))}
        </nav>
      )}

      <PostList posts={posts} />
    </div>
  );
}
