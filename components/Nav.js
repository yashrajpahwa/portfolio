"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/blog", label: "blog" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-saturate-150 supports-[backdrop-filter]:backdrop-blur-sm">
      <nav className="max-w-3xl mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-text transition-colors duration-150 ease-out hover:text-accent"
        >
          yashraj.
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group relative py-1 transition-colors duration-150 ease-out ${
                      active ? "text-accent" : "text-muted hover:text-text focus-visible:text-text"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute left-0 -bottom-px h-px bg-accent transition-transform duration-200 ease-out ${
                        active
                          ? "w-full scale-x-100"
                          : "w-full scale-x-0 origin-left group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
