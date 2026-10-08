# skills (AWL)

Local skill retrieval for coding tools (auto-skill plan, phase 2). The agent
chooses; nothing runs automatically.

## Owns

- `skill_index`, `skill_call`, `skill_find_log` tables in `knowledge.db`
  (idempotent bootstrap in `skillIndexSchema`)
- Index of the installed skills (`project-data/<id>/skills/<skill>/` mirror
  written by the History skill pull): `indexSkill`, `removeSkill`,
  `reindexProject`, `refreshSkillIndex` (startup + after each History tick)
- Hybrid search `findSkills`: in-memory BM25 + cosine over nomic-embed-text
  vectors, fused with reciprocal rank fusion; keyword-only when Ollama is
  down; optional Ollama re-rank of the top 8 with `AGENT_WITCH_SKILLS_RERANK=1`
- MCP tools `skills_find` / `skills_run` (`createSkillTools`, mounted by the
  `mcp` slice) and `gateSkillCall` (checks, timeout, `skill_call` log). Phase 3
  extends `GATE_CHECKS` for script runs
- The one-line run-prompt instruction (`withSkillsFindInstruction`), added only
  for writers that have the AgentWitch MCP registered and projects with at
  least one indexed skill

## Does not own

- Skill sync from AWC (History tick / project-skill-share)
- MCP transports and JSON-RPC (`mcp`)

## Known gaps

- `run_id` is `NULL` until the host exports `AGENT_WITCH_RUN_ID` to the CLI
- Claude CLI and antigravity have no AgentWitch MCP registration, so they get
  neither tools nor the instruction line
