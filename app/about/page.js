export const metadata = {
  title: "About",
  description: "About Yashraj Singh Pahwa.",
};

const socials = [
  { href: "https://github.com/yashrajpahwa", label: "GitHub" },
  { href: "https://linkedin.com/in/yashrajpahwa", label: "LinkedIn" },
  { href: "https://twitter.com/yashrajpahwa", label: "Twitter" },
  { href: "mailto:pahwayashraj@gmail.com", label: "Email" },
];

const skills = {
  Languages: ["JavaScript", "TypeScript", "Python", "C"],
  "Backend & Infra": ["Node.js", "AWS", "Google Cloud", "Serverless", "OAuth"],
  "AI & Systems": ["Agentic RAG", "LLM tooling", "Kernel drivers"],
  Tools: ["Git", "CI/CD", "Docker", "Linux"],
};

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-8 py-14">
      <header className="space-y-1.5">
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight">
          Yashraj Singh Pahwa
        </h1>
        <p className="text-muted">
          B.Eng. Electronics &amp; Computer Engineering
        </p>
        <p className="font-mono text-xs text-muted">
          Thapar Institute of Engineering & Technology, Patiala &middot; 2028
        </p>
      </header>

      <div className="mt-10 pt-10 border-t border-border grid md:grid-cols-[110px_1fr] gap-6 md:gap-12">
        <aside className="md:sticky md:top-20 md:self-start md:border-r md:border-accent-dim/40 md:pr-6">
          <div className="flex flex-wrap md:flex-col gap-x-5 gap-y-2 font-mono text-xs">
            {socials.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="text-muted transition-colors duration-150 ease-out hover:text-accent w-fit"
              >
                {label}
              </a>
            ))}
          </div>
        </aside>

        <div className="space-y-6 text-justify [hyphens:auto]">
          <p className="text-muted leading-relaxed">
            I'm an Electronics &amp; Computer Engineering student at Thapar
            Institute of Engineering &amp; Technology, Patiala, with a focus on
            the systems layer of software — how things run, scale, and stay
            correct once real users touch them. I care about AI systems and the
            infrastructure that makes them reliable, and about open source as a
            way of learning in public.
          </p>

          <p className="text-muted leading-relaxed">
            I interned at Redington, where I worked on an agentic RAG pipeline
            and shipped infrastructure on AWS. I also built the Thapar Institute
            of Engineering & Technology Placement Portal, a serverless
            application with OAuth-based authentication running on Google Cloud,
            used by students and recruiters during placement season.
          </p>

          <p className="text-muted leading-relaxed">
            Before Thapar Institute of Engineering & Technology, I studied at
            Bluebells School. Since then I've spent time on independent projects
            — from kernel-level video drivers to competitive AI challenges —
            because building something end to end teaches you more than any
            course does.
          </p>

          <p className="text-muted leading-relaxed">
            I write occasionally about what I'm learning — mostly backend
            engineering, authentication, and AI tooling. You can find those
            posts on the{" "}
            <a
              href="/blog"
              className="text-accent underline underline-offset-4 decoration-accent-dim transition-colors duration-150 ease-out hover:decoration-accent"
            >
              blog
            </a>
            .
          </p>

          <p className="text-muted leading-relaxed">
            I contribute to open source when I can —{" "}
            <span className="text-text">easyauth</span>, an authentication
            microservice, and <span className="text-text">Conceptometry</span>,
            an open-source LMS, are two projects I actively maintain.
          </p>

          <div className="pt-6 border-t border-border space-y-4 text-left">
            <p className="font-mono text-xs text-accent">skills</p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <p className="font-mono text-xs text-muted mb-1">
                    {category}
                  </p>
                  <p className="text-text">{items.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
