"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors duration-150 ease-out hover:text-accent focus-visible:text-accent"
    >
      <span className="absolute inset-0 scale-75 rounded-full border border-accent-dim opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100" />
      {/* Both icons render; the html theme class decides which is visible,
          so no mounted-state check or hydration placeholder is needed. */}
      <Sun
        size={15}
        strokeWidth={1.5}
        className="relative transition-transform duration-500 ease-out group-hover:rotate-90 [.light_&]:hidden"
      />
      <Moon
        size={15}
        strokeWidth={1.5}
        className="relative hidden transition-transform duration-300 ease-out group-hover:-rotate-[20deg] [.light_&]:inline"
      />
    </button>
  );
}
