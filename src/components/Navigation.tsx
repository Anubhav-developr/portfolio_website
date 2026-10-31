"use client";

import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { navItems } from "@/constants/portfolio";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [active, setActive] = useState(navItems[0]?.href ?? "#profile");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const nextTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  };

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
          "site-nav flex items-center justify-between rounded-full border-[0.5px] px-3 py-1.5 pl-4 shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-all duration-[400ms]",
          elevated ? "site-nav--elevated" : ""
        )}
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
          className="site-nav-cta hidden rounded-full px-[16px] py-2 text-[11px] font-semibold uppercase tracking-[0.04em] transition-all duration-200 hover:scale-[1.02] md:inline-flex"
        >
          Start a build
        </a>

        <button
          type="button"
          onClick={toggleTheme}
          className="theme-toggle ml-1 grid h-9 w-9 place-items-center rounded-full border-[0.5px] transition hover:-translate-y-px"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

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
        <div className="site-mobile-menu mt-3 rounded-3xl border-[0.5px] p-3 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:hidden">
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
