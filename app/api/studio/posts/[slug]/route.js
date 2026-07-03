import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { BLOG_DIR } from "@/lib/blog";

const SLUG_RE = /^[a-z0-9-]+$/;

export async function DELETE(request, { params }) {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not found", { status: 404 });
  }

  const { slug } = await params;
  if (!SLUG_RE.test(slug)) {
    return NextResponse.json({ error: "Invalid slug." }, { status: 400 });
  }

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  return NextResponse.json({ ok: true });
}
