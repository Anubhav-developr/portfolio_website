import { Github, Linkedin, Mail } from "lucide-react";
import { identity, navItems } from "@/constants/portfolio";

const socialLinks = [
  { label: "Email", href: `mailto:${identity.email}`, icon: Mail, external: false },
  { label: "GitHub", href: identity.github, icon: Github, external: true },
  { label: "LinkedIn", href: identity.linkedin, icon: Linkedin, external: true }
];

export function Footer() {
  return (
    <footer className="border-t border-ivory/10 py-10">
      <div className="section-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-2xl font-black text-ivory">{identity.name}</p>
          <p className="mt-2 text-sm text-ivory/52">{identity.tagline}</p>
          <a
            href={identity.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-teal/70 transition hover:text-teal"
          >
            {identity.website.replace("https://", "")}
          </a>
        </div>

        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border border-ivory/10 px-4 py-2 text-sm text-ivory/56 transition hover:border-teal/50 hover:text-ivory"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex gap-2">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="grid h-11 w-11 place-items-center rounded-full border border-ivory/10 text-ivory/56 transition hover:border-citron/50 hover:text-citron"
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
