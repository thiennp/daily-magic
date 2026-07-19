# Reports — known issues

## REPORTS-001 — Job history looked empty after sending tasks

**Symptom:** `/reports` showed “No agent runs match this filter yet” even after successful tasks.

**Cause:** Job history is local-first (`localStorage`) plus in-memory server sessions. The list page did not refresh when the browser cache updated, and `useAgentRunRecordSync` reopened its WebSocket on every render.

**Fix:** Keep a global cache listener in `AppShell`, stabilize the record-sync hook, merge API + cached runs with client-side filters, and refresh the list when the cache changes.

## REPORTS-002 — Job result showed `[[NEXT_ACTIONS]]` as raw text

**Symptom:** On `/reports/[runId]`, completed results rendered the full `resultOutput` in a `<pre>`, including the `[[NEXT_ACTIONS]]` marker and numbered list, instead of suggested-next-step buttons.

**Cause:** `AgentRunDetailContent` dumped `resultOutput` verbatim and never reused the live-terminal next-actions parser/UI.

**Fix:** Split result text with `splitAgentRunResultForDisplay`, hide the marker block from the `<pre>`, and render `AgentLiveTerminalNextActions` buttons that open Send a task with the chosen prompt.

## REPORTS-003 — Continue finished job with Mac CLI context

**Symptom:** After a job finished, next-action / re-open links started a brand-new CLI thread instead of continuing the last Mac conversation.

**Cause:** Composer always treated the first prompt after navigation as a fresh turn; finished live sessions were cleared from localStorage.

**Fix:** Persist finished sessions, honor `continueSession=1` (and restored finished threads) for `--continue`, and expose **Continue conversation** on the job detail page.

## REPORTS-004 — Continue conversation only via chips / button

**Symptom:** After a completed job, users could pick a suggested next step or open an empty continue session, but could not type a custom follow-up beside those suggestions.

**Cause:** Job result UI only rendered next-action chips and a Continue conversation link — no freeform continue field.

**Fix:** Add an auto-growing, non-resizable textarea under suggested next steps; Enter sends (Shift+Enter newline) into Send-a-task with `continueSession=1`. `shouldSubmitContinueMessageOnKeyDown.test.ts` (REPORTS-004).

## REPORTS-005 — Job history spammed `agent-runs?scope=all` while a run stayed RUNNING

**Symptom:** Network tab showed hundreds of `agent-runs?scope=all` and `first-task-sent` POSTs while job status never changed.

**Cause:** Per-run SSE replay re-fired refresh on every historical event; `useAgentRunsActiveSse` depended on the full `runs` array (reconnect on cache bump); `upsertAgentRunLocalCache` posted first-task-sent on every write.

**Fix:** Stable `activeRunIdsKey` deps, `afterSeq` cursor + refresh only on `status.*` / `terminal.end`; idempotent `markOnboardingFirstTaskSent`; debounced onboarding reload. `shouldRefreshAgentRunsOnSseEvent.test.ts` (REPORTS-005).
