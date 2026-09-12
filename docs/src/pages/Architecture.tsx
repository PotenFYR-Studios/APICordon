import Callout from "../components/Callout";
import CodeBlock from "../components/CodeBlock";
import { REPO_URL } from "../routes";

/**
 * /docs/architecture, component overview, data flow and the repository's
 * own docs platform. Kept at the level the project supports today; deeper
 * internals will land here as the engine ships.
 */
export default function Architecture() {
  return (
    <>
      <h1>Architecture</h1>
      <p>
        APICordon is built as a GitHub-native pipeline rather than a standalone
        product: the repository is the integration point, pull requests are the
        feedback surface, and the analysis path runs discovery → correlation →
        feedback. This page describes the moving parts and how the repository
        itself is put together.
      </p>

      <h2 id="components">Components</h2>
      <table className="table-card my-4">
        <thead>
          <tr>
            <th>Component</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Discovery</strong></td>
            <td>
              Builds the API inventory from what the code actually exposes,
              source, contracts and existing security tooling.
            </td>
            <td><span className="status-pill amber">In design</span></td>
          </tr>
          <tr>
            <td><strong>Correlation</strong></td>
            <td>
              Fuses overlapping signals into single findings that keep their
              evidence and explain themselves.
            </td>
            <td><span className="status-pill amber">In design</span></td>
          </tr>
          <tr>
            <td><strong>PR feedback</strong></td>
            <td>
              Renders correlated findings as precise comments on the pull
              requests that touch the affected surface.
            </td>
            <td><span className="status-pill amber">In design</span></td>
          </tr>
          <tr>
            <td><strong>Docs platform</strong></td>
            <td>
              This site, the project's documentation, built and shipped from
              this repository.
            </td>
            <td><span className="status-pill">Shipped</span></td>
          </tr>
        </tbody>
      </table>
      <Callout tone="info" title="Reading the status column">
        “In design” means the behavior is being specified and built; the
        description here is the contract it is being built to, not a shipped
        feature. This table is the honest boundary of the project today.
      </Callout>

      <h2 id="data-flow">Data flow</h2>
      <p>
        A change to an API surface travels one path through APICordon:
      </p>
      <ol>
        <li>
          <strong>Observe.</strong> The project's source, its API contracts and
          the security tools watching it each contribute a view of the surface.
        </li>
        <li>
          <strong>Reconcile.</strong> Those views are matched against each
          other, producing a single inventory of the API the code actually
          exposes, including where a contract and the code disagree.
        </li>
        <li>
          <strong>Correlate.</strong> Signals about the same endpoint are fused
          into one finding, carrying provenance for every contributing signal.
        </li>
        <li>
          <strong>Deliver.</strong> The finding becomes pull-request feedback
          on the change that introduced or touched it.
        </li>
      </ol>

      <h2 id="repository-layout">Repository layout</h2>
      <p>
        The repository is small and honest about it: every tracked path has a
        job:
      </p>
      <CodeBlock
        lang="text"
        label="layout"
        code={`APICordon/
├── docs/                  # this site: Vite + React + TS, built with Bun
│   ├── public/            # CNAME, favicon, robots.txt, sitemap.xml
│   └── src/               # pages, components, design tokens
├── .github/
│   ├── workflows/         # docs-pages.yml: build + deploy to GitHub Pages
│   └── ISSUE_TEMPLATE/    # bug, feature, docs, security, question
├── CONTRIBUTING.md        # how to contribute (docs tooling works today)
├── SECURITY.md            # security posture + responsible disclosure
├── LICENSE                # Apache-2.0 with Commons Clause
└── README.md`}
      />

      <h2 id="docs-platform">The docs platform itself</h2>
      <p>
        The site you are reading is the one shipped component, so it is built
        to the same standard the project aims for everywhere:
      </p>
      <ul>
        <li>
          <strong>Multi-page emit.</strong> Every route is generated as a real
          static HTML file with its own title, description, canonical URL,
          Open Graph tags and JSON-LD; no client-only routing, so direct
          refreshes and link previews always resolve correctly.
        </li>
        <li>
          <strong>Bun + Vite + Tailwind v4.</strong> A minimal toolchain with
          no runtime beyond static files once built.
        </li>
        <li>
          <strong>Pages-native deploys.</strong> The{" "}
          <code>docs-pages.yml</code> workflow builds on every push to{" "}
          <code>master</code> that touches docs, verifies the output, and
          deploys the artifact; pull requests get build validation without any
          deploy.
        </li>
      </ul>
      <p>
        The implementation lives in{" "}
        <a href={`${REPO_URL}/tree/master/docs`}>
          <code>docs/</code>
        </a>
        . Inside it, the routes table, the post-build prerender pass in{" "}
        <code>scripts/prerender.tsx</code>, and the design tokens in{" "}
        <code>src/index.css</code> are the short version of how the site
        works.
      </p>
    </>
  );
}

