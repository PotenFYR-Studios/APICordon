import { useEffect, useMemo, useRef, useState } from "react";
import { ROUTES } from "../routes";

interface Hit {
  routeId: string;
  path: string;
  title: string;
  snippet: string;
  glyph: "§" | "→";
}

/**
 * ⌘K command palette (SPEC §5.12): searches page titles, blurbs and
 * per-page section indexes. Arrow keys navigate, Enter opens, Esc closes.
 */
export default function SearchPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const index = useMemo<Omit<Hit, "glyph" | "routeId">[]>(
    () =>
      ROUTES.flatMap((r) => {
        const rows: Omit<Hit, "glyph" | "routeId">[] = [
          {
            path: r.path,
            title: r.title,
            snippet: r.blurb || r.description,
          },
        ];
        for (const h of r.toc) {
          rows.push({
            path: `${r.path}#${h.id}`,
            title: h.text,
            snippet: `${r.title} · section`,
          });
        }
        return rows;
      }),
    [],
  );

  const hits = useMemo<Hit[]>(() => {
    const needle = q.trim().toLowerCase();
    const base: Hit[] = index.map((r, i) => ({
      ...r,
      routeId: String(i),
      glyph: r.path.includes("#") ? "§" : "→",
    }));
    if (!needle) return base.slice(0, 12);
    return base
      .filter(
        (h) =>
          h.title.toLowerCase().includes(needle) ||
          h.snippet.toLowerCase().includes(needle),
      )
      .slice(0, 14);
  }, [q, index]);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => input.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSel((s) => Math.min(s + 1, hits.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSel((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter" && hits[sel]) {
        location.href = hits[sel].path;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hits, sel, onClose]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-i="${sel}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 pt-28 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-[#101320] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search documentation"
      >
        <input
          ref={input}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setSel(0);
          }}
          placeholder="Search the docs…"
          className="w-full border-b border-line-light bg-transparent px-4 py-3.5 text-sm text-text outline-none placeholder:text-faint focus:shadow-none"
        />
        <div ref={listRef} className="max-h-80 overflow-y-auto p-1.5">
          {hits.length === 0 && (
            <div className="px-3 py-6 text-center text-[13px] text-faint">
              Nothing matches “{q}”.
            </div>
          )}
          {hits.map((h, i) => (
            <a
              key={h.path}
              href={h.path}
              data-i={i}
              onMouseEnter={() => setSel(i)}
              className={`flex items-baseline gap-2 rounded-lg px-3 py-2 text-[13px] ${
                i === sel ? "bg-brand-violet/15 text-white" : "text-text-2"
              }`}
            >
              <span className="font-mono text-[10px] text-faint">
                {h.glyph}
              </span>
              <span className="font-medium">{h.title}</span>
              <span className="ml-auto truncate pl-3 font-mono text-[10px] text-faint">
                {h.snippet}
              </span>
            </a>
          ))}
        </div>
        <div className="border-t border-line-light px-4 py-2 font-mono text-[10px] text-faint">
          ↑↓ navigate · Enter open · Esc close
        </div>
      </div>
    </div>
  );
}

/** Global hotkeys: ⌘/Ctrl+K toggles the palette, [ ] jump prev/next doc page. */
export function useSearchHotkeys(onOpen: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpen]);
}
