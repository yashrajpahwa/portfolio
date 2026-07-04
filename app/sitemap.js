import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export default function sitemap() {
  const pages = ["", "/about", "/projects", "/blog"].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }));

  const posts = getAllPosts()
    .filter((post) => post.hosted)
    .map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    }));

  return [...pages, ...posts];
}
