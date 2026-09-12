import { motion } from "motion/react";
import {
  Radar,
  GitMerge,
  MessageSquareDiff,
  Github,
  ArrowRight,
} from "lucide-react";
import { DotPattern, GlowOrb, Meteors, Marquee } from "../components/magicui";
import FindingFlow from "../components/FindingFlow";
import { REPO_URL } from "../routes";

const rise = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

const SIGNALS = [
  "SOURCE CODE",
  "API CONTRACTS",
  "SECURITY TOOLS",
  "PULL-REQUEST FEEDBACK",
];

const CAPABILITIES = [
  {
    icon: Radar,
    title: "Discovery",
    text: "Discovers the API your code actually exposes, not the one the docs claim. The surface APICordon reasons about comes from what is really there.",
  },
  {
    icon: GitMerge,
    title: "Correlation",
    text: "Correlates source, contracts and security tools into one picture, so overlapping alerts about the same endpoint become a single, explainable finding.",
  },
  {
    icon: MessageSquareDiff,
    title: "Pull-request feedback",
    text: "Turns findings into precise pull-request feedback: delivered where developers already work, specific enough to act on without leaving the PR.",
  },
  {
    icon: Github,
    title: "GitHub-native",
    text: "Built to live inside GitHub: repos, pull requests and CI. No external platform to adopt, no dashboard to babysit; the cordon sits where the code is.",
  },
];

export default function Landing() {
  return (
    <div className="dot-backdrop">
      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-[72px]">
        <DotPattern />
        <GlowOrb
          className="-top-48 left-[8%]"
          color="rgba(139,92,246,0.18)"
          size={550}
        />
        <GlowOrb
          className="-top-40 right-[6%]"
          color="rgba(236,72,153,0.15)"
          size={500}
        />
        <GlowOrb
          className="left-[38%] top-24"
          color="rgba(6,182,212,0.12)"
          size={420}
        />
        <Meteors number={16} />

        <div className="relative mx-auto max-w-5xl text-center">
          <motion.div variants={rise} initial="hidden" animate="show" custom={0}>
            <span className="eyebrow">
              <span className="pulse-dot" aria-hidden />
              In development · docs first
            </span>
          </motion.div>

          <motion.h1
            variants={rise}
            initial="hidden"
            animate="show"
            custom={1}
            className="grad-text mx-auto mt-6 max-w-4xl text-[clamp(2.6em,6vw,4em)] font-extrabold leading-[1.08] tracking-tight"
          >
            The GitHub-native security layer for APIs
          </motion.h1>

          <motion.p
            variants={rise}
            initial="hidden"
            animate="show"
            custom={2}
            className="mx-auto mt-5 max-w-[720px] text-[1.04em] leading-[1.75] text-muted"
          >
            APICordon discovers the API your code actually exposes, correlates
            source, contracts and security tools, and turns findings into
            precise pull-request feedback developers can act on.
          </motion.p>

          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="/docs/" className="btn btn-primary">
              Read the docs <ArrowRight size={16} />
            </a>
            <a href="/examples/" className="btn btn-ghost">
              See example feedback
            </a>
          </motion.div>
        </div>
      </section>

      {/* --------------------------------------------------------- marquee */}
      <section className="relative border-y border-line-light bg-white/[0.015] py-4">
        <Marquee>
          {SIGNALS.map((s) => (
            <span
              key={s}
              className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-faint"
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-brand-violet shadow-[0_0_8px_rgba(139,92,246,0.7)]"
                aria-hidden
              />
              {s}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ------------------------------------------------------ what it does */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mono-label mb-3">What it does</div>
          <h2 className="text-[1.7em] font-bold text-white">
            From scattered signals to one actionable comment
          </h2>
          <p className="mt-3 text-[0.95em] leading-relaxed text-muted">
            Everything APICordon does lives on one path: watch the API surface,
            fuse what the tools see, and speak up exactly where the work
            happens.
          </p>
        </div>
        <FindingFlow />
      </section>

      {/* -------------------------------------------------------- capabilities */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((c) => (
            <div key={c.title} className="doc-card">
              <span className="icon-tile">
                <c.icon size={20} className="text-brand-violet" />
              </span>
              <div className="mt-1 text-[0.98em] font-semibold text-white">
                {c.title}
              </div>
              <p className="text-[0.83em] leading-[1.55] text-muted">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- status */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-panel p-8 text-center sm:p-10">
          <GlowOrb
            className="-top-24 left-1/2 -translate-x-1/2"
            color="rgba(139,92,246,0.14)"
            size={420}
          />
          <div className="relative">
            <div className="mono-label mb-3">Status</div>
            <h2 className="text-[1.5em] font-bold text-white">
              Early days, built in the open
            </h2>
            <p className="mx-auto mt-3 max-w-[560px] text-[0.92em] leading-relaxed text-muted">
              APICordon is in active development. This repository currently
              hosts the project's documentation and community scaffolding; the
              roadmap and design notes are being written in the open. Watch the
              repo, read the plan, or open an issue to shape what ships first.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`${REPO_URL}/stargazers`}
                target="_blank"
                rel="noopener"
                className="btn btn-primary btn-sm"
              >
                <Github size={15} /> Star on GitHub
              </a>
              <a href="/docs/getting-started/" className="btn btn-ghost btn-sm">
                Where things stand <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
