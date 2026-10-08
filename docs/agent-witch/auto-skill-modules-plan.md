# Auto skills by module — design and plan

Status: plan (owner approved direction). Replaces the prompt-level repeat detection of the first auto-skill release (ce32df1b23).

## Goal

Skills are created automatically from what an owner already ran, at the level of **modules** (small reusable steps), not whole prompts. A skill is a **combination of agent and tool calls**: the agent decides and fills parameters; **scripts seeded on the owner's computer through AgentWitch Local (AWL)** do the deterministic work. Result: stable output, fewer tokens, thousands of skills are fine.

## Principles

1. **Module, not prompt.** Every prompt (and every agent plan) is split into small steps. Two steps that match can become a skill even if the prompts differ.
2. **Agent and bot choose.** Nothing runs automatically. The agent/bot calls `skills.find` then decides to call `skills.run`. We log what it chose.
3. **Cheap everywhere.** Splitting, matching, judging and retrieval prefer local Ollama; the owner's signed-in coding agent is the fallback; a project bot is the last option.
4. **Owner stays in control.** The owner answers 'Save as skill?' and approves every script before its first run.
5. **Savings are measured per skill.** Baseline = tokens of the first call/run of that module; savings = baseline − actual on later calls; holdout samples refresh the baseline.

## Data model (local, per owner computer, SQLite next to knowledge.db)

- `module` — id, project_id, canonical text (normalized step), verb, target, params schema (names + examples), hash, embedding (nomic-embed-text), first_seen_run, cluster_id.
- `module_cluster` — id, label, occurrences, distinct_prompts, state (`watching | asked | saved | never`), skill_id.
- `module_occurrence` — module_id, run_id, prompt_id, position, tokens_observed (when known).
- `skill_index` — skill_id, name, description, when_to_use, keywords, embedding, version, has_scripts.
- `skill_call` — id, skill_id, run_id, chosen_by (agent|bot|owner), tokens_actual, baseline_tokens, saved_tokens, holdout (bool), ok (bool), duration_ms.
- Cloud (owner visible): skills (existing project-skill-share store) plus `project_skill_suggestions` (existing, migration 120). Add script bundle metadata (names, params, permissions, hash) to the skill record; bundle files travel with the skill.

## Pipeline

1. **Decompose.** Input: run prompt + the agent's `[[WAVE_PLAN]]` (W|…, A|… lines the agents already emit — free structure). If no plan, ask Ollama for strict JSON steps. Output: modules with verb/target/params. Drop trivial modules (single read/list, < 2 actions, generic verbs) by a size/complexity threshold to avoid thousands of meaningless skills.
2. **Match.** Normalize → hash equality → embedding neighbours (top 5) → judge (Ollama → owner agent → project bot) returning SAME / SIMILAR / DIFFERENT with reason, looking at previous and next step for context. Cache verdicts per pair.
3. **Count.** A cluster with **2 or more occurrences** (across any prompts) raises one owner question. 'Not now' asks again at the next occurrence; 'Never' sticks.
4. **Draft.** From the cluster's occurrences (prompts + results, scrubbed) generate SKILL.md (When to use, Inputs, Steps, Pitfalls, Verification) with parameter placeholders; propose scripts for deterministic steps.
5. **Script proposal and replay.** Scripts are plain shell or Node, no new dependencies, parameters only via arguments, no embedded secrets, writes only inside the project folder, network off unless declared. Before the question is shown, replay each script against inputs of the earlier occurrences (dry run in a temp copy) and compare outputs; attach the replay summary and permissions to the question.
6. **Approve and seed.** Owner answers 'Save as skill' → skill stored in cloud with bundle and hash. AWL pulls the bundle, verifies the hash, installs read-only under `project-data/<id>/skills/<skill>/` and registers it in the local skill index and the local MCP server.
7. **Find.** `skills.find(query, k)`: BM25 + embedding cosine over `skill_index` in memory (thousands of skills are trivial), optional Ollama re-rank, returns only name + one-line description + score for top candidates. Full SKILL.md loads only when chosen.
8. **Run.** `skills.run(skill, params)` through the AWL gate: permission check, project-folder confinement, timeout, logging, safety rules (approval when required). The agent still decides when to call it. Failures return a structured error; the agent falls back to doing the step itself and the failure is recorded.
9. **Measure.** First call of a module sets the baseline; later calls add `saved_tokens`; periodic holdout (agent does the step without the skill) refreshes it; under 3 samples show '≈'. Feed Knowledge impact charts (tokens saved per skill, miss rate = skill existed but was not chosen).

## Interfaces

- Local MCP server (same pattern as the existing `code-token-saver-mcp` project dir) exposing `skills.find` and `skills.run` to Codex/Claude/Cursor uniformly. The run prompt gets one short instruction: 'Before starting, call skills.find; use a skill when it clearly fits.'
- Cloud APIs reuse project-auto-skills owner routes; add module-level payload fields (cluster label, occurrences, distinct prompts, replay summary, script permissions).
- UI: Library 'Auto skills' strip shows judge, pending questions, paused reasons; question card shows the repeated module, occurrences/prompts, draft preview, script list with permissions and replay result, buttons Save as skill / Not now / Never. Skill rows show 'Auto', script count, calls, tokens saved.

## Phases

1. **Modules (decompose, store, match, count)** — replace prompt-level repeat trigger with module clusters; keep question flow, judge selection and privacy settings; unit tests for decomposition parsing, thresholds, matching, repeat counting; drafts per cluster.
2. **Retrieval + tools** — `skill_index`, hybrid search, local MCP `skills.find/run` with the AWL gate, run-prompt instruction, call logging and miss metric.
3. **Scripts + savings** — script proposal, replay, permissions UI, seeding via AWL with hash verification, baseline/holdout accounting, charts.
4. **Adoption** — enable on the baby-care and AgentWitch projects, run repeated tasks, review questions, tune thresholds.

## Risks and mitigations

- Weak small-model splitting → strict JSON schema, validation and retries, prefer `WAVE_PLAN`; fall back to the owner agent.
- Over-fine modules → complexity threshold, minimum 2 actions, ignore generic verbs, owner 'Never'.
- Wrong or unsafe scripts → replay before asking, owner approval, hash pinning, confinement, no network by default, easy disable.
- Parameter leakage/overfitting → placeholders from differing values across occurrences; secrets scrubbed.
- Savings bias → holdout refresh, '≈' under 3 samples.
- Privacy → when message history is off, store hashes + 200-char previews only (already implemented for prompt store; apply to modules).
