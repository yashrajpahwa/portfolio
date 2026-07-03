import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Mail } from "lucide-react";

const socials = [
  { href: "https://github.com/yashrajpahwa", label: "GitHub", icon: FaGithub },
  {
    href: "https://linkedin.com/in/yashrajpahwa",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
  {
    href: "https://twitter.com/yashrajpahwa",
    label: "Twitter",
    icon: FaXTwitter,
  },
  { href: "mailto:pahwayashraj@gmail.com", label: "Email", icon: Mail },
];

export default function Home() {
  return (
    <div className="h-[calc(100dvh-3.5rem)] max-w-3xl mx-auto px-6 md:px-8 flex flex-col justify-center gap-8 overflow-hidden">
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          Yashraj Singh Pahwa
        </h1>
        <p className="text-muted text-base md:text-lg">
          Building systems. Thinking deeply.
        </p>
      </div>

      <p className="font-mono text-xs text-muted">
        B.Eng. @ Thapar Institute of Engineering & Technology &middot; New Delhi
      </p>

      <div className="flex items-center gap-1 -ml-2">
        {socials.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={label}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors duration-150 ease-out hover:bg-accent hover:text-bg"
          >
            <Icon size={16} />
          </a>
        ))}
      </div>

      <div className="border-t border-border pt-6 space-y-3">
        <p className="font-mono text-xs text-accent">currently</p>
        <p className="text-muted leading-relaxed max-w-[58ch] text-sm">
          Studying Electronics &amp; Computer Engineering at Thapar Institute of
          Engineering & Technology, working on agentic AI systems and backend
          infrastructure, and writing about what I learn along the way.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs pt-1">
          <Link
            href="/about"
            className="text-muted transition-colors duration-150 ease-out hover:text-accent"
          >
            about →
          </Link>
          <Link
            href="/projects"
            className="text-muted transition-colors duration-150 ease-out hover:text-accent"
          >
            projects →
          </Link>
          <Link
            href="/blog"
            className="text-muted transition-colors duration-150 ease-out hover:text-accent"
          >
            blog →
          </Link>
        </div>
      </div>
    </div>
  );
}
