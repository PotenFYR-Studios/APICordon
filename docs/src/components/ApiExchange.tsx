import { clsx } from "clsx";

/**
 * API request / response exchange block, APICordon-specific: a paired
 * HTTP exchange rendered like a transcript, method chip tinted by verb.
 */

const VERB_COLOR: Record<string, string> = {
  GET: "text-brand-cyan border-brand-cyan/40 bg-brand-cyan/10",
  POST: "text-brand-emerald border-brand-emerald/40 bg-brand-emerald/10",
  PUT: "text-amber-400 border-amber-500/40 bg-amber-500/10",
  PATCH: "text-amber-400 border-amber-500/40 bg-amber-500/10",
  DELETE: "text-brand-pink border-brand-pink/40 bg-brand-pink/10",
};

export function MethodChip({ verb }: { verb: string }) {
  return (
    <span
      className={clsx(
        "inline-block rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold",
        VERB_COLOR[verb] ?? "text-muted border-line-light bg-white/5",
      )}
    >
      {verb}
    </span>
  );
}

export default function ApiExchange({
  method,
  path,
  request,
  response,
  status,
  statusNote,
  note,
}: {
  method: string;
  path: string;
  request: string;
  response: string;
  status: string;
  statusNote?: string;
  /** callout line under the transcript (why APICordon flags this) */
  note?: string;
}) {
  return (
    <figure className="my-5 not-prose">
      <div className="overflow-hidden rounded-[14px] border border-line bg-panel shadow-[var(--shadow)]">
        <div className="flex flex-wrap items-center gap-2 border-b border-line-light bg-panel-elevated px-4 py-2.5">
          <MethodChip verb={method} />
          <code className="font-mono text-[0.8em] text-text">{path}</code>
          <span className="ml-auto flex items-center gap-2 font-mono text-[11px]">
            <span
              className={clsx(
                "rounded-md px-2 py-0.5 font-semibold",
                status.startsWith("2")
                  ? "bg-brand-emerald/12 text-[#34d399]"
                  : "bg-brand-pink/12 text-brand-pink",
              )}
            >
              {status}
            </span>
            {statusNote && <span className="text-faint">{statusNote}</span>}
          </span>
        </div>
        <div className="grid md:grid-cols-2 md:divide-x md:divide-[var(--line-light)]">
          <div className="min-w-0 border-b border-line-light p-4 md:border-b-0">
            <div className="mono-label mb-2">Request</div>
            <pre className="overflow-x-auto font-mono text-[0.78em] leading-[1.6] text-[#dfe2ef]">
              {request}
            </pre>
          </div>
          <div className="min-w-0 p-4">
            <div className="mono-label mb-2">Response</div>
            <pre className="overflow-x-auto font-mono text-[0.78em] leading-[1.6] text-[#dfe2ef]">
              {response}
            </pre>
          </div>
        </div>
      </div>
      {note && (
        <figcaption className="mt-2 flex items-start gap-2 text-[0.8em] text-muted">
          <span className="mt-[7px] h-px w-4 shrink-0 bg-brand-cyan/60" aria-hidden />
          {note}
        </figcaption>
      )}
    </figure>
  );
}
