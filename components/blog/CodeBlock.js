"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeBlock(props) {
  const preRef = useRef(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = preRef.current?.textContent;
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="group relative">
      <pre ref={preRef} {...props} />
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute top-2.5 right-2.5 p-1.5 rounded text-muted opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 focus-visible:opacity-100 hover:text-text"
      >
        {copied ? (
          <Check size={14} strokeWidth={1.5} className="text-accent" />
        ) : (
          <Copy size={14} strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}
