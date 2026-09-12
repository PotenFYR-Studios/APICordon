# Security Policy

## Supported surface

APICordon is in early development. The **supported security surface** today is:

- The documentation site (static content served from GitHub Pages at `apicordon.docs.potenfyr.in`)
- The build/deploy workflow (`.github/workflows/docs-pages.yml`) and repository templates

There is no released runtime, service or tool yet. Reports about future-facing *design* are also welcome when they concern the project's stated security principles (for example, secret handling in findings), but they cannot be "fixed" until the relevant code exists; treat them as design feedback.

## Reporting a vulnerability

**Please do not report vulnerabilities in public issues, discussions or pull requests.**

Use [GitHub's private vulnerability reporting](https://github.com/PotenFYR-Studios/APICordon/security/advisories/new) for this repository. Include, when possible:

- What you believe is vulnerable and where
- How you confirmed it (steps or evidence, no exploit chains needed; a proof of impact is enough to start)
- The impact as you understand it

### Expectations

- We triage reports as capacity allows; we don't publish hard SLAs we can't guarantee.
- We will credit you in release notes by default. Tell us if you prefer to stay anonymous.
- Please give us a reasonable window to investigate and ship a fix before public disclosure, and coordinate timing with us.

### Scope boundaries

- Only test against resources you own or control. Do not test against third-party services that host PotenFYR content (e.g. Pages, Discord).
- Reports that require access you were not granted, or that degrade service for others, are out of scope.

## Handling secrets

Secrets are capabilities, not report data, and they do not belong in this repository under any circumstance:

- **Never** put credentials, tokens, cookies or private keys in issues, pull requests, documentation, examples or screenshots.
- If you believe you have found a leaked secret **in** this repository: revoke and rotate it first, then report privately as above. Do not open a public issue for it.
- Documentation examples deliberately use invented routes and reserved hostnames (`.invalid`). Please keep it that way in contributions.

## Non-confidential security feedback

Hardening suggestions that are not vulnerabilities (for example, workflow permission tightening) can go through the [security concern issue template](https://github.com/PotenFYR-Studios/APICordon/issues/new/choose) with the `security` label.

---

Made with ❤️ by [PotenFYR Studios](https://github.com/PotenFYR-Studios) · [potenfyr.in](https://potenfyr.in)
