/**
 * Canonical route table for the APICordon docs site.
 *
 * Every entry is emitted as a real static HTML file at build time
 * (see scripts/prerender.tsx) so each route direct-refreshes
 * with per-route title / description / canonical / OG / JSON-LD.
 */

export const CANON = "https://apicordon.docs.potenfyr.in";

export interface Route {
  /** stable id, used for lookup + prev/next ordering */
  id: string;
  /** absolute site path, always with leading + trailing slash */
  path: string;
  title: string;
  description: string;
  /** shown in the docs sidebar; null = not in sidebar (landing, about…) */
  section: string | null;
  /** short label for nav/portal cards */
  blurb: string;
  /** per-page section index for the TOC */
  toc: { id: string; text: string; level: 2 | 3 }[];
}

export const ROUTES: Route[] = [
  {
    id: "landing",
    path: "/",
    title: "APICordon: the GitHub-native security layer for APIs",
    description:
      "APICordon discovers the API your code actually exposes, correlates source, contracts and security tools, and turns findings into precise pull-request feedback.",
    section: null,
    blurb: "",
    toc: [],
  },
  {
    id: "docs-portal",
    path: "/docs/",
    title: "Documentation",
    description:
      "APICordon documentation: getting started, how it works, architecture, security posture, roadmap and FAQ.",
    section: null,
    blurb: "Start here: every guide, reference and policy page.",
    toc: [],
  },
  {
    id: "getting-started",
    path: "/docs/getting-started/",
    title: "Getting Started",
    description:
      "Where APICordon stands today, how to follow along, and how to build and preview the documentation site locally.",
    section: "Get started",
    blurb: "Project status, repo map and local docs tooling.",
    toc: [
      { id: "where-things-stand", text: "Where things stand", level: 2 },
      { id: "explore-the-project", text: "Explore the project", level: 2 },
      { id: "run-the-docs-locally", text: "Run the docs site locally", level: 2 },
      { id: "before-the-first-release", text: "Before the first release", level: 2 },
    ],
  },
  {
    id: "how-it-works",
    path: "/docs/how-it-works/",
    title: "How It Works",
    description:
      "The APICordon pipeline: discover the API your code exposes, correlate every signal into one finding, and deliver precise pull-request feedback.",
    section: "Get started",
    blurb: "Discovery → correlation → pull-request feedback.",
    toc: [
      { id: "the-pipeline", text: "The pipeline", level: 2 },
      { id: "step-1-discovery", text: "Step 1: Discovery", level: 2 },
      { id: "step-2-correlation", text: "Step 2: Correlation", level: 2 },
      { id: "step-3-pr-feedback", text: "Step 3: Pull-request feedback", level: 2 },
      { id: "design-goals", text: "Design goals", level: 2 },
    ],
  },
  {
    id: "architecture",
    path: "/docs/architecture/",
    title: "Architecture",
    description:
      "How APICordon is structured: discovery inputs, the correlation layer, feedback surfaces, and the documentation platform in this repository.",
    section: "Core topics",
    blurb: "Components, data flow and repository layout.",
    toc: [
      { id: "components", text: "Components", level: 2 },
      { id: "data-flow", text: "Data flow", level: 2 },
      { id: "repository-layout", text: "Repository layout", level: 2 },
      { id: "docs-platform", text: "The docs platform itself", level: 2 },
    ],
  },
  {
    id: "security",
    path: "/docs/security/",
    title: "Security",
    description:
      "APICordon's own security posture: what this repository ships, how secrets are treated, and how to report vulnerabilities responsibly.",
    section: "Core topics",
    blurb: "Posture, secret handling and responsible reporting.",
    toc: [
      { id: "scope", text: "Scope", level: 2 },
      { id: "secret-handling", text: "Secret handling", level: 2 },
      { id: "supply-chain", text: "Supply chain", level: 2 },
      { id: "reporting", text: "Reporting a vulnerability", level: 2 },
    ],
  },
  {
    id: "roadmap",
    path: "/docs/roadmap/",
    title: "Roadmap & FAQ",
    description:
      "Where APICordon is heading, what is intentionally out of scope for the first release, and answers to common questions.",
    section: "Project",
    blurb: "Direction, non-goals and frequently asked questions.",
    toc: [
      { id: "roadmap", text: "Roadmap", level: 2 },
      { id: "faq", text: "FAQ", level: 2 },
    ],
  },
  {
    id: "examples",
    path: "/examples/",
    title: "Examples",
    description:
      "Illustrative APICordon examples: what a correlated finding looks like and how it surfaces as pull-request feedback. Clearly labeled, not shipped output.",
    section: null,
    blurb: "Illustrative findings and PR feedback, labeled, not shipped.",
    toc: [
      { id: "illustrative-only", text: "Illustrative only", level: 2 },
      { id: "finding-to-pr-comment", text: "Finding → PR comment", level: 2 },
      { id: "annotated-feedback", text: "Annotated feedback", level: 2 },
      { id: "spec-card", text: "Endpoint under discussion", level: 2 },
    ],
  },
  {
    id: "about",
    path: "/about/",
    title: "About",
    description:
      "About APICordon and PotenFYR Studios: the idea, the ecosystem, licensing and how to reach the project.",
    section: null,
    blurb: "The project, the studio behind it, licensing and contact.",
    toc: [
      { id: "the-project", text: "The project", level: 2 },
      { id: "potenfyr-studios", text: "PotenFYR Studios", level: 2 },
      { id: "license", text: "License", level: 2 },
      { id: "contact", text: "Contact", level: 2 },
    ],
  },
];

export const DOCS_ROUTES = ROUTES.filter((r) => r.section !== null);

export function routeById(id: string): Route | undefined {
  return ROUTES.find((r) => r.id === id);
}

/** Neighbouring docs pages for prev/next pagination. */
export function neighbors(id: string): { prev?: Route; next?: Route } {
  const i = DOCS_ROUTES.findIndex((r) => r.id === id);
  if (i === -1) return {};
  return { prev: DOCS_ROUTES[i - 1], next: DOCS_ROUTES[i + 1] };
}

/** Resolve a location.pathname to a route id (falls back to 404). */
export function routeForPath(pathname: string): Route | "404" {
  const clean = pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
  const norm = clean.endsWith("/") ? clean : `${clean}/`;
  const hit = ROUTES.find((r) => r.path === norm);
  return hit ?? "404";
}

export const SITE_NAME = "APICordon";
export const ORG = "PotenFYR-Studios";
export const REPO_URL = "https://github.com/PotenFYR-Studios/APICordon";
export const ORG_URL = "https://github.com/PotenFYR-Studios";
export const WEBSITE_URL = "https://potenfyr.in";
export const DISCORD_URL = "https://discord.com/invite/zUaN2FPBec";
