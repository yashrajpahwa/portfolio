import { ogImage, OG_SIZE } from "@/lib/og";
import { getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { site } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Blog post";

export default async function Image({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return ogImage({ title: site.name, subtitle: site.description });
  }

  return ogImage({
    title: post.title,
    subtitle: `${formatDate(post.date)} · ${post.readingTime}`,
  });
}
