import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";
import { BLOG_DIR } from "@/lib/blog";

const SLUG_RE = /^[a-z0-9-]+$/;

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not found", { status: 404 });
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    return { slug, ...data, content };
  });

  return NextResponse.json({ posts });
}

export async function POST(request) {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not found", { status: 404 });
  }

  const body = await request.json();
  const { slug, title, date, excerpt, tags, hosted, mediumUrl, content } = body;

  if (!slug || !SLUG_RE.test(slug)) {
    return NextResponse.json(
      { error: "Slug must contain only lowercase letters, numbers, and hyphens." },
      { status: 400 }
    );
  }
  if (!title || !date) {
    return NextResponse.json({ error: "Title and date are required." }, { status: 400 });
  }

  const frontmatter = {
    title,
    date,
    excerpt: excerpt || "",
    tags: Array.isArray(tags) ? tags : [],
    hosted: !!hosted,
    ...(hosted ? {} : { mediumUrl: mediumUrl || "" }),
  };

  const file = matter.stringify(content || "", frontmatter);
  fs.writeFileSync(path.join(BLOG_DIR, `${slug}.mdx`), file, "utf-8");

  return NextResponse.json({ ok: true, slug });
}
