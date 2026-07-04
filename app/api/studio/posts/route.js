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
  const { slug, previousSlug, overwrite, title, date, excerpt, tags, hosted, mediumUrl, content } =
    body;

  if (!slug || !SLUG_RE.test(slug)) {
    return NextResponse.json(
      { error: "Slug must contain only lowercase letters, numbers, and hyphens." },
      { status: 400 }
    );
  }
  if (!title || !date) {
    return NextResponse.json({ error: "Title and date are required." }, { status: 400 });
  }

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const isRename = previousSlug && SLUG_RE.test(previousSlug) && previousSlug !== slug;

  // Refuse to silently clobber an existing post the client isn't editing.
  if (slug !== previousSlug && fs.existsSync(filePath) && !overwrite) {
    return NextResponse.json(
      { error: `${slug}.mdx already exists.`, code: "EXISTS" },
      { status: 409 }
    );
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
  fs.writeFileSync(filePath, file, "utf-8");

  if (isRename) {
    const oldPath = path.join(BLOG_DIR, `${previousSlug}.mdx`);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  return NextResponse.json({ ok: true, slug, renamedFrom: isRename ? previousSlug : undefined });
}
