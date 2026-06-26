"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/constants/portfolio";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-5">
      <nav
        aria-label="Primary navigation"
        className={cn(
          "mx-auto flex w-full max-w-[1180px] items-center justify-between rounded-full border px-4 py-3 transition",
          elevated
            ? "border-ivory/14 bg-ink-950/78 shadow-velvet backdrop-blur-2xl"
            : "border-white/8 bg-white/[0.035] backdrop-blur-xl"
        )}
      >
        <a href="#top" className="group inline-flex items-center gap-3" aria-label="Anubhav Mishra home">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ivory text-sm font-black text-ink-950">
            AM
          </span>
          <span className="hidden text-sm font-semibold text-ivory/88 sm:inline">
            Anubhav Mishra
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-ivory/64 transition hover:bg-white/[0.055] hover:text-ivory"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded-full bg-white/[0.06] px-4 py-2 text-sm font-semibold text-ivory ring-1 ring-ivory/12 transition hover:bg-citron hover:text-ink-950 lg:inline-flex"
        >
          Start a build
        </a>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-ivory/12 bg-white/[0.04] text-ivory md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="mx-auto mt-3 w-full max-w-[1180px] rounded-3xl border border-ivory/12 bg-ink-950/92 p-3 shadow-velvet backdrop-blur-2xl md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-2xl px-4 py-3 text-base text-ivory/78 hover:bg-white/[0.055] hover:text-ivory"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
