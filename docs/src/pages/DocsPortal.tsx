import {
  Rocket,
  Workflow,
  Boxes,
  ShieldCheck,
  Map,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";
import { DOCS_ROUTES, type Route } from "../routes";

const ICONS: Record<string, LucideIcon> = {
  "getting-started": Rocket,
  "how-it-works": Workflow,
  architecture: Boxes,
  security: ShieldCheck,
  roadmap: Map,
};

function PortalCard({ route }: { route: Route }) {
  const Icon = ICONS[route.id] ?? FlaskConical;
  return (
    <a href={route.path} className="doc-card">
      <span className="icon-tile">
        <Icon size={20} className="text-brand-violet" />
      </span>
      <div className="mt-1 text-[0.98em] font-semibold text-white">
        {route.title.replace(" & FAQ", "")}
      </div>
      <p className="text-[0.83em] leading-[1.55] text-muted">{route.blurb}</p>
    </a>
  );
}

/** /docs, hub page with a card grid of the doc pages (SPEC §6 hub layout). */
export default function DocsPortal() {
  return (
    <div className="dot-backdrop">
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16">
        <header className="mb-10">
          <nav
            aria-label="Breadcrumb"
            className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-faint"
          >
            APICordon Docs
          </nav>
          <h1 className="grad-text text-[clamp(2em,4.4vw,3em)] font-extrabold leading-[1.1] tracking-tight">
            Documentation
          </h1>
          <p className="mt-4 max-w-[680px] text-[1.02em] leading-relaxed text-muted">
            Everything about how APICordon works, how it is built, and how it
            behaves as a citizen of your repository. Press{" "}
            <kbd className="rounded border border-line-light bg-white/5 px-1.5 py-0.5 font-mono text-[11px] text-text-2">
              ⌘K
            </kbd>{" "}
            anywhere to search.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {DOCS_ROUTES.map((r) => (
            <PortalCard key={r.id} route={r} />
          ))}
          <a href="/examples/" className="doc-card">
            <span className="icon-tile">
              <FlaskConical size={20} className="text-brand-violet" />
            </span>
            <div className="mt-1 text-[0.98em] font-semibold text-white">
              Examples
            </div>
            <p className="text-[0.83em] leading-[1.55] text-muted">
              Illustrative findings and pull-request feedback, clearly labeled,
              not shipped output.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
