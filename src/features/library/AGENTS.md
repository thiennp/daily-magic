# Library — agent instructions

**“Hooks” in tickets/chat** means **Cursor agent hooks** (`.cursor/hooks.json` → `postToolUse` / `stop` architecture + structure checks). It does **not** mean adding React `use*` files under `hooks/` unless the UI truly needs one.

1. Query feature knowledge: `npm run feature-knowledge:query -- "symptom" --feature=library`
2. Read `KNOWN_ISSUES.md` before changing behavior.
3. Add a regression test for every bug fix; document it in `KNOWN_ISSUES.md`.
4. Re-index: `npm run feature-knowledge:index`.
5. Guest drafts: `docs/qa/guest-library-browser-drafts.md`; sync runs from `GuestLibraryDraftSyncListener` in `AppShell`, not only on `/library`.
