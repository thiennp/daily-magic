# Portfolio site — Agent Witch copy (thiennp.github.io)

Use this when updating [https://thiennp.github.io/](https://thiennp.github.io/) to match [product-pillars.md](product-pillars.md) and [philosophy-and-copy-guideline.md](philosophy-and-copy-guideline.md).

Cloud agents on **`thiennp/daily-magic`** cannot push **`thiennp/thiennp.github.io`** until a PAT is configured. Use one of:

1. **Canonical HTML** in this repo: [`external/thiennp.github.io/`](../../external/thiennp.github.io/) — run `npm run portfolio:push-github-io` locally (needs push access), or
2. **GitHub Actions** workflow **Sync thiennp.github.io** after adding repo secret `THIENNP_GITHUB_IO_DEPLOY_TOKEN` (fine-grained PAT with `contents: write` on `thiennp.github.io`).

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

**Core job:** Run a trusted agent on a Mac you control, see what happened in the browser, reuse what worked.

**Pillars:** easy authoring · learn from usage (human approval) · efficient memory from past Runs · team learning via shared Playbooks and Reports.

**Avoid:** “Daily Magic” as product name, “Job history” (use **Reports**), “harness” in user-facing marketing (use **Playbook**).
