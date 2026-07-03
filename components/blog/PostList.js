import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function PostList({ posts }) {
  return (
    <div className="divide-y divide-border border-t border-border">
      {posts.map((post) =>
        post.hosted ? (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group py-5 flex flex-col gap-1"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-muted">{formatDate(post.date)}</span>
                <span className="text-text transition-colors duration-150 ease-out group-hover:text-accent">
                  {post.title}
                </span>
              </div>
              <span className="font-mono text-xs text-muted whitespace-nowrap">{post.readingTime}</span>
            </div>
            <p className="text-muted text-sm max-w-[55ch]">{post.excerpt}</p>
          </Link>
        ) : (
          <a
            key={post.slug}
            href={post.mediumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group py-5 flex flex-col gap-1"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-muted">{formatDate(post.date)}</span>
                <span className="text-text transition-colors duration-150 ease-out group-hover:text-accent">
                  {post.title}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 font-mono text-xs text-muted whitespace-nowrap transition-colors duration-150 ease-out group-hover:text-accent">
                <ArrowUpRight size={12} strokeWidth={1.5} /> Medium
              </span>
            </div>
            <p className="text-muted text-sm max-w-[55ch]">{post.excerpt}</p>
          </a>
        )
      )}
    </div>
  );
}
