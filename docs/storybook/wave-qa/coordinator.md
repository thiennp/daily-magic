# Wave QA coordinator (main agent)

The **main agent does not** capture, score, or fix pages. It:

1. Keeps `progress.json` queue state honest (`reset-agent-roles` after policy changes).
2. Spawns **one cloud subagent per catalog page** (short-lived branch optional).
3. **Ship to `main` directly** — no PRs. After architecture review SHIP and `npm run ci` passes locally (or green GitHub Actions on the commit), fast-forward `main` (Railway deploys from `main`). Never push with a red CI.

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

## Post-completion waves (mandatory)

After first-pass **34/34** on `main`, run **nine full-catalog waves** in order — see **`QUEUE_POST_COMPLETION_WAVES.md`**:

1. UX → 2. UI → 3. **Copy (text)** → 4. **Product (features)** → 5. **Performance** → 6. Tester → 7. DX → 8. Accessibility → 9. Interaction (AWC).

Each wave: **one page at a time**, same strict gate as first pass. Set **`CURRENT_WAVE.md`** + **`CURRENT_PAGE.md`**.

## Final UI audit (wave 2)

Wave **`ui-audit-1`** in the master plan — ui only, `ui-deep-inspection.md`, ui **100** on AWC. Highest-risk pages first in catalog order unless `CURRENT_PAGE` says otherwise.

Coordinator does **not** report “100% complete” until **`QUEUE_POST_COMPLETION_WAVES.md`** + **`COMPLETE.md`** are satisfied.
