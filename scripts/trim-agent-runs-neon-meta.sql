-- =============================================================================
-- trim-agent-runs-neon-meta.sql
-- Soft GO Soft ONLY — irreversible trim of existing Neon bodies to ≤120 chars.
-- Cap matches AGENT_RUN_NEON_META_MAX_CHARS / toAgentRunNeonMetaText.
-- Do NOT auto-run in CI or migrations. See docs/ops/trim-agent-runs-neon-meta.md.
-- =============================================================================

BEGIN;

-- agent_runs.prompt
UPDATE agent_runs
SET prompt = left(prompt, 120),
    updated_at = NOW()
WHERE char_length(prompt) > 120;

-- agent_runs.result_output
UPDATE agent_runs
SET result_output = left(result_output, 120),
    updated_at = NOW()
WHERE result_output IS NOT NULL
  AND char_length(result_output) > 120;

-- agent_runs.denial_reason
UPDATE agent_runs
SET denial_reason = left(denial_reason, 120),
    updated_at = NOW()
WHERE denial_reason IS NOT NULL
  AND char_length(denial_reason) > 120;

-- agent_run_events.payload — terminal.end output key
UPDATE agent_run_events
SET payload = jsonb_set(
  payload,
  '{output}',
  to_jsonb(left(payload->>'output', 120))
)
WHERE kind = 'terminal.end'
  AND jsonb_typeof(payload->'output') = 'string'
  AND char_length(payload->>'output') > 120;

COMMIT;

-- Post-check (expect all zero):
-- SELECT count(*) FILTER (WHERE char_length(prompt) > 120) FROM agent_runs;
-- SELECT count(*) FILTER (WHERE result_output IS NOT NULL AND char_length(result_output) > 120) FROM agent_runs;
-- SELECT count(*) FILTER (WHERE denial_reason IS NOT NULL AND char_length(denial_reason) > 120) FROM agent_runs;
-- SELECT count(*) FROM agent_run_events WHERE kind = 'terminal.end' AND jsonb_typeof(payload->'output') = 'string' AND char_length(payload->>'output') > 120;
