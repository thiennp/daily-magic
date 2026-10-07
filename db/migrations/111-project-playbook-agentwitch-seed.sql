-- Seed the AgentWitch project (29b404a2-d2be-45bf-8f88-143b675a94f2, see
-- PROJECT_PITFALL_AGENTWITCH_PROJECT_ID) with its first published playbook:
-- "How the AgentWitch team ships" (skill_id how-the-agentwitch-team-ships).
--
-- Safety:
--   * Only when that project exists (local / PGlite / test DBs insert nothing).
--   * Publisher = the project owner (owner-only publish rule).
--   * ON CONFLICT DO NOTHING: an existing row with that skill_id (edited,
--     republished or revoked by the owner) is never touched; the version row
--     is only inserted when the skill row was created here. Rerun-safe.
--   * content_hash = 'sha256:' + lowercase hex of the exact UTF-8 body bytes,
--     same as computeProjectSkillContentHash.
-- Needs 110 (kind column).

WITH body AS (
  SELECT $playbook$# How the AgentWitch team ships

- **Push first.** Rebase on the current main and push fast-forward right away (`--no-verify` is OK, never force). Do not run CI before the push.
- **CI runs after the push.** If it is red, hotfix forward. No reverts unless prod is down.
- **Push continuously.** Do not wait for the previous push to show up on health / LIVE.
- **One place for team talk.** All team comms go through the project chat and the Tasks tab: tasks are created there and status is reported there.
- **Claude in the browser only.** Design, research and AI tests use Claude in the browser (claude.ai). No Codex, no paid Claude API or CLI.
- **Heavy work runs on the Macs.** Builds, full suites and browsers run on MKX52CMWN7 and L92KQX615Q. The shared box stays at least 50% free, with a hard floor of 20% CPU idle and 1.5 GB RAM.
- **Reports: results and tip SHAs only.** Never ETAs. Never print secrets: say only that one exists, its path, or its fingerprint.
$playbook$::TEXT AS md
), target AS (
  SELECT p.id AS project_id, p.owner_user_id
  FROM user_projects p
  WHERE p.id = '29b404a2-d2be-45bf-8f88-143b675a94f2'
), skill AS (
  INSERT INTO project_skills (project_id, skill_id, kind, name, description,
    publisher_user_id, state, published_version, latest_version, content_hash)
  SELECT t.project_id, 'how-the-agentwitch-team-ships', 'playbook',
    'How the AgentWitch team ships',
    'Push first, hotfix forward, talk in project chat + Tasks, heavy work on the Macs.',
    t.owner_user_id, 'published', 1, 1,
    'sha256:' || encode(sha256(convert_to(b.md, 'UTF8')), 'hex')
  FROM target t CROSS JOIN body b
  ON CONFLICT (project_id, skill_id) DO NOTHING
  RETURNING id, publisher_user_id, content_hash
)
INSERT INTO project_skill_versions (skill_row_id, version, body, content_hash,
  byte_size, is_draft, created_by_user_id)
SELECT s.id, 1, b.md, s.content_hash, octet_length(convert_to(b.md, 'UTF8')),
  FALSE, s.publisher_user_id
FROM skill s CROSS JOIN body b;
