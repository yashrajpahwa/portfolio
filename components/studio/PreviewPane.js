"use client";

import { useEffect, useRef, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import CodeBlock from "@/components/blog/CodeBlock";
import { formatDate } from "@/lib/utils";

const components = { pre: CodeBlock };

export default function PreviewPane({ title, date, readingTimeText, content }) {
  const [source, setSource] = useState(null);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      const requestId = ++requestIdRef.current;
      try {
        const res = await fetch("/api/studio/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });
        const data = await res.json();
        if (requestId !== requestIdRef.current) return; // a newer request superseded this one
        if (!res.ok) throw new Error(data.error || "Preview failed.");
        setSource(data.mdxSource);
        setError(null);
      } catch (err) {
        if (requestId !== requestIdRef.current) return;
        setError(err.message);
      }
    }, 400);
    return () => clearTimeout(timerRef.current);
  }, [content]);

  return (
    <div className="border border-border rounded-md px-5 py-5 overflow-y-auto max-h-[calc(30rem+2.4rem)]">
      {title && (
        <>
          <h1 className="text-2xl font-medium tracking-tight">{title}</h1>
          <p className="font-mono text-xs text-muted mt-2">
            {date ? formatDate(date) : ""}
            {readingTimeText ? ` · ${readingTimeText}` : ""}
          </p>
          <div className="border-t border-border mt-4 mb-6" />
        </>
      )}

      {error && (
        <p className="font-mono text-xs text-red-400 mb-4 whitespace-pre-wrap">{error}</p>
      )}

      {source ? (
        <div className="prose-blog max-w-[65ch]">
          <MDXRemote {...source} components={components} />
        </div>
      ) : (
        !error && <p className="text-muted text-sm">Start writing to see the preview.</p>
      )}
    </div>
  );
}
