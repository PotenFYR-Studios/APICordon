import { MethodChip } from "./ApiExchange";

/**
 * Endpoint / spec card, APICordon-specific: presents a single API operation
 * the way a spec-driven tool sees it (method, path, contract source, notes).
 */
export default function SpecCard({
  method,
  path,
  summary,
  source,
  tags = [],
  flags = [],
}: {
  method: string;
  path: string;
  summary: string;
  /** where the endpoint was discovered, e.g. "OpenAPI 3.1 · petstore.yaml" */
  source: string;
  tags?: string[];
  /** small caveat/observation rows */
  flags?: { label: string; text: string }[];
}) {
  return (
    <div className="not-prose my-5 overflow-hidden rounded-[14px] border border-line bg-panel shadow-[var(--shadow)]">
      <div className="flex flex-wrap items-center gap-3 border-b border-line-light bg-panel-elevated px-4 py-3">
        <MethodChip verb={method} />
        <code className="font-mono text-[0.85em] text-text">{path}</code>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
          {source}
        </span>
      </div>
      <div className="px-4 py-3">
        <p className="text-[0.9em] text-text-2">{summary}</p>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        )}
        {flags.length > 0 && (
          <ul className="mt-3 space-y-1.5 border-t border-line-light pt-3">
            {flags.map((f) => (
              <li
                key={f.label}
                className="flex items-start gap-2 text-[0.82em] text-muted"
              >
                <span className="mt-[3px] shrink-0 rounded border border-brand-pink/30 bg-brand-pink/10 px-1.5 py-px font-mono text-[9.5px] font-semibold uppercase tracking-wider text-brand-pink">
                  {f.label}
                </span>
                <span>{f.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
