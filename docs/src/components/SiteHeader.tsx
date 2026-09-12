import { useEffect, useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { DISCORD_URL, REPO_URL, WEBSITE_URL, routeForPath } from "../routes";

const NAV = [
  { label: "Docs", href: "/docs/" },
  { label: "Examples", href: "/examples/" },
  { label: "Roadmap", href: "/docs/roadmap/" },
  { label: "About", href: "/about/" },
];

function currentKey(): string {
  const hit = routeForPath(location.pathname);
  if (hit === "404") return "";
  if (hit.id === "docs-portal" || hit.section !== null) return "/docs/";
  if (hit.id === "examples") return "/examples/";
  if (hit.id === "about") return "/about/";
  return "";
}

/** 56px sticky blur navbar (SPEC §5.1). */
export default function SiteHeader({ onSearch }: { onSearch: () => void }) {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setActive(currentKey());
  }, []);

  return (
    <header className="site-header">
      <a href="/" className="brand shrink-0">
        <img
          src="/favicon.png"
          alt=""
          width={24}
          height={24}
          className="drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
        />
        APICordon<span className="brand-dot">.</span>
      </a>

      <nav className="nav-links ml-2 hidden md:flex" aria-label="Primary">
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className={`nav-link${active === n.href ? " active" : ""}`}
          >
            {n.label}
          </a>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-4">
        <button
          onClick={onSearch}
          className="hidden sm:flex items-center gap-2 rounded-lg border border-line-light bg-white/[0.03] px-3 py-1.5 text-xs text-muted transition-colors hover:border-brand-violet/50 hover:text-text"
          aria-label="Search documentation"
        >
          <Search size={13} />
          <span className="hidden lg:inline">Search</span>
          <kbd className="rounded border border-line-light px-1.5 py-0.5 font-mono text-[10px]">
            ⌘K
          </kbd>
        </button>
        <a
          href={WEBSITE_URL}
          target="_blank"
          rel="noopener"
          className="hdr-link hidden sm:inline"
        >
          Website
        </a>
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener"
          className="hdr-link hidden sm:inline"
        >
          Discord
        </a>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener"
          className="hdr-link"
          aria-label="APICordon on GitHub"
        >
          GitHub
        </a>
        <button
          className="text-muted md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-line-light bg-[#0b0d14]/98 px-4 py-3 backdrop-blur-xl md:hidden"
        >
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`nav-link${active === n.href ? " active" : ""}`}
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
