import {
  Radar,
  GitMerge,
  SearchCheck,
  MessageSquareDiff,
} from "lucide-react";
import { clsx } from "clsx";

/**
 * Finding → PR comment flow visualization, APICordon-specific.
 * Four stages connected by gradient hairlines; each stage is a compact
 * mono-labeled node with an icon tile and one-line caption.
 */

const STAGES = [
  {
    icon: Radar,
    key: "SIGNALS",
    title: "Signals in",
    text: "Source, contracts and security tooling are collected for the changed code.",
  },
  {
    icon: GitMerge,
    key: "CORRELATE",
    title: "Correlated",
    text: "Signals about the same endpoint merge into one finding, not five alerts.",
  },
  {
    icon: SearchCheck,
    key: "TRIAGE",
    title: "Triaged",
    text: "The finding carries its evidence: where it came from and why it matters.",
  },
  {
    icon: MessageSquareDiff,
    key: "PR COMMENT",
    title: "Delivered",
    text: "One precise pull-request comment lands where a developer can act on it.",
  },
];

export default function FindingFlow({ compact = false }: { compact?: boolean }) {
  return (
    <ol
      className={clsx(
        "not-prose my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
        compact && "my-4",
      )}
    >
      {STAGES.map((s, i) => (
        <li key={s.key} className="relative">
          {i < STAGES.length - 1 && (
            <span
              aria-hidden
              className="absolute right-[-14px] top-[38px] hidden h-px w-[22px] bg-gradient-to-r from-brand-violet/60 to-brand-pink/60 lg:block"
            />
          )}
          <div className="flex h-full flex-col gap-2 rounded-xl border border-line-light bg-white/[0.02] p-4">
            <div className="flex items-center gap-3">
              <span className="icon-tile !h-9 !w-9 !rounded-[10px]">
                <s.icon size={17} className="text-brand-violet" />
              </span>
              <span className="mono-label !text-[0.62em]">{s.key}</span>
            </div>
            <div className="text-[0.95em] font-semibold text-white">
              {s.title}
            </div>
            <div className="text-[0.8em] leading-relaxed text-muted">
              {s.text}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
