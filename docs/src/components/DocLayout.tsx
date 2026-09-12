import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  DOCS_ROUTES,
  neighbors,
  routeById,
  type Route,
} from "../routes";

/** Collapsible sidebar group; open by default (hydration-safe). */
function SideGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="side-group mb-2 flex w-full cursor-pointer items-center justify-between text-left"
      >
        {label}
        <ChevronDown
          size={12}
          aria-hidden
          className={`transition-transform${open ? "" : " -rotate-90"}`}
        />
      </button>
      {open && children}
    </div>
  );
}

/**
 * Three-rail docs reader (SPEC §4/§6): grouped sidebar (240px) · article
 * (≤1152px / max-w-6xl) · right TOC with violet active bar, plus prev/next pagination.
 * TOC highlighting uses scroll position (heading anchors are static ids).
 */
export default function DocLayout({
  route,
  children,
}: {
  route: Route;
  children: React.ReactNode;
}) {
  const { prev, next } = neighbors(route.id);
  const [activeHeading, setActiveHeading] = useState<string>(
    route.toc[0]?.id ?? "",
  );

  useEffect(() => {
    setActiveHeading(route.toc[0]?.id ?? "");
    if (route.toc.length === 0) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        let current = route.toc[0]?.id ?? "";
        for (const h of route.toc) {
          const el = document.getElementById(h.id);
          if (el && el.getBoundingClientRect().top < 120) current = h.id;
        }
        setActiveHeading(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [route]);

  const groups = [...new Set(DOCS_ROUTES.map((r) => r.section as string))];

  return (
    <div
      className="layout-docs mx-auto grid w-full max-w-[1400px] gap-10 px-7 pb-20 pt-9"
      style={{ gridTemplateColumns: "240px minmax(0,1fr)" }}
    >
      {/* ------------------------------------------------------ sidebar */}
      <aside className="layout-side">
        <nav
          aria-label="Documentation"
          className="sticky top-[80px] max-h-[calc(100vh-104px)] overflow-y-auto border-r border-line-light/60 pr-4"
        >
          {groups.map((g) => (
            <SideGroup key={g} label={g}>
              {DOCS_ROUTES.filter((r) => r.section === g).map((r) => (
                <a
                  key={r.id}
                  href={r.path}
                  className={`side-link${r.id === route.id ? " active" : ""}`}
                  aria-current={r.id === route.id ? "page" : undefined}
                >
                  {r.title.replace(" & FAQ", "")}
                </a>
              ))}
            </SideGroup>
          ))}
          <SideGroup label="Project">
            <a className="side-link" href="/examples/">
              Examples
            </a>
            <a className="side-link" href="/about/">
              About
            </a>
            <a
              className="side-link"
              href="https://github.com/PotenFYR-Studios/APICordon"
              target="_blank"
              rel="noopener"
            >
              Repository ↗
            </a>
          </SideGroup>
        </nav>
      </aside>

      {/* ------------------------------------------------------- article */}
      <main className="min-w-0 max-w-6xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-3 flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-faint"
        >
          <a href="/docs/" className="transition-colors hover:text-[#c4b5fd]">
            Docs
          </a>
          <span aria-hidden>/</span>
          <span>{route.section}</span>
          <span aria-hidden>/</span>
          <span className="text-text">{route.title.replace(" & FAQ", "")}</span>
        </nav>
        <article className="doc-content">{children}</article>

        {(prev || next) && (
          <nav
            aria-label="Pagination"
            className="mt-12 flex justify-between gap-4"
          >
            {prev ? (
              <a
                href={prev.path}
                className="flex-1 rounded-xl border border-line-light bg-white/[0.02] p-4 transition-all hover:-translate-y-0.5 hover:border-brand-violet/50"
              >
                <div className="mono-label mb-1 flex items-center gap-1">
                  <ChevronLeft size={12} /> Previous
                </div>
                <div className="text-sm text-text transition-colors hover:text-[#c4b5fd]">
                  {prev.title.replace(" & FAQ", "")}
                </div>
              </a>
            ) : (
              <span className="flex-1" />
            )}
            {next && (
              <a
                href={next.path}
                className="flex-1 rounded-xl border border-line-light bg-white/[0.02] p-4 text-right transition-all hover:-translate-y-0.5 hover:border-brand-pink/50"
              >
                <div className="mono-label mb-1 flex items-center justify-end gap-1">
                  Next <ChevronRight size={12} />
                </div>
                <div className="text-sm text-text transition-colors hover:text-[#f9a8d4]">
                  {next.title.replace(" & FAQ", "")}
                </div>
              </a>
            )}
          </nav>
        )}
      </main>

      {/* ----------------------------------------------------------- toc */}
      {route.toc.length > 0 && (
        <aside className="layout-toc w-[220px]">
          <nav
            aria-label="On this page"
            className="sticky top-[84px] max-h-[calc(100vh-140px)] overflow-y-auto"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="grad-text font-mono text-[0.68em] font-bold uppercase tracking-[0.14em]">
                On this page
              </span>
              <span className="rounded-full border border-line-light px-1.5 py-px font-mono text-[9.5px] text-faint">
                {route.toc.length}
              </span>
            </div>
            {route.toc.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                className={`toc-link${h.level === 3 ? " lv3" : ""}${
                  activeHeading === h.id ? " active" : ""
                }`}
                aria-current={activeHeading === h.id ? "true" : undefined}
              >
                {h.text}
              </a>
            ))}
          </nav>
        </aside>
      )}
    </div>
  );
}

export { routeById };
