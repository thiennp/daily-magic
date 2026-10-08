# skills (AWL)

Local skill retrieval and script runs for coding tools (auto-skill plan,
phases 2 and 3). The agent chooses; nothing runs automatically.

## Owns

- `skill_index`, `skill_call`, `skill_find_log`, `skill_script_approval`,
  `skill_baseline` tables in `knowledge.db` (idempotent bootstrap in
  `skillIndexSchema`)
- Index of the installed skills (`project-data/<id>/skills/<skill>/` mirror
  written by the History skill pull): `indexSkill`, `removeSkill`,
  `reindexProject`, `refreshSkillIndex` (startup + after each History tick)
- Hybrid search `findSkills`: in-memory BM25 + cosine over nomic-embed-text
  vectors, fused with reciprocal rank fusion; keyword-only when Ollama is
  down; optional Ollama re-rank of the top 8 with `AGENT_WITCH_SKILLS_RERANK=1`
- MCP tools `skills_find` / `skills_run` (`createSkillTools`, mounted by the
  `mcp` slice) and `gateSkillCall` (checks, holdout, timeout, `skill_call` log)
- The one-line run-prompt instruction (`withSkillsFindInstruction`), added only
  for writers that have the AgentWitch MCP registered and projects with at
  least one indexed skill

### Phase 3: scripts and savings

- **Bundle**: a skill body may end with an HTML comment holding
  `{manifest, files}` (`@agent-witch/shared/projectSkills`: `embedSkillBundle`,
  `validateSkillBundle`). It rides inside the body, so the existing content hash,
  publish path and pull already cover it. Caps: 64 KB per script, 10 scripts,
  256 KB total; no binary, no secrets.
- **Seeding** (`seedSkillScripts`, run by `reindexProject`): verifies every
  sha256, writes `skills/<skill>/scripts/*` mode 0555 plus `manifest.json`,
  records `scripts.seed.json`. A mismatch removes the scripts, logs, marks the
  skill `unverified` and leaves `has_scripts = 0`.
- **Approval**: a script version (pinned by sha256) is blocked until the owner
  approves it (`skill_script_approval`). `project-history`
  (`syncSkillScriptApprovals`, called from the History tick) raises a
  `script_approval` question in AWC and copies the answer back.
- **Run** (`skills_run` with `script`): `resolveScriptCall` checks pause switch,
  manifest entry, on-disk hash, approval, string-only params (positional argv,
  never a shell string) and that the realpath of `cwd` is inside the project
  folder. `runSkillScript` spawns with an argv array, minimal env (proxies only
  for declared-network scripts), timeout from the manifest (default 60 s, max
  300 s) and 64 KB output cap. Failures return `{ok:false, error, fallback}`.
- **Savings**: `settleRunSkillCalls` (run-finished hook) attributes the run's
  tokens (writer-reported, else a length estimate) evenly to its `skills_run`
  calls. First successful call sets the baseline; one call in
  `SKILL_HOLDOUT_EVERY` (10) is a holdout whose tokens refresh the baseline as a
  running median; fewer than 3 samples is an estimate (≈). `computeSkillSavings`
  and `computeSkillWeekly` feed the heartbeat (`buildSkillStatsPayload`).

## Does not own

- Skill sync from AWC (History tick / project-skill-share)
- MCP transports and JSON-RPC (`mcp`)
- Script proposal, replay and the owner question (`project-history`)

## Known gaps

- Scripts are not OS-sandboxed: `write` / `network` permissions are declared and
  shown to the owner, enforced only by env stripping (no proxies) and cwd
  confinement.
- Savings attribute a whole run's tokens to its skill calls; baselines seeded
  from the clustered runs are not wired yet (the first call seeds it).
- Claude CLI and antigravity have no AgentWitch MCP registration (Claude's
  headless allowlist is a safety profile and was left unchanged), so they get
  neither tools nor the instruction line
