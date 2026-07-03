import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { NextResponse } from "next/server";

export async function POST(request) {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not found", { status: 404 });
  }

  const { content } = await request.json();

  try {
    const mdxSource = await serialize(content || "", {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
      },
    });
    return NextResponse.json({ mdxSource });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
