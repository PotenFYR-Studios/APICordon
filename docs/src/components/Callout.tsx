import { clsx } from "clsx";
import { AlertTriangle, Info, ShieldAlert } from "lucide-react";

type Tone = "info" | "warn" | "danger" | "cyan";

const STYLES: Record<Tone, { ring: string; icon: React.ReactNode }> = {
  info: {
    ring: "border-brand-violet/30 bg-brand-violet/[0.06]",
    icon: <Info size={16} className="mt-0.5 shrink-0 text-brand-violet" />,
  },
  cyan: {
    ring: "border-brand-cyan/30 bg-brand-cyan/[0.06]",
    icon: <Info size={16} className="mt-0.5 shrink-0 text-brand-cyan" />,
  },
  warn: {
    ring: "border-amber-500/30 bg-amber-500/[0.06]",
    icon: (
      <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-400" />
    ),
  },
  danger: {
    ring: "border-brand-pink/30 bg-brand-pink/[0.06]",
    icon: (
      <ShieldAlert size={16} className="mt-0.5 shrink-0 text-brand-pink" />
    ),
  },
};

/** Inline callout box for doc content. */
export default function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: Tone;
  title?: string;
  children: React.ReactNode;
}) {
  const s = STYLES[tone];
  return (
    <div className={clsx("my-4 flex gap-3 rounded-xl border p-4", s.ring)}>
      {s.icon}
      <div className="min-w-0 text-[0.92em] leading-relaxed text-text-2">
        {title && (
          <div className="mb-1 font-semibold text-white">{title}</div>
        )}
        {children}
      </div>
    </div>
  );
}
