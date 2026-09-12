import {
  DISCORD_URL,
  ORG_URL,
  REPO_URL,
  WEBSITE_URL,
} from "../routes";

/** /about, the project, the studio, licensing, contact. */
export default function About() {
  return (
    <div className="dot-backdrop">
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-16">
        <nav
          aria-label="Breadcrumb"
          className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-faint"
        >
          APICordon Docs
        </nav>
        <h1 className="grad-text text-[clamp(2em,4.4vw,3em)] font-extrabold leading-[1.1] tracking-tight">
          About
        </h1>

        <div className="doc-content mt-8">
          <h2 id="the-project">The project</h2>
          <p>
            <strong>APICordon</strong> is the GitHub-native security layer for
            APIs. It discovers the API your code actually exposes, correlates
            source, contracts and security tools, and turns findings into
            precise pull-request feedback developers can act on.
          </p>
          <p>
            The name is the job: a cordon, a line drawn around a site so only
            cleared things cross. APICordon draws that line around your API
            surface and reviews what tries to cross it, inside the pull-request
            workflow your team already uses.
          </p>
          <p>
            The project is developed in the open in{" "}
            <a href={REPO_URL}>its own repository</a>. Start with{" "}
            <a href="/docs/how-it-works/">how it works</a>, check{" "}
            <a href="/docs/roadmap/">where it is heading</a>, or read{" "}
            <a href="/docs/getting-started/">where things stand today</a>.
          </p>

          <h2 id="potenfyr-studios">PotenFYR Studios</h2>
          <p>
            APICordon is built by{" "}
            <a href={ORG_URL}>PotenFYR Studios</a>, an open-source studio
            building security and developer tooling, from firewall
            management to authentication infrastructure to API assurance.
          </p>
          <ul>
            <li>
              <a href={WEBSITE_URL}>potenfyr.in</a>, the studio's home
            </li>
            <li>
              <a href={ORG_URL}>github.com/PotenFYR-Studios</a>, every public
              repository
            </li>
            <li>
              <a href={DISCORD_URL}>Support Discord</a>, questions, ideas and
              help across the ecosystem
            </li>
          </ul>

          <h2 id="license">License</h2>
          <p>
            APICordon is released under{" "}
            <strong>Apache-2.0 with the Commons Clause</strong>. The
            plain-language version:
          </p>
          <h3>What you can do</h3>
          <p>
            Fork it, modify it, use it, self-host it and redistribute it, free
            of charge. That includes commercial use and building products or
            services around it.
          </p>
          <h3>What you cannot do</h3>
          <p>
            Sell the software itself, or offer a paid product or service whose
            value derives entirely or substantially from the functionality of
            the software. The license also does not grant rights to use PotenFYR
            names or trademarks.
          </p>
          <h3>Keep the notices</h3>
          <p>
            Any license notice or attribution required by the Apache License
            must also carry the Commons Clause notice. The complete terms are
            the{" "}
            <a href={`${REPO_URL}/blob/master/LICENSE`}>LICENSE file</a> in the
            repository; that file is authoritative, and this guide only
            explains its intent.
          </p>

          <h2 id="contact">Contact</h2>
          <p>
            Security matters go through{" "}
            <a href="/docs/security/">responsible disclosure</a>, never a
            public issue. Everything else:{" "}
            <a href={`${REPO_URL}/issues`}>open an issue</a> on the repository,
            or find us in the <a href={DISCORD_URL}>Support Discord</a>.
          </p>
          <hr />
          <p className="text-[0.85em] text-muted">
            Made with ❤️ by PotenFYR Studios ·{" "}
            <a href={WEBSITE_URL}>potenfyr.in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
