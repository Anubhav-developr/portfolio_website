import { Github, Linkedin, Mail } from "lucide-react";
import { identity, navItems } from "@/constants/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-ivory/10 py-10">
      <div className="section-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-2xl font-black text-ivory">{identity.name}</p>
          <p className="mt-2 text-sm text-ivory/52">{identity.tagline}</p>
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
          {[
            { label: "Email", href: `mailto:${identity.email}`, icon: Mail },
            { label: "GitHub", href: "#contact", icon: Github },
            { label: "LinkedIn", href: "#contact", icon: Linkedin }
          ].map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
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
