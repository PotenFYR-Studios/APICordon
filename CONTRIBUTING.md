# Contributing to APICordon

Thanks for helping build APICordon. This project is in **early development**, and this page describes exactly what exists today, nothing more.

## What you can contribute to right now

| Area | State |
|---|---|
| **Documentation** (this site + README) | ✅ Live: the primary way to contribute today |
| **Use cases & requirements** | ✅ Open an issue describing the API surface you want covered |
| **Bug reports** | ✅ For the docs site, templates and workflows |
| **Security reports** | ⚠️ Privately only; see [SECURITY.md](SECURITY.md) |
| **Analysis engine code** | 🚧 Not yet: the discovery/correlation/feedback engine is in design; watch the repo |

## Working on the documentation site

The docs site (`docs/`) is a [Vite](https://vite.dev) + React + TypeScript app managed with [Bun](https://bun.sh) and Tailwind CSS v4.

```bash
# one-time
git clone https://github.com/PotenFYR-Studios/APICordon.git
cd APICordon/docs
bun install

# development
bun run dev          # dev server with hot reload (http://localhost:5177)

# validation
bun run typecheck    # tsc --noEmit
bun run build        # production build into docs/dist

# inspect the production build locally
bun run build && python3 -m http.server 4177 --directory dist
# then open http://127.0.0.1:4177/
```

CI (`.github/workflows/docs-pages.yml`) runs the same typecheck + build on every pull request, and deploys `docs/dist` to GitHub Pages from `master`.

### Docs authoring notes

- Content lives in `docs/src/pages/`; every page must be registered in `docs/src/routes.ts` (that table drives titles, canonical URLs, the sidebar, search and the sitemap).
- New routes are emitted automatically as static HTML by the `multiPageEmit` plugin in `docs/vite.config.ts`; also add them to `docs/public/sitemap.xml`.
- Anything that is not shipped behavior must be clearly labeled as design intent or illustrative. Examples use invented routes and reserved hostnames (`.invalid`), never real targets.
- Visual changes should follow the PotenFYR design system tokens in `docs/src/index.css`; don't introduce one-off colors or fonts.

## Filing issues

Pick the matching template when you [open an issue](https://github.com/PotenFYR-Studios/APICordon/issues/new/choose):

- **Bug report**: something in the docs site, templates or workflows is broken
- **Feature request**: capability you want APICordon to have (use cases > solutions)
- **Documentation**: something here is wrong, unclear or missing
- **Security concern**: *non-confidential* security feedback; see below for confidential reports
- **Question**: anything else

**Never include credentials, tokens or private data in issues, pull requests or screenshots.**

## Pull requests

1. Fork, create a branch, keep the change focused.
2. Run `bun run typecheck` and `bun run build` in `docs/`; CI runs both and the build must pass.
3. Describe *what* and *why*; link the issue if there is one.
4. For docs changes: read the page on the built site, not just the diff.

## Licensing

By contributing, you agree that your contributions are licensed under the [Apache License 2.0 with the Commons Clause](LICENSE), the same license as the rest of the project. The LICENSE file is authoritative.

---

Made with ❤️ by [PotenFYR Studios](https://github.com/PotenFYR-Studios) · [potenfyr.in](https://potenfyr.in)
