import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { getHostedSlugs, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return getHostedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post.title,
    description: post.excerpt,
  };
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
  },
};

export default async function BlogPost({ params }) {
  const { slug } = await params;

  if (!getHostedSlugs().includes(slug)) {
    notFound();
  }

  const post = getPostBySlug(slug);

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-14">
      <Link
        href="/blog"
        className="inline-block font-mono text-xs text-muted transition-all duration-150 ease-out hover:text-accent hover:-translate-x-0.5"
      >
        ← Back to blog
      </Link>

      <article className="mt-8 max-w-[65ch]">
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight">{post.title}</h1>
        <p className="font-mono text-xs text-muted mt-3">
          {formatDate(post.date)} &middot; {post.readingTime}
        </p>

        <div className="border-t border-border mt-6 mb-8" />

        <div className="prose-blog">
          <MDXRemote source={post.content} options={mdxOptions} />
        </div>
      </article>
    </div>
  );
}
