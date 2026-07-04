import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export const BLOG_DIR = path.join(process.cwd(), "content", "blog");

const SLUG_RE = /^[a-z0-9-]+$/;

let cache = null;

function readAllPosts() {
  if (cache && process.env.NODE_ENV === "production") return cache;

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));

  cache = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data, content } = matter(raw);

      return {
        slug,
        ...data,
        content,
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return cache;
}

export function getAllPosts() {
  return readAllPosts().map(({ content, ...post }) => ({
    ...post,
    readingTime: post.hosted ? post.readingTime : null,
  }));
}

export function getPostBySlug(slug) {
  if (!SLUG_RE.test(slug)) return null;
  return readAllPosts().find((post) => post.slug === slug && post.hosted) ?? null;
}

export function getHostedSlugs() {
  return readAllPosts()
    .filter((post) => post.hosted)
    .map((post) => post.slug);
}

export function getAllTags() {
  const tags = new Set();
  for (const post of readAllPosts()) {
    for (const tag of post.tags ?? []) tags.add(tag);
  }
  return [...tags].sort();
}

/** Previous = older, next = newer, among hosted posts only. */
export function getAdjacentPosts(slug) {
  const hosted = readAllPosts().filter((post) => post.hosted);
  const index = hosted.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: null, next: null };

  const pick = (post) =>
    post ? { slug: post.slug, title: post.title } : null;

  return {
    previous: pick(hosted[index + 1]),
    next: pick(hosted[index - 1]),
  };
}
