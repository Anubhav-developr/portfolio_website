"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/constants/portfolio";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [active, setActive] = useState(navItems[0]?.href ?? "#profile");

  useEffect(() => {
    const onScroll = () => {
      setElevated(window.scrollY > 60);

      const checkpoint = window.scrollY + window.innerHeight * 0.38;
      let nextActive = navItems[0]?.href ?? "#profile";

      navItems.forEach((item) => {
        const section = document.getElementById(item.href.replace("#", ""));
        if (section && section.offsetTop <= checkpoint) {
          nextActive = item.href;
        }
      });

      const reachedBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;

      if (reachedBottom) {
        nextActive = navItems[navItems.length - 1]?.href ?? nextActive;
      }

      setActive(nextActive);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed left-1/2 top-5 z-[100] w-[calc(100%-32px)] max-w-[780px] -translate-x-1/2">
      <nav
        aria-label="Primary navigation"
        className={cn(
          "flex items-center justify-between rounded-full border-[0.5px] px-5 py-1.5 pr-1.5 shadow-[0_0_0_0.5px_rgba(255,255,255,0.04)_inset,0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-[400ms]",
          elevated
            ? "border-white/10 bg-[rgba(10,13,18,0.82)] backdrop-blur-[32px]"
            : "border-white/[0.08] bg-[rgba(10,13,18,0.75)] backdrop-blur-[24px]"
        )}
        style={{ WebkitBackdropFilter: elevated ? "blur(32px) saturate(1.8)" : "blur(24px) saturate(1.8)" }}
      >
        <a
          href="#top"
          className="hidden items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-[var(--text-primary)] sm:inline-flex"
          aria-label="Anubhav Mishra home"
          onClick={() => setActive("#profile")}
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--text-primary)] text-[10px] font-black text-[var(--bg-void)]">
            AM
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActive(item.href)}
              className={cn(
                "relative rounded-full px-3 py-2 text-[12px] font-medium tracking-[0.01em] transition-colors duration-200",
                active === item.href ? "text-[var(--text-primary)]" : "text-white/[0.45] hover:text-white/[0.85]"
              )}
            >
              {item.label}
              {active === item.href ? (
                <span className="absolute bottom-1 left-1/2 h-0.5 w-0.5 -translate-x-1/2 rounded-full bg-[var(--accent-blue)]" />
              ) : null}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full bg-[rgba(99,136,255,0.9)] px-[18px] py-2 text-[11px] font-semibold uppercase tracking-[0.04em] text-white shadow-[0_0_20px_rgba(99,136,255,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(99,136,255,0.5)] md:inline-flex"
        >
          Start a build
        </a>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border-[0.5px] border-white/10 bg-white/[0.04] text-[var(--text-primary)] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {open ? (
        <div className="mt-3 rounded-3xl border-[0.5px] border-white/10 bg-[rgba(10,13,18,0.92)] p-3 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-2xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/[0.055] hover:text-white"
              onClick={() => {
                setActive(item.href);
                setOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
