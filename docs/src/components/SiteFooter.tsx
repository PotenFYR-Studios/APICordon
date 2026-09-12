import {
  DISCORD_URL,
  ORG_URL,
  REPO_URL,
  WEBSITE_URL,
} from "../routes";

/** Full-bleed 3-zone footer (SPEC §5.2). */
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="sf-inner">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-[420px]">
            <div className="flex items-center gap-2 font-mono text-[0.95em] font-bold text-white">
              <img
                src="/favicon.png"
                alt=""
                width={28}
                height={28}
                className="rounded-full ring-1 ring-brand-violet/40"
              />
              APICordon
              <span
                className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-brand-violet to-brand-pink"
                aria-hidden
              />
            </div>
            <p className="mt-3 text-[0.8em] leading-relaxed text-muted">
              The GitHub-native security layer for APIs, discovering the API
              your code actually exposes, correlating every signal, and turning
              findings into pull-request feedback developers can act on.
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-5 font-mono text-[0.78em] md:justify-end">
            <a className="sf-link" href={ORG_URL} target="_blank" rel="noopener">
              GitHub Org
            </a>
            <a className="sf-link" href={WEBSITE_URL} target="_blank" rel="noopener">
              potenfyr.in
            </a>
            <a className="sf-link" href={DISCORD_URL} target="_blank" rel="noopener">
              Support Discord
            </a>
            <a className="sf-link" href={REPO_URL} target="_blank" rel="noopener">
              Repository
            </a>
            <a
              className="sf-link"
              href="https://github.com/PotenFYR-Studios/APICordon/blob/master/LICENSE"
              target="_blank"
              rel="noopener"
            >
              License
            </a>
            <a className="sf-link accent" href="/docs/">
              Docs
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-2 border-t border-line-light pt-4 text-[0.75em] text-faint sm:flex-row">
          <span>
            © {new Date().getFullYear()} PotenFYR Studios. Released under the
            Apache License 2.0 with the Commons Clause.
          </span>
          <span>Crafted with ♥ for API builders.</span>
        </div>
      </div>
    </footer>
  );
}
