"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className="inline-flex h-8 w-8" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors duration-150 ease-out hover:text-accent focus-visible:text-accent"
    >
      <span className="absolute inset-0 scale-75 rounded-full border border-accent-dim opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100" />
      {isDark ? (
        <Sun
          size={15}
          strokeWidth={1.5}
          className="relative transition-transform duration-500 ease-out group-hover:rotate-90"
        />
      ) : (
        <Moon
          size={15}
          strokeWidth={1.5}
          className="relative transition-transform duration-300 ease-out group-hover:-rotate-[20deg]"
        />
      )}
    </button>
  );
}
