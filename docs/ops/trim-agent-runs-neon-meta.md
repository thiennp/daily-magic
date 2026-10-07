# Trim existing Neon agent_runs bodies → meta-only (≤120)

**Status:** Plan + script READY. **Do NOT auto-apply** against production. Soft GO Soft from Lead/Product required before running.

**Tip:** `fix/awc-neon-agent-runs-meta-only-r2` (create path already meta-only; this trims **existing** rows).

**Cap:** `AGENT_RUN_NEON_META_MAX_CHARS = 120` (same as `toAgentRunNeonMetaText` / History scrub).

---

## What gets trimmed

| Target | How |
|---|---|
| `agent_runs.prompt` | Collapse whitespace conceptually via SQL trim of oversized text → `LEFT(..., 120)` (see script). Rows already ≤120 unchanged. |
| `agent_runs.result_output` | Same when `char_length > 120` |
| `agent_runs.denial_reason` | Same when `char_length > 120` |
| `agent_run_events.payload` | For `kind = 'terminal.end'`, shrink `payload->>'output'` (and rewrite JSONB) to ≤120 when present |

Script: `scripts/trim-agent-runs-neon-meta.sql`

---

## Irreversible risk (HARD)

- After trim, **full bodies cannot be recovered from Neon**.
- Local project computer may still hold evidence under `~/.agent-witch/reports/` and (for new runs) `~/.agent-witch/agent-run-prompts/` / `AGENT_WITCH_AGENT_RUN_LOCAL_PROMPTS_DIR` — see `docs/architecture/project-composition.md`.
- Pending approvals created **before** this tip may have only Neon prompt; after create-path land they keep full prompt locally. Trim will still shrink Neon columns for those rows — ensure Soft GO Soft timing does not strand active pending_approval rows that lack a local prompt file.
- **No automatic backup.** Take a Neon snapshot / logical dump of the four surfaces above before Soft GO Soft if recovery might be needed.

---

## Soft GO Soft — how to run (manual)

1. Snapshot Neon (branch or `pg_dump` of `agent_runs` + `agent_run_events`).
2. Run dry-run counts (below) and record numbers in the Soft GO Soft note.
3. Apply on a staging branch first when available.
4. Apply production:

```bash
# Example — use your existing Neon SQL runner / psql with DATABASE_URL
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f scripts/trim-agent-runs-neon-meta.sql
```

5. Re-run count queries; oversized rows should be 0.
6. Smoke: History Load older still shows ≤120 summaries; new createAgentRun still ≤120 on Neon.

---

## Dry-run / row-count queries

```sql
-- Oversized agent_runs bodies
SELECT
  count(*) FILTER (WHERE char_length(prompt) > 120) AS prompt_over,
  count(*) FILTER (WHERE result_output IS NOT NULL AND char_length(result_output) > 120) AS result_over,
  count(*) FILTER (WHERE denial_reason IS NOT NULL AND char_length(denial_reason) > 120) AS denial_over,
  count(*) AS total_runs
FROM agent_runs;

-- terminal.end events with long output
SELECT count(*) AS terminal_end_output_over
FROM agent_run_events
WHERE kind = 'terminal.end'
  AND jsonb_typeof(payload->'output') = 'string'
  AND char_length(payload->>'output') > 120;

-- Pending approvals that would lose Neon full prompt (timing risk)
SELECT count(*) AS pending_approval_prompt_over
FROM agent_runs
WHERE status = 'pending_approval'
  AND char_length(prompt) > 120;
```

---

## Out of scope

- Soft LOCK Soft / Soft land Soft / Soft FF Soft — operator after Soft GO Soft.
- Project sync module tip (separate worktree).
- Re-expanding local prompts into Neon (forbidden).
