import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { NextResponse } from "next/server";

// Must stay in sync with the pipeline in app/blog/[slug]/page.js so the
// preview is pixel-faithful to the published post.
const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    [rehypePrettyCode, { theme: { dark: "github-dark", light: "github-light" } }],
  ],
};

export async function POST(request) {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not found", { status: 404 });
  }

  const { content } = await request.json();

  try {
    const mdxSource = await serialize(content || "", { mdxOptions });
    return NextResponse.json({ mdxSource });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
