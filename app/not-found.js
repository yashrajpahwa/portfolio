import Link from "next/link";

export const metadata = {
  title: "404 — Page not found",
};

const links = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/blog", label: "blog" },
];

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-14 flex flex-col gap-10">
      <div className="space-y-4">
        <p className="font-mono text-[6rem] md:text-[8rem] leading-none text-border select-none">
          404
        </p>
        <div className="space-y-1.5">
          <h1 className="text-xl font-medium tracking-tight">Page not found</h1>
          <p className="text-muted max-w-[45ch]">
            This page doesn&apos;t exist or has been moved. Try one of these instead.
          </p>
        </div>
      </div>

      <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs border-t border-border pt-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-muted transition-colors duration-150 ease-out hover:text-accent"
          >
            {label} →
          </Link>
        ))}
      </nav>
    </div>
  );
}
