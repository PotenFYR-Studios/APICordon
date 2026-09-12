/**
 * Local Magic UI components for the APICordon docs site.
 * Patterns follow PotenFYR design SPEC v1 (§5.13 dot pattern, §5.14 glow orbs,
 * §7 motion): dots/orbs/meteors/marquee live on the landing page only.
 */
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { clsx } from "clsx";

/** Magic UI · Number Ticker: counts up to `value` (rAF). */
export function NumberTicker({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      (document.hidden ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      prev.current = value;
      setDisplay(value);
      return;
    }
    const from = prev.current;
    const start = performance.now();
    const duration = 900;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
      else prev.current = value;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <span className={className} aria-label={String(value)}>
      {display}
    </span>
  );
}

/** Magic UI · Marquee: seamless infinite scroller (pauses on hover). */
export function Marquee({
  children,
  reverse = false,
  pause = true,
  className,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  pause?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "group flex w-full overflow-hidden [--duration:30s] [--gap:3rem] [gap:var(--gap)]",
        className,
      )}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          style={{
            animation: `cordMarqueeScroll var(--duration) linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
          className={clsx(
            "flex shrink-0 items-center justify-around [gap:var(--gap)] min-w-full",
            pause && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
      <style>{`
        @keyframes cordMarqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - var(--gap))); }
        }
      `}</style>
    </div>
  );
}

/** Magic UI · Dot Pattern: decorative dotted backdrop (hero only). */
export function DotPattern({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={clsx(
        "pointer-events-none absolute inset-0 h-full w-full",
        className,
      )}
    >
      <defs>
        <pattern
          id="cord-dots"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.2" fill="rgba(139,92,246,0.18)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cord-dots)" />
    </svg>
  );
}

/** Magic UI · Meteors: streaking comets in the hero. */
export function Meteors({ number = 14 }: { number?: number }) {
  const meteors = Array.from({ length: number }, (_, i) => ({
    id: i,
    left: (i * 137) % 100,
    delay: ((i * 2.3) % 8).toFixed(1),
    dur: (4.5 + ((i * 1.1) % 4)).toFixed(1),
  }));
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {meteors.map((m) => (
        <span
          key={m.id}
          className="absolute h-0.5 w-0.5 rotate-[215deg] rounded-full bg-brand-pink shadow-[0_0_0_1px_rgba(236,72,153,0.12)] before:content-[''] before:absolute before:top-1/2 before:h-px before:w-20 before:-translate-y-1/2 before:bg-gradient-to-r before:from-[#ec4899] before:to-transparent"
          style={{
            left: `${m.left}%`,
            top: "-8%",
            animation: `cordMeteor ${m.dur}s linear ${m.delay}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes cordMeteor { 0% { transform: rotate(215deg) translateX(0); opacity: 1; } 70% { opacity: 1; } 100% { transform: rotate(215deg) translateX(-620px); opacity: 0; } }`}</style>
    </div>
  );
}

/** Ambient glow orb (hero only, SPEC §5.14). */
export function GlowOrb({
  className,
  color = "rgba(139, 92, 246, 0.22)",
  size = 400,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden
      className={clsx(
        "pointer-events-none absolute rounded-full blur-[100px] will-change-transform",
        className,
      )}
      style={{ width: size, height: size, background: color }}
    />
  );
}

/** Magic UI · Border Beam: light beam travelling around a rounded border. */
export function BorderBeam({
  size = 120,
  duration = 7,
  className,
  colorFrom = "#8b5cf6",
  colorTo = "#ec4899",
}: {
  size?: number;
  duration?: number;
  className?: string;
  colorFrom?: string;
  colorTo?: string;
}) {
  return (
    <div
      className={clsx(
        "pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect]",
        className,
      )}
      style={{
        mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
      }}
    >
      <motion.div
        className="absolute aspect-square rounded-full"
        style={{
          width: size,
          background: `linear-gradient(to left, transparent, ${colorFrom}, ${colorTo}, transparent)`,
          offsetPath: `rect(0 auto auto 0 round ${size / 2}px)`,
        }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      />
    </div>
  );
}

/** Magic UI · Magic Card: cursor spotlight + border glow that track the mouse. */
export function MagicCard({
  children,
  className,
  gradientColor = "rgba(139,92,246,0.12)",
}: {
  children: React.ReactNode;
  className?: string;
  gradientColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [inside, setInside] = useState(false);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseEnter={() => setInside(true)}
      onMouseLeave={() => setInside(false)}
      className={clsx(
        "group/card relative overflow-hidden rounded-2xl border border-line bg-panel transition-all duration-300",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(340px circle at ${pos.x}px ${pos.y}px, ${gradientColor}, transparent 70%)`,
          opacity: inside ? 1 : 0,
        }}
      />
      {children}
    </div>
  );
}
