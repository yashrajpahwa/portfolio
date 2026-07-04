import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { getAdjacentPosts, getHostedSlugs, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { site } from "@/lib/site";
import CodeBlock from "@/components/blog/CodeBlock";

export async function generateStaticParams() {
  return getHostedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `/blog/${slug}`,
    },
  };
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [
        rehypePrettyCode,
        { theme: { dark: "github-dark", light: "github-light" } },
      ],
    ],
  },
};

const mdxComponents = {
  pre: CodeBlock,
};

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = getAdjacentPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `${site.url}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: site.author.name,
      url: site.url,
    },
  };

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blog"
        className="inline-block font-mono text-xs text-muted transition-all duration-150 ease-out hover:text-accent hover:-translate-x-0.5"
      >
        ← Back to blog
      </Link>

      <article className="mt-8 max-w-[65ch]">
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight">{post.title}</h1>
        <p className="font-mono text-xs text-muted mt-3">
          <time dateTime={post.date}>{formatDate(post.date)}</time> &middot;{" "}
          {post.readingTime}
        </p>

        <div className="border-t border-border mt-6 mb-8" />

        <div className="prose-blog">
          <MDXRemote source={post.content} options={mdxOptions} components={mdxComponents} />
        </div>

        {(previous || next) && (
          <nav
            aria-label="Adjacent posts"
            className="mt-12 pt-6 border-t border-border flex justify-between gap-6 text-sm"
          >
            {previous ? (
              <Link
                href={`/blog/${previous.slug}`}
                className="group max-w-[45%] text-muted transition-colors duration-150 ease-out hover:text-accent"
              >
                <span className="font-mono text-xs block mb-1">← older</span>
                {previous.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group max-w-[45%] text-right text-muted transition-colors duration-150 ease-out hover:text-accent"
              >
                <span className="font-mono text-xs block mb-1">newer →</span>
                {next.title}
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </article>
    </div>
  );
}
