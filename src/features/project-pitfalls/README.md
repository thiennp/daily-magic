# Project pitfalls

Per-project registry of known pitfalls (symptom → cause → avoidance + a check). **AWC is the source of truth**; local caches (a later Mac SQLite mirror) sync from the list API.

## Registry

- **Slug:** `project-pitfalls`
- **Feature path:** `src/features/project-pitfalls` (FSA)
- **Migration:** `db/migrations/067-project-pitfalls.sql` (runtime `ensureProjectPitfallsSchema` mirrors it and re-syncs seed rows from `PROJECT_PITFALL_SEEDS`)

## Rules

| Rule     | Value                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------ |
| Seeds    | `project_id NULL`, `source = seed`, platform-owned and read-only (1 shipped: secrets-in-logs; daily-magic-only rules moved to the AgentWitch project in migration 094) |
| Override | Upsert a seed id with a projectId → that project's own row; the global seed row is never changed |
| Retire   | Upsert with `source: "retired"`; hidden from list unless `includeRetired=true`                   |
| Cap      | ≤ 64 active (non-retired) per project, seeds + project rows merged                               |
| Limits   | symptom ≤ 120, cause ≤ 200, avoidance ≤ 280, check `{ kind: command \| id, value }`              |
| Hits     | `project_pitfall_hits` per project (seed rows stay read-only); `lastSeenAt` only moves forward   |
| ACL      | Project owner or active member (device token → paired user, else signed-in session)              |

## HTTP (`/api/agent-witch/projects/[projectId]/pitfalls`)

- `GET` list — `?includeRetired=true`, `?format=bot` → `{ text: "id|avoidance\n…" }`
- `PUT` / `POST` upsert — full content, no counters; 409 `limit_exceeded` past the cap
- `GET /[pitfallId]` — one merged pitfall (retired included)
- `POST /[pitfallId]/hit` — record_hit; optional `{ count, seenAt }` for batched local hits
- `GET /../rules/usage` — rule-compare: all-time hitCount + lastHitAt + duplicate/overlap pairs (`?days=1..90`, `windowDays` null until per-hit events exist)
- `POST /../rules/[ruleId]/drop` · `POST /../rules/[ruleId]/restore` — rule-compare Drop + Undo. **Owner only** (member 403). Drop = retire (same full-content upsert as the AWL Pitfalls tab, `source: "retired"`); restore = `source: "project"`, 409 `limit_exceeded` past the cap. Seeds are retired per project via an override row. Idempotent (`changed: false`, no write). Each real change writes one Access log line (`rule.dropped` / `rule.restored`, migration 097).

Matching inside check_context, preflight, and local MCP tools are later items and are not in this module.
