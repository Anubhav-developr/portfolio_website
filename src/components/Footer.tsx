import { Code2, Github, Linkedin, Mail } from "lucide-react";
import { identity, navItems, socialLinks } from "@/constants/portfolio";

const iconMap = {
  Email: Mail,
  GitHub: Github,
  LinkedIn: Linkedin,
  CodeChef: Code2
};

export function Footer() {
  return (
    <footer className="border-t-[0.5px] border-[var(--border-dim)] bg-[var(--bg-void)] py-12 sm:py-16">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-[1fr_auto_1fr] md:items-start">
          <div>
            <a href="#top" className="inline-flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--text-primary)] text-sm font-black text-[var(--bg-void)]">
                AM
              </span>
              <span>
                <span className="block font-display text-xl font-bold text-[var(--text-primary)]">{identity.name}</span>
                <span className="text-small block">{identity.tagline}</span>
              </span>
            </a>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap justify-start gap-2 md:justify-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border-[0.5px] border-[var(--border-soft)] px-4 py-2 text-[12px] text-[var(--text-secondary)] transition hover:border-[var(--border-accent)] hover:text-[var(--text-primary)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-2 md:justify-end">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.label as keyof typeof iconMap] ?? Code2;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="grid h-9 w-9 place-items-center rounded-[10px] border-[0.5px] border-[var(--border-soft)] bg-[var(--bg-raised)] text-[var(--text-muted)] transition duration-[250ms] hover:-translate-y-1 hover:border-[var(--border-accent)] hover:text-[var(--accent-blue)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t-[0.5px] border-[var(--border-dim)] pt-6 text-small sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} Anubhav Mishra. All rights reserved.</p>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border-[0.5px] border-[rgba(52,211,153,0.2)] bg-[rgba(52,211,153,0.08)] px-3 py-1.5 text-[rgba(52,211,153,0.8)]">
            <span className="relative h-1.5 w-1.5 rounded-full bg-[rgba(52,211,153,0.8)]">
              <span className="node-ring border-[rgba(52,211,153,0.8)]" />
            </span>
            Open to work
          </span>
        </div>
      </div>
    </footer>
  );
}
