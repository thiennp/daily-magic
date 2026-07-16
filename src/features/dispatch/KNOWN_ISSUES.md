# Dispatch — known issues

## DISPATCH-001 — Localhost dev dashboard cannot exercise team delegation

**Symptom:** `AGENT_WITCH_DEV_DASHBOARD=1` supports self-dispatch and writer sessions, but not cross-user team dispatch or approval.

**Root cause:** Team dispatch requires authenticated sessions, Neon rows for `groups` / `group_memberships`, and published capabilities via `/api/dispatch/targets`. Dev mode uses a single synthetic dashboard user and in-memory agent runs.

**Fix:** Use two signed-in users in a shared company group for team-delegation QA. See `/showcases/agent-delegates-inside-your-company` and `public/dev-team-dispatch-demo.html` for mock UI screenshots.

**Regression test:** `teamDispatchShowcaseScreens.test.ts` (article + screen paths).
