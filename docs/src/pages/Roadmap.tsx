import Callout from "../components/Callout";
import { REPO_URL } from "../routes";

/**
 * /docs/roadmap, honest roadmap + FAQ. Only tracked-repo reality and the
 * authoritative project description appear here; owner-specific dates are
 * TODOs.
 */
export default function Roadmap() {
  return (
    <>
      <h1>Roadmap &amp; FAQ</h1>
      <p>
        Where APICordon is heading, what is deliberately not promised yet, and
        the questions that come up most. The project is developed in the open:
        the <a href={REPO_URL}>repository</a> and its{" "}
        <a href={`${REPO_URL}/issues`}>issue tracker</a> are the live source of
        truth.
      </p>

      <h2 id="roadmap">Roadmap</h2>
      <p>
        The honest version, ordered along the project's core pipeline:
      </p>
      <table className="table-card my-4">
        <thead>
          <tr>
            <th>Area</th>
            <th>Direction</th>
            <th>Today</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>API discovery</strong></td>
            <td>
              Build a trustworthy inventory of the API a repository actually
              exposes, from source and contracts.
            </td>
            <td>In design</td>
          </tr>
          <tr>
            <td><strong>Correlation</strong></td>
            <td>
              Fuse source, contract and security-tool signals into single,
              evidence-carrying findings.
            </td>
            <td>In design</td>
          </tr>
          <tr>
            <td><strong>PR feedback</strong></td>
            <td>
              Deliver findings as precise comments on the pull requests that
              touch the affected surface.
            </td>
            <td>In design</td>
          </tr>
          <tr>
            <td><strong>Documentation &amp; community</strong></td>
            <td>
              Docs platform, contribution and disclosure processes: the base
              everything else ships on.
            </td>
            <td>
              <span className="status-pill">Live</span>
            </td>
          </tr>
        </tbody>
      </table>
      <Callout tone="warn" title="No dates on purpose">
        Dates get missed and stale roadmaps erode trust. Milestones are tracked
        as GitHub issues and milestones; when an area above moves from “in
        design” to “shipping”, this table is the first thing updated.
      </Callout>
      <p>
        Want to influence the order?{" "}
        <a href={`${REPO_URL}/issues/new/choose`}>Open an issue</a> describing
        the API surface you would want covered first; concrete use cases carry
        the most weight.
      </p>

      <h2 id="faq">FAQ</h2>

      <h3>Can I install APICordon?</h3>
      <p>
        Not yet. There is no released tool; see{" "}
        <a href="/docs/getting-started/">Getting Started</a> for what exists
        today and how to follow development.
      </p>

      <h3>Is it really “GitHub-native”? Does it only work with GitHub?</h3>
      <p>
        “GitHub-native” describes where APICordon lives: repositories, pull
        requests and Actions. It is the environment the project is built for
        first, not necessarily the only one it could ever support, but
        supporting other forges is not something the project promises today.
      </p>

      <h3>Which languages, frameworks and API styles are supported?</h3>
      <p>
        To be announced with the first release. The discovery and correlation
        design is built to be source- and protocol-neutral; the concrete
        coverage matrix will be documented here when it is real, not before.
      </p>

      <h3>Which security tools does it correlate with?</h3>
      <p>
        Also to be announced with the first release. The authoritative promise
        is the category, “correlates source, contracts and security tools”,
        and the concrete integrations will be listed when they ship. The{" "}
        <a href="/examples/">examples</a> are illustrative and name no real
        product.
      </p>

      <h3>Why do the docs describe things that aren't released?</h3>
      <p>
        The documentation is written ahead of the engine deliberately: the
        pipeline, discover, correlate, feed back into PRs, is the contract
        the project holds itself to while building. Everything illustrative is
        labeled, and status columns in the docs say plainly what exists.
      </p>

      <h3>Is it free? What's the license?</h3>
      <p>
        The repository is released under the Apache License 2.0 with the
        Commons Clause. The LICENSE file in the repository is authoritative;
        the <a href="/about/">about page</a> summarizes what that means.
      </p>

      <h3>How do I report a security issue?</h3>
      <p>
        Privately, through{" "}
        <a href={`${REPO_URL}/security/advisories/new`}>
          GitHub security advisories
        </a>{", "}
        full details in <a href="/docs/security/">Security</a>.
      </p>
    </>
  );
}
