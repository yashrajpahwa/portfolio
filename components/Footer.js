import { FileText } from "lucide-react";
import IconLink from "@/components/IconLink";
import { socials } from "@/data/socials";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-muted font-mono text-xs">
          © {new Date().getFullYear()} Yashraj Singh Pahwa
        </p>
        <div className="flex items-center -mr-2">
          {socials.map(({ href, label, icon: Icon }) => (
            <IconLink
              key={label}
              href={href}
              label={label}
              icon={Icon}
              external={href.startsWith("http")}
            />
          ))}
          <IconLink
            href="/Resume_Yashraj_Pahwa.pdf"
            label="Resume"
            icon={FileText}
            strokeWidth={1.5}
          />
        </div>
      </div>
    </footer>
  );
}
