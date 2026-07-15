# Reports — known issues

## REPORTS-001 — Job history looked empty after sending tasks

**Symptom:** `/reports` showed “No agent runs match this filter yet” even after successful tasks.

**Cause:** Job history is local-first (`localStorage`) plus in-memory server sessions. The list page did not refresh when the browser cache updated, and `useAgentRunRecordSync` reopened its WebSocket on every render.

**Fix:** Keep a global cache listener in `AppShell`, stabilize the record-sync hook, merge API + cached runs with client-side filters, and refresh the list when the cache changes.
