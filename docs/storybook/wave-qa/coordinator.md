# Wave QA coordinator (main agent)

The **main agent does not** capture, score, or fix pages. It:

1. Keeps `progress.json` queue state honest (`reset-agent-roles` after policy changes).
2. Spawns **one cloud subagent per catalog page** (short-lived branch optional).
3. **Ship to `main` directly** — no PRs. After `npm run ci` passes locally (or green GitHub Actions on the commit), `git push origin main`. Never push with a red CI (Railway deploys from `main`).

## Subagent branch naming

`cursor/wave-qa-<deployable-lower>-<pageId>-b63b`  
Example: `cursor/wave-qa-awc-home-marketing-b63b`

## Subagent task (one page)

```bash
npm run storybook:wave:page-brief -- AWC home-marketing
```

Serve captures with `python3 -m http.server 6008` inside `storybook-static` (avoid `npx serve` — it redirects `/iframe.html` and breaks capture).

Copy the printed brief into a **cloud** background agent. Subagent must:

- Build/serve Storybook, `storybook:wave:capture` for that page only.
- For each role `ux` → `copy` → `ui` → `product`: reviewer A + B (PNG evidence), fix `mustFix`, save JSON under `docs/storybook/wave-qa/reviews/`, `storybook:wave:record-agent`.
- Run **tester + dx** on the same Storybook build; commit + push **`main`** only when **all six roles** pass (`quality-bar.md`).
- **Do not** open PRs for wave QA. Do **not** touch other pages’ review files.

## Parallelism

- **Never** two subagents on the same page.
- Different pages = different branches → safe parallel cloud agents.
- `progress.json` conflicts: rebase on `main` before push; one page per branch until merged.
- **Strict bar:** read `quality-bar.md` — no sympathy scores; AWC `ui`/`ux` on public pages use **computerUse** zoom evidence.

## Main agent report

After spawning: list page id, branch name, PR URL when available, and `progress.json` counts (`passed` roles / 204).

## Post-sequential UX audit (mandatory)

After **all 34 pages** have `allRolesPassed: true` on `main` (sequential queue + any stragglers):

1. Follow **`QUEUE_UX_AUDIT.md`** — **ux only**, one page at a time, same subagent discipline as first pass.
2. Recapture when fixes land; reviewer A + B JSON under `reviews/.../ux-audit-1/`.
3. AWC marketing/auth/doc pages: **computerUse** walk + zoom evidence on ux where `quality-bar.md` requires it.
4. Do **not** start the UI audit wave until UX audit queue is fully `done`.

## Final UI audit (mandatory)

After **UX audit wave** completes (and first-pass ux–product was already done):

1. Spawn cloud subagents with brief: _audit ui only, round-audit-1, read `ui-deep-inspection.md`_.
2. Start with pages merged earliest (**`home-marketing`**, **`login`**, …) — highest risk of shallow first pass.
3. Revoke + fix + push fixes to `main` when audit finds `obviousVisualDefects: "present"` (CI green first).
4. Coordinator does **not** report “100% complete” until audit wave finishes.
