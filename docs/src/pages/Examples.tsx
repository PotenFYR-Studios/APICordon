import Callout from "../components/Callout";
import FindingFlow from "../components/FindingFlow";
import SpecCard from "../components/SpecCard";
import ApiExchange from "../components/ApiExchange";
import CodeBlock from "../components/CodeBlock";

/**
 * /examples, illustrative finding + PR-feedback walkthroughs. Everything on
 * this page uses invented routes/hosts and is labeled as illustrative.
 */

function IllustrativeBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-amber-400">
      Illustrative, not shipped output
    </span>
  );
}

export default function Examples() {
  return (
    <div className="dot-backdrop">
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16">
        <header className="mb-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-faint"
          >
            APICordon Docs
          </nav>
          <h1 className="grad-text text-[clamp(2em,4.4vw,3em)] font-extrabold leading-[1.1] tracking-tight">
            Examples
          </h1>
          <p className="mt-4 max-w-[680px] text-[1.02em] leading-relaxed text-muted">
            What APICordon is being built to produce: a correlated finding, and
            the pull-request feedback it becomes. Every artifact on this page
            is invented for demonstration: routes, hosts and tool names are
            fictional.
          </p>
          <div className="mt-5">
            <IllustrativeBadge />
          </div>
        </header>

        <div className="doc-content">
          <h2 id="illustrative-only">Illustrative only</h2>
          <p>
            APICordon has not shipped its analysis pipeline yet, so these
            examples show <strong>intent</strong>, not output. They exist to
            make the goal concrete: one correlated finding per real issue, with
            enough context to act on, delivered inside the pull request. If
            real output ever looks like a raw scanner dump instead of this,
            that is a bug against the design.
          </p>

          <h2 id="finding-to-pr-comment">Finding → PR comment</h2>
          <p>
            Suppose a pull request modifies an endpoint that deletes a resource
            without checking who is asking. Three different tools notice three
            different things; a contract test notices a fourth. Correlated,
            they are one finding, and it lands as a single PR comment:
          </p>
          <FindingFlow compact />

          <Callout tone="cyan" title="What the correlation bought">
            Four signals, one comment. The developer is not asked to reconcile
            a scanner, a linter and a contract test, the finding already did,
            and shows its work.
          </Callout>

          <h2 id="annotated-feedback">Annotated feedback</h2>
          <p>
            The endpoint involved, presented the way the finding sees it, from
            the spec and the code together:
          </p>

          <SpecCard
            method="DELETE"
            path="/v1/workspaces/{wsId}/invoices/{invoiceId}"
            summary="Deletes a single invoice from a workspace. Irreversible; no recovery endpoint exists."
            source="spec · invoices.v1.yaml (invented for this example)"
            tags={["workspaces", "invoices"]}
            flags={[
              {
                label: "signal",
                text: "No authorization check on the handler path for this route.",
              },
              {
                label: "signal",
                text: "The contract documents no ownership requirement for invoices.",
              },
              {
                label: "signal",
                text: "A route-level policy test asserts allow-by-default for this method.",
              },
            ]}
          />

          <p>
            The request a reviewer could reproduce it with, and what the API
            answers today:
          </p>

          <ApiExchange
            method="DELETE"
            path="https://api.example.invalid/v1/workspaces/acme/invoices/inv_2093"
            request={`DELETE /v1/workspaces/acme/invoices/inv_2093 HTTP/1.1
Host: api.example.invalid
Authorization: Bearer <any-valid-user-token>`}
            response={`HTTP/1.1 204 No Content

# invoice inv_2093 deleted: no ownership check performed`}
            status="204"
            statusNote="any workspace member can delete any invoice"
            note="Fictional host (RFC 2606 .invalid), invented token placeholder, nothing here is a real target."
          />

          <p>
            And the feedback itself, as a pull-request comment on the diff that
            introduced the route:
          </p>

          <CodeBlock
            lang="markdown"
            label="pr comment · illustrative"
            code={(() => {
              const lines = [
                "**[APICordon finding] Invoice deletion has no ownership check**",
                "",
                "`DELETE /v1/workspaces/{wsId}/invoices/{invoiceId}` accepts any valid",
                "workspace token. One correlated signal per source below; all four",
                "describe the same issue:",
                "",
                "- **handler**: the delete path performs no authorization check",
                "- **contract**: `invoices.v1.yaml` documents no ownership rule",
                "- **policy test**: asserts allow-by-default for this method",
                "- **spec drift**: docs say \"owner only\"; the contract doesn't",
                "",
                "**Why it matters:** any workspace member can irreversibly delete",
                "any other member's invoice. Auditing happens, ownership doesn't.",
                "",
                "**Suggested direction:** verify the requesting identity owns the",
                "invoice (or holds an admin role) before the delete path runs.",
                "",
                "<sub>Illustrative example invented for documentation, not real",
                "APICordon output.</sub>",
              ];
              return lines.join("\n");
            })()}
          />

          <Callout tone="warn" title="Deliberately restrained">
            The comment is one thread, names the endpoint, lists its signals,
            states the impact, and suggests a direction; no severity theater,
            no wall of CVE references, no dupe pile. That restraint is the
            “precise” in “precise pull-request feedback”.
          </Callout>

          <h2 id="spec-card">Endpoint under discussion</h2>
          <p>
            Findings read better when the surface they refer to is explicit.
            The same card format, used for a read-only route where correlation{" "}
            <em>clears</em> the endpoint: nothing to fix, and the PR review
            records why:
          </p>

          <SpecCard
            method="GET"
            path="/v1/workspaces/{wsId}/invoices"
            summary="Lists invoices visible to the requesting identity, paginated."
            source="spec · invoices.v1.yaml (invented for this example)"
            tags={["workspaces", "invoices", "read-only"]}
            flags={[
              {
                label: "checked",
                text: "Listing is scoped to the requesting identity's workspace membership.",
              },
              {
                label: "checked",
                text: "No write semantics; irreversible-impact signals do not apply.",
              },
            ]}
          />

          <p>
            That is the shape of the whole bet: every signal correlated, every
            conclusion carrying its evidence, and the developer's time spent
            only where the cordon actually tightened.
          </p>
        </div>
      </div>
    </div>
  );
}
