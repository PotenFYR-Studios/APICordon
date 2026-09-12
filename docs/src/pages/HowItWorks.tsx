import Callout from "../components/Callout";
import FindingFlow from "../components/FindingFlow";

/**
 * /docs/how-it-works, the discovery → correlation → PR-feedback pipeline
 * at the level the project's authoritative description supports.
 */
export default function HowItWorks() {
  return (
    <>
      <h1>How It Works</h1>
      <p>
        APICordon exists because three problems usually live in three different
        tools: nobody knows exactly which APIs the code exposes, security tools
        each see a slice of the surface and disagree, and whatever they find
        rarely reaches the developer at the moment they can act. APICordon
        closes that loop in one pipeline.
      </p>

      <h2 id="the-pipeline">The pipeline</h2>
      <FindingFlow compact />
      <p>
        Each stage feeds the next. Discovery defines what is real; correlation
        decides what it means; the feedback layer decides where the result
        lands so a human can act on it. The rest of this page walks through
        the three stages.
      </p>

      <h2 id="step-1-discovery">Step 1: Discovery</h2>
      <p>
        The first job is to discover <strong>the API your code actually
        exposes</strong>, not the API a document claims exists. Handlers,
        routes and schemas drift from specs; endpoints appear in code that
        never made it into documentation. Discovery looks at the project
        itself: the source that implements endpoints, the contracts that
        describe them, and the security tooling that already watches them.
      </p>
      <Callout tone="cyan" title="Why discovery comes first">
        Every later stage depends on it. Correlating findings against an
        inaccurate inventory produces confident nonsense; feedback anchored to
        the wrong route wastes a developer's trust. APICordon treats discovery
        as the foundation the whole cordon stands on.
      </Callout>

      <h2 id="step-2-correlation">Step 2: Correlation</h2>
      <p>
        Security tooling produces volume: scanners, linters and analyzers each
        report their own view, and the same underlying issue arrives as many
        alerts with different names and severities. Correlation fuses{" "}
        <strong>source, contracts and security tools</strong> into one picture,
        so overlapping signals about the same endpoint merge into a single
        finding that keeps its supporting evidence: where each signal came
        from, and why it matters on this endpoint.
      </p>
      <p>
        The output is not a longer list. It is a shorter one with better
        information density: fewer items, each carrying enough context to judge
        whether it is real and worth fixing.
      </p>

      <h2 id="step-3-pr-feedback">Step 3: Pull-request feedback</h2>
      <p>
        Findings only matter if they reach someone who can fix them.
        APICordon is GitHub-native by design: it turns correlated findings into{" "}
        <strong>precise pull-request feedback</strong>: comments anchored to
        the code a change actually touches, delivered in the place developers
        already look while the change is still open.
      </p>
      <p>
        Precision is the point. Feedback names the endpoint involved, what the
        correlated signals saw, and why it matters; the difference between a
        developer who fixes the issue and one who mutes the notifier. The{" "}
        <a href="/examples/">examples page</a> shows what this feedback is
        intended to look like (illustrative, clearly labeled).
      </p>

      <h2 id="design-goals">Design goals</h2>
      <ul>
        <li>
          <strong>GitHub-native.</strong> The workflow lives in repositories
          and pull requests; no separate console to adopt or check.
        </li>
        <li>
          <strong>Precision over volume.</strong> A finding that reaches a PR
          should be specific, explainable and worth the interruption.
        </li>
        <li>
          <strong>Honest inventory.</strong> The API that gets analyzed is the
          one the code exposes, with drift from specs surfaced, not hidden.
        </li>
        <li>
          <strong>Correlated, not concatenated.</strong> Signals about the same
          issue merge; evidence is preserved, noise is not.
        </li>
      </ul>
      <Callout tone="info" title="Development status">
        APICordon is in early development; these pages describe the approach
        the project is being built to. Detailed, versioned behavior will be
        documented here as it ships.
      </Callout>
    </>
  );
}
