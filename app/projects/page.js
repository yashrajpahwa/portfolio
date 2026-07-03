import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects",
  description: "Projects by Yashraj Singh Pahwa.",
};

export default function Projects() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-14">
      <h1 className="text-xl font-medium tracking-tight mb-8">Projects</h1>

      <div className="divide-y divide-border border-t border-border">
        {projects.map((project) => (
          <div key={project.name} className="group py-5 flex flex-col gap-2 transition-colors duration-150 ease-out">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-muted">{project.year}</span>
                <span className="text-text transition-colors duration-150 ease-out group-hover:text-accent">
                  {project.name}
                </span>
              </div>
              <span className="font-mono text-xs text-muted whitespace-nowrap">{project.tag}</span>
            </div>

            <p className="text-muted text-sm max-w-[55ch]">{project.description}</p>

            {(project.href || project.demoHref) && (
              <div className="flex items-center gap-4 pt-1">
                {project.demoHref && (
                  <a
                    href={project.demoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-accent transition-opacity duration-150 ease-out hover:opacity-70"
                  >
                    live <ArrowUpRight size={12} strokeWidth={1.5} />
                  </a>
                )}
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors duration-150 ease-out hover:text-accent"
                  >
                    github ↗
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
