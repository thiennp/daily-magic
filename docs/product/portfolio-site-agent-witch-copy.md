# Portfolio site — Agent Witch copy (thiennp.github.io)

Use this when updating [https://thiennp.github.io/](https://thiennp.github.io/) to match [product-pillars.md](product-pillars.md) and [philosophy-and-copy-guideline.md](philosophy-and-copy-guideline.md).

Cloud agents on **`thiennp/daily-magic`** cannot push **`thiennp/thiennp.github.io`** until a PAT is configured. Canonical HTML lives in [`external/thiennp.github.io/`](../../external/thiennp.github.io/). Portfolio no longer auto-syncs via CI — run `bash .agents/scripts/pushThiennpGithubIo.sh` manually with the token (`THIENNP_GITHUB_IO_DEPLOY_TOKEN` or `GITHUB_TOKEN`) when the portfolio changes (or `npm run portfolio:push-github-io`).

## `index.html` — Featured Projects → Agent Witch card

Replace the card body with:

- **Product one-liner:** web control plane for Mac (+ optional Cursor Cloud), team dispatch, **Reports**, shared **Playbooks** — not IDE-only.
- **Core job + four pillars** paragraph (see committed `index.html` on branch `cursor/philosophy-copy-guideline-7d63` in this repo’s export below).
- **Launch URL:** `https://www.agentwitch.com` (with `rel="noopener"`).
- Bullets: AWC/WS security, workflow checkpoints, honest run UX, one dispatch runtime for library/marketplace/playbooks.

## `agent-witch-case-study.html`

- Tagline: Mac-first, browser-visible, team-ready.
- Add **Product pillars (2026)** section before “The Problem”.
- Launch link: `https://www.agentwitch.com`.

## Canonical wording (English)

**Core job:** Run a trusted agent on a computer you control, see what happened in the browser, reuse what worked.

**Pillars:** easy authoring · learn from usage (human approval) · efficient memory from past Runs · team learning via shared Playbooks and Reports.

**Avoid:** “Daily Magic” as product name, “Job history” (use **Reports**), “harness” in user-facing marketing (use **Playbook**).
