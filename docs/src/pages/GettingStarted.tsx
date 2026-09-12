import Callout from "../components/Callout";
import CodeBlock from "../components/CodeBlock";

/**
 * /docs/getting-started, honest about project status: there is no tool to
 * install yet. What exists today: the docs platform in this repo, community
 * files, and the roadmap conversation.
 */
export default function GettingStarted() {
  return (
    <>
      <h1>Getting Started</h1>
      <p>
        APICordon is in early development. There is no tool to install yet,
        and this page will not pretend otherwise. Here is where the project
        stands, what already works, and how to follow or shape what comes
        next.
      </p>

      <h2 id="where-things-stand">Where things stand</h2>
      <p>
        The <a href="https://github.com/PotenFYR-Studios/APICordon">APICordon repository</a>{" "}
        currently contains the project's documentation platform, its community
        and security files, and its release tooling. The API-analysis engine
        itself (discovery, correlation, pull-request feedback) is being
        designed and built, and its documentation is written ahead of the code
        so the goals stay explicit.
      </p>
      <Callout tone="cyan" title="Reading the docs vs. running the tool">
        Pages like <a href="/docs/how-it-works/">How It Works</a> and{" "}
        <a href="/examples/">Examples</a> describe the approach APICordon is
        being built around. Examples are{" "}
        <strong>illustrative and clearly labeled</strong>: they show intent,
        not shipped output.
      </Callout>

      <h2 id="explore-the-project">Explore the project</h2>
      <p>
        A quick map of what lives in the repository today:
      </p>
      <table className="table-card my-4">
        <thead>
          <tr>
            <th>Path</th>
            <th>What it is</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>docs/</code></td>
            <td>This documentation site: Vite + React + TypeScript, built with Bun.</td>
          </tr>
          <tr>
            <td><code>README.md</code></td>
            <td>Project overview, capability summary and links.</td>
          </tr>
          <tr>
            <td><code>CONTRIBUTING.md</code></td>
            <td>How to contribute, including the docs tooling commands that work today.</td>
          </tr>
          <tr>
            <td><code>SECURITY.md</code></td>
            <td>Security posture and responsible disclosure.</td>
          </tr>
          <tr>
            <td><code>.github/</code></td>
            <td>Issue templates, pull-request template and the Pages workflow.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="run-the-docs-locally">Run the docs site locally</h2>
      <p>
        The one thing you can run from this repository today is its
        documentation site. It is a standard Vite app managed with Bun:
      </p>
      <CodeBlock
        lang="bash"
        code={`git clone https://github.com/PotenFYR-Studios/APICordon.git
cd APICordon/docs

bun install    # install dependencies
bun run dev    # dev server with hot reload
bun run build  # production build into docs/dist`}
      />
      <p>
        <code>bun run dev</code> serves the site with live reload for writing;
        <code> bun run build</code> produces the static output that GitHub
        Pages deploys to{" "}
        <a href="https://apicordon.docs.potenfyr.in">apicordon.docs.potenfyr.in</a>.
      </p>

      <h2 id="before-the-first-release">Before the first release</h2>
      <ul>
        <li>
          <strong>Follow along</strong>: watch the repository for design notes
          and progress.
        </li>
        <li>
          <strong>Tell us what matters</strong>: open an issue describing the
          API surface you would want discovered, correlated and fed back into
          your pull requests.
        </li>
        <li>
          <strong>Improve the docs</strong>: unclear documentation is a bug;
          the <a href="/docs/roadmap/">roadmap</a> and{" "}
          <a href="/docs/how-it-works/">design pages</a> get better from
          outside questions. Start with{" "}
          <a href="https://github.com/PotenFYR-Studios/APICordon/blob/master/CONTRIBUTING.md">
            CONTRIBUTING.md
          </a>
          .
        </li>
      </ul>
    </>
  );
}
