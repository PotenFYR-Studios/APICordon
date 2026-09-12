<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:8b5cf6,50:ec4899,100:f97316&height=220&section=header&text=APICordon&fontSize=52&fontColor=ffffff&fontAlignY=34&animation=twinkling" width="100%" alt="APICordon banner"/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&pause=1200&color=8B5CF6&center=true&vCenter=true&width=800&lines=Discover+the+API+your+code+actually+exposes;Correlate+source%2C+contracts+and+security+tools;Precise+pull-request+feedback%2C+where+you+work;In+development%2C+docs+are+live)](https://apicordon.docs.potenfyr.in)

[![Docs](https://img.shields.io/badge/Docs-apicordon.docs.potenfyr.in-8b5cf6?style=for-the-badge&logo=readme&logoColor=white&labelColor=1c1e26)](https://apicordon.docs.potenfyr.in)
[![CI](https://img.shields.io/github/actions/workflow/status/PotenFYR-Studios/APICordon/docs-pages.yml?style=for-the-badge&logo=githubactions&logoColor=white&label=Docs%20CI&labelColor=1c1e26&color=2ea043)](https://github.com/PotenFYR-Studios/APICordon/actions/workflows/docs-pages.yml)
[![License](https://img.shields.io/badge/License-Apache--2.0%20%2B%20Commons%20Clause-8b5cf6?style=for-the-badge&logo=apache&logoColor=white&labelColor=1c1e26)](https://github.com/PotenFYR-Studios/APICordon/blob/master/LICENSE)
[![Website](https://img.shields.io/badge/Website-potenfyr.in-8b5cf6?style=for-the-badge&logo=googlechrome&logoColor=white&labelColor=1c1e26)](https://potenfyr.in)
[![Discord](https://img.shields.io/badge/Discord-Join%20us-5865F2?style=for-the-badge&logo=discord&logoColor=white&labelColor=1c1e26)](https://discord.com/invite/zUaN2FPBec)
[![Profile views](https://komarev.com/ghpvc/?username=PotenFYR-Studios-APICordon&color=ec4899&style=for-the-badge&label=PROFILE+VIEWS&labelColor=1c1e26)](https://github.com/PotenFYR-Studios/APICordon)

[Docs](https://apicordon.docs.potenfyr.in) · [How it works](https://apicordon.docs.potenfyr.in/docs/how-it-works/) · [Examples](https://apicordon.docs.potenfyr.in/examples/) · [Roadmap](https://apicordon.docs.potenfyr.in/docs/roadmap/) · [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md)

</div>

---

## 🚀 What is APICordon?

APICordon is the **GitHub-native security layer for APIs**. It discovers the API your code *actually* exposes, correlates source, contracts and security tools, and turns findings into **precise pull-request feedback** developers can act on.

API security usually fails in three places at once: the inventory drifts from reality (docs say one thing, handlers do another), every security tool reports its own slice of the surface in its own vocabulary, and whatever they find rarely reaches a developer at the moment they can act. APICordon is built to close that loop inside the place developers already work: the repository and its pull requests.

## ⚙️ How it works

One pipeline, three stages:

1. **Discovery**: build an inventory of the API the code actually exposes, from the source that implements it and the contracts that describe it.
2. **Correlation**: fuse source, contract and security-tool signals into single, evidence-carrying findings instead of overlapping alert piles.
3. **Pull-request feedback**: deliver each finding as a precise comment on the pull request that touches the affected surface.

> 📖 Read the full walkthrough in [How it works](https://apicordon.docs.potenfyr.in/docs/how-it-works/). The [examples page](https://apicordon.docs.potenfyr.in/examples/) shows the intended output shape: **illustrative and clearly labeled**, not shipped output.

## 📊 Project status

APICordon is **in early development**. This repository currently ships its documentation platform, community and security files, and CI; the analysis engine itself is being designed and built, with its documentation written ahead of the code so the goals stay explicit.

- **Live today:** docs site at [apicordon.docs.potenfyr.in](https://apicordon.docs.potenfyr.in), contribution and disclosure processes, Pages CI
- **Next:** the discovery → correlation → feedback pipeline, developed in the open
- **Shape it:** open an issue with the API surface *you* would want covered first

## 📚 Documentation

| Page | What's inside |
|---|---|
| [Getting started](https://apicordon.docs.potenfyr.in/docs/getting-started/) | Where the project stands, how to follow along, docs tooling |
| [How it works](https://apicordon.docs.potenfyr.in/docs/how-it-works/) | The discovery → correlation → PR-feedback pipeline |
| [Architecture](https://apicordon.docs.potenfyr.in/docs/architecture/) | Components, data flow, repository layout |
| [Security](https://apicordon.docs.potenfyr.in/docs/security/) | The project's own security posture and disclosure |
| [Roadmap & FAQ](https://apicordon.docs.potenfyr.in/docs/roadmap/) | Direction, non-goals, common questions |
| [Examples](https://apicordon.docs.potenfyr.in/examples/) | Illustrative findings and PR feedback (labeled) |

## 🤝 Contributing

Contributions are welcome: documentation fixes, bug reports and use-case proposals all help while the engine is being built. Start with [CONTRIBUTING.md](CONTRIBUTING.md); the docs site is the one runnable component today and its toolchain is two commands:

```bash
cd docs && bun install && bun run dev
```

## 🔐 Security

Please report suspected vulnerabilities **privately** via [GitHub security advisories](https://github.com/PotenFYR-Studios/APICordon/security/advisories/new), see [SECURITY.md](SECURITY.md) for scope and expectations. Never include secrets in issues or pull requests.

## 📜 License

Licensed under **Apache-2.0 with Commons Clause**; the [LICENSE](https://github.com/PotenFYR-Studios/APICordon/blob/master/LICENSE) file is authoritative. In plain terms: fork, modify, use, self-host and redistribute APICordon for free, including commercial use and building products or services around it. The Commons Clause withholds selling the software itself, or charging for a product or service whose value derives entirely or substantially from its functionality, and PotenFYR names and trademarks stay unlicensed. Keep the required license notices, including the Commons Clause notice. A [plain-language license guide](https://apicordon.docs.potenfyr.in/about/#license) goes deeper on the docs site.

## Contributing

Contributions make the open-source community such an amazing place to learn, inspire and create. Any contributions you make are **greatly appreciated** - see [CONTRIBUTING.md](CONTRIBUTING.md) and the [good first issues](https://github.com/PotenFYR-Studios/APICordon/labels/good%20first%20issue). Security concerns: please use [SECURITY.md](SECURITY.md) (private vulnerability reporting), not public issues.

<a href="https://github.com/PotenFYR-Studios/APICordon/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=PotenFYR-Studios/APICordon" alt="APICordon contributors" />
</a>
<a href="https://github.com/PotenFYR-Studios/APICordon/stargazers">
  <img src="https://img.shields.io/github/stars/PotenFYR-Studios/APICordon?style=social&label=Stars" alt="Live star count" />
</a>
<a href="https://github.com/PotenFYR-Studios/APICordon/network/members">
  <img src="https://img.shields.io/github/forks/PotenFYR-Studios/APICordon?style=social&label=Forks" alt="Live fork count" />
</a>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/PotenFYR-Studios/FYRwall/output/github-snake-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/PotenFYR-Studios/FYRwall/output/github-snake.svg" />
  <img alt="Contribution snake animation" src="https://raw.githubusercontent.com/PotenFYR-Studios/FYRwall/output/github-snake.svg" width="100%" />
</picture>


---

<!-- markdownlint-disable -->


<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:f97316,50:ec4899,100:8b5cf6&height=120&section=footer&text=Made%20with%20%E2%9D%A4%EF%B8%8F%20by%20PotenFYR%20Studios&fontSize=22&fontColor=ffffff&animation=twinkling" width="100%" alt="footer"/>

</div>
<!-- markdownlint-enable -->

---

## ⭐ Star History

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=potenfyr-studios/authcore,potenfyr-studios/statfyr,potenfyr-studios/discord-botlists,potenfyr-studios/vigilfyr,potenfyr-studios/shell-eggs,potenfyr-studios/prog-language-eggs,potenfyr-studios/minecraft-eggs,potenfyr-studios/database-eggs,potenfyr-studios/apicordon,potenfyr-studios/ojaj,potenfyr-studios/fyrwall,potenfyr-studios/echoingdeaths&type=Date&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=potenfyr-studios/authcore,potenfyr-studios/statfyr,potenfyr-studios/discord-botlists,potenfyr-studios/vigilfyr,potenfyr-studios/shell-eggs,potenfyr-studios/prog-language-eggs,potenfyr-studios/minecraft-eggs,potenfyr-studios/database-eggs,potenfyr-studios/apicordon,potenfyr-studios/ojaj,potenfyr-studios/fyrwall,potenfyr-studios/echoingdeaths&type=Date" />
  <img alt="Star history chart for all PotenFYR Studios public repositories" src="https://api.star-history.com/svg?repos=potenfyr-studios/authcore,potenfyr-studios/statfyr,potenfyr-studios/discord-botlists,potenfyr-studios/vigilfyr,potenfyr-studios/shell-eggs,potenfyr-studios/prog-language-eggs,potenfyr-studios/minecraft-eggs,potenfyr-studios/database-eggs,potenfyr-studios/apicordon,potenfyr-studios/ojaj,potenfyr-studios/fyrwall,potenfyr-studios/echoingdeaths&type=Date" width="80%" />
</picture>

Every public PotenFYR Studios repository on one live chart, served by [star-history.com](https://star-history.com).
