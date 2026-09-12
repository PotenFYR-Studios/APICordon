// Multi-route static generation with full-body prerendering.
//
// Runs after `vite build` (see the `build` script in package.json):
//   1. reads the Vite shell from dist/index.html,
//   2. per route: renders <App/> to static HTML with a stubbed location,
//   3. emits dist/<slug>.html AND dist/<slug>/index.html twins carrying the
//      route's full head (title, description, canonical, OG + twitter with
//      og:image, JSON-LD) AND the prerendered body (crawlers/AI bots see the
//      whole page without JS).
//
// The client hydrates the prerendered markup via hydrateRoot (src/main.tsx).
// No extra dependencies beyond react-dom/server.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { renderToString } from "react-dom/server";
import { StrictMode, type ComponentType } from "react";
import { ROUTES, CANON, type Route } from "../src/routes";

const __dir = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dir, "../dist");
const OG_IMAGE = `${CANON}/og.png`;

/** Org-standard JSON-LD @graph for the landing page. */
function landingJsonLd(): object {
  const org = `${CANON}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${CANON}/#website`,
        name: "APICordon",
        url: `${CANON}/`,
        description: routeById("landing")!.description,
        inLanguage: "en",
        publisher: { "@id": org },
      },
      {
        "@type": "Organization",
        "@id": org,
        name: "PotenFYR Studios",
        url: "https://potenfyr.in",
        logo: `${CANON}/favicon.png`,
        sameAs: [
          "https://github.com/PotenFYR-Studios",
          "https://modrinth.com/organization/potenfyr",
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${CANON}/#application`,
        name: "APICordon",
        applicationCategory: "SecurityApplication",
        url: "https://github.com/PotenFYR-Studios/APICordon",
        description: routeById("landing")!.description,
        author: { "@id": org },
        license:
          "https://github.com/PotenFYR-Studios/APICordon/blob/master/LICENSE",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    ],
  };
}

function routeById(id: string): Route | undefined {
  return ROUTES.find((r) => r.id === id);
}

function metaFor(route: Route): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const url = `${CANON}${route.path === "/" ? "" : route.path}`;
  const jsonLd =
    route.id === "landing"
      ? landingJsonLd()
      : {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: route.title,
          description: route.description,
          url,
          isPartOf: { "@id": `${CANON}/#website` },
          publisher: { "@id": `${CANON}/#organization` },
        };
  return [
    `    <title>${esc(route.title)}</title>`,
    `    <meta name="description" content="${esc(route.description)}" />`,
    `    <link rel="canonical" href="${url}" />`,
    `    <meta property="og:site_name" content="APICordon" />`,
    `    <meta property="og:type" content="website" />`,
    `    <meta property="og:title" content="${esc(route.title)}" />`,
    `    <meta property="og:description" content="${esc(route.description)}" />`,
    `    <meta property="og:url" content="${url}" />`,
    `    <meta property="og:image" content="${OG_IMAGE}" />`,
    `    <meta property="og:image:alt" content="${esc(route.title)}" />`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:image" content="${OG_IMAGE}" />`,
    `    <meta name="twitter:image:alt" content="${esc(route.title)}" />`,
    `    <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
  ].join("\n");
}

// ------------------------------------------------------------ prerender body
// Stub `location` before App evaluates: every component derives from
// location.pathname, and the stub uses the trailing-slash-stripped form so
// the rendered tree matches a cold load under either URL convention.
type AppDefault = ComponentType;

// Imported lazily inside renderRoute: a static import would hoist above the
// location stub, and App's module graph must not evaluate against the wrong
// location.
let AppDefault: AppDefault | null = null;

async function renderRoute(route: Route): Promise<string> {
  // Render from the trailing-slash-stripped path: /docs/how-it-works and
  // /docs/how-it-works/ cold loads both normalize to this pathname in App.
  const stubPath = route.path === "/" ? "/" : route.path.replace(/\/$/, "");
  (globalThis as { location?: unknown }).location = new URL(
    `${CANON}${stubPath}`,
  );
  // App + pages read window/document only inside effects, which
  // renderToString never runs; no further globals need stubbing.
  if (!AppDefault) {
    ({ default: AppDefault } = await import("../src/App"));
  }
  const App = AppDefault;
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

// ------------------------------------------------------------------- main
try {
  const shell = readFileSync(resolve(distDir, "index.html"), "utf8");
  const marker = /<!--route-meta:start-->[\s\S]*?<!--route-meta:end-->/;
  if (!shell.includes('<div id="root"></div>')) {
    throw new Error('root div placeholder not found in shell');
  }

  let emitted = 0;
  for (const route of ROUTES) {
    const body = await renderRoute(route);
    const injected = shell.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div>`,
    );
    const html = injected.replace(
      marker,
      `<!--route-meta:start-->\n${metaFor(route)}\n    <!--route-meta:end-->`,
    );

    if (route.path === "/") {
      writeFileSync(resolve(distDir, "index.html"), html);
    } else {
      const rel = route.path.replace(/^\//, "").replace(/\/$/, ""); // docs/how-it-works
      mkdirSync(resolve(distDir, rel), { recursive: true });
      // twins: slug.html (extensionless hosts) + slug/index.html (GH Pages)
      writeFileSync(resolve(distDir, `${rel}.html`), html);
      writeFileSync(resolve(distDir, rel, "index.html"), html);
    }
    emitted++;
    console.log(
      `[prerender] ${route.path} (${html.length} bytes, body ${body.length})`,
    );
  }

  const nf = shell.replace(
    marker,
    `<!--route-meta:start-->\n    <title>Page not found - APICordon</title>\n    <meta name="description" content="The requested APICordon documentation page does not exist." />\n    <meta name="robots" content="noindex" />\n    <!--route-meta:end-->`,
  );
  writeFileSync(resolve(distDir, "404.html"), nf);

  console.log(
    `[prerender] ${emitted} routes + 404 emitted with full head tags and prerendered bodies`,
  );
} catch (err) {
  console.error("[prerender] ERROR:", err);
  process.exit(1);
}
