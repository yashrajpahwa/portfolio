import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Mail, FileText } from "lucide-react";

const socials = [
  { href: "https://github.com/yashrajpahwa", label: "GitHub", icon: FaGithub },
  { href: "https://linkedin.com/in/yashrajpahwa", label: "LinkedIn", icon: FaLinkedin },
  { href: "https://twitter.com/yashrajpahwa", label: "Twitter", icon: FaXTwitter },
  { href: "mailto:pahwayashraj@gmail.com", label: "Email", icon: Mail },
];

const iconLinkClass =
  "inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors duration-150 ease-out hover:bg-accent hover:text-bg";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-muted font-mono text-xs">
          © {new Date().getFullYear()} Yashraj Singh Pahwa
        </p>
        <div className="flex items-center gap-1">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className={iconLinkClass}
            >
              <Icon size={15} />
            </a>
          ))}
          <a
            href="/Resume_Yashraj_Pahwa.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Resume"
            className={iconLinkClass}
          >
            <FileText size={15} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
