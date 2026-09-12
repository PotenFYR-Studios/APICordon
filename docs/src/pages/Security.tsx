import Callout from "../components/Callout";
import { REPO_URL } from "../routes";

/**
 * /docs/security, the project's own security posture: what this repo ships,
 * how secrets are treated, and how to report vulnerabilities.
 */
export default function Security() {
  return (
    <>
      <h1>Security</h1>
      <p>
        A project whose job is API security should hold itself to the standard
        it preaches. This page documents APICordon's own security posture: what
        this repository actually ships, how sensitive material is treated, and
        how to reach us privately when something looks wrong.
      </p>

      <h2 id="scope">Scope</h2>
      <p>
        Today this repository ships a documentation site, GitHub workflow
        definitions and community files. It contains no runtime service, no
        telemetry, and no code that processes your source code, contracts or
        traffic. The attack surface of the project (as distinct from its
        ambitions) is:
      </p>
      <ul>
        <li>
          <strong>The docs site</strong>: fully static files on GitHub Pages;
          no server-side execution, no forms, no analytics.
        </li>
        <li>
          <strong>The build pipeline</strong>: the Pages workflow, which runs
          on pushed changes with least-privilege permissions and deploys only
          from <code>master</code>.
        </li>
      </ul>

      <h2 id="secret-handling">Secret handling</h2>
      <p>
        Secrets are capabilities, not report data, a principle the project
        holds itself to first. In practice, for everything under this
        repository today:
      </p>
      <ul>
        <li>
          No credentials, tokens or keys belong in issues, pull requests,
          documentation, examples or code. The issue templates warn
          contributors explicitly.
        </li>
        <li>
          The <a href="/examples/">example findings and feedback</a> use
          invented routes and fake hostnames only, never real targets,
          payloads with sensitive data, or redactable-but-real material.
        </li>
        <li>
          Workflow permissions are minimal by construction: the build job gets
          <code> contents: read</code>; only the deploy job gets Pages write
          and OIDC token scopes.
        </li>
      </ul>
      <Callout tone="danger" title="If you leaked a secret into this repo">
        Revoke and rotate it first; treat it as compromised the moment it was
        committed. Then open a security report (below) so references can be
        scrubbed from history properly. Do not open a public issue for it.
      </Callout>

      <h2 id="supply-chain">Supply chain</h2>
      <p>
        The docs platform keeps a deliberately small dependency set (React,
        Vite, Tailwind, Bun tooling). CI installs dependencies with a frozen
        lockfile, and the deploy job uploads only the verified build output;
        the workflow fails if the build did not produce a non-empty{" "}
        <code>dist/</code> with the expected files.
      </p>

      <h2 id="reporting">Reporting a vulnerability</h2>
      <p>
        Please report suspected vulnerabilities in APICordon (including the
        docs site and its build pipeline) <strong>privately</strong>:
      </p>
      <ol>
        <li>
          Use{" "}
          <a href={`${REPO_URL}/security/advisories/new`}>
            GitHub's private vulnerability reporting
          </a>{" "}
          for this repository, or the contact in{" "}
          <a href="https://github.com/PotenFYR-Studios/APICordon/blob/master/SECURITY.md">
            SECURITY.md
          </a>
          .
        </li>
        <li>
          Give us room: allow a reasonable window for a fix before any public
          disclosure, and don't test against resources you don't own.
        </li>
        <li>
          Skip exploit chains in the first report; a proof of the impact is
          enough; we will ask for detail as we work it.
        </li>
      </ol>
      <p>
        We credit reporters in release notes by default; tell us if you prefer
        otherwise. For anything that is <em>not</em> a vulnerability (a hardening
        idea, a config question), the{" "}
        <a href="https://github.com/PotenFYR-Studios/APICordon/issues/new/choose">
          regular issue tracker
        </a>{" "}
        is the right place.
      </p>
    </>
  );
}
