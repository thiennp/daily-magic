# Reports — known issues

## REPORTS-001 — Job history looked empty after sending tasks

**Symptom:** `/reports` showed “No agent runs match this filter yet” even after successful tasks.

**Cause:** Job history is local-first (`localStorage`) plus in-memory server sessions. The list page did not refresh when the browser cache updated, and `useAgentRunRecordSync` reopened its WebSocket on every render.

**Fix:** Keep a global cache listener in `AppShell`, stabilize the record-sync hook, merge API + cached runs with client-side filters, and refresh the list when the cache changes.

## REPORTS-002 — Job result showed `[[NEXT_ACTIONS]]` as raw text

**Symptom:** On `/reports/[runId]`, completed results rendered the full `resultOutput` in a `<pre>`, including the `[[NEXT_ACTIONS]]` marker and numbered list, instead of suggested-next-step buttons.

**Cause:** `AgentRunDetailContent` dumped `resultOutput` verbatim and never reused the live-terminal next-actions parser/UI.

**Fix:** Split result text with `splitAgentRunResultForDisplay`, hide the marker block from the `<pre>`, and render `AgentLiveTerminalNextActions` buttons that open Send a task with the chosen prompt.
