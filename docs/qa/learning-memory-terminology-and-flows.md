# What are episode notes, Playbook skills, knowledge candidates, and auto-skills?

## Query aliases

- learning memory terminology episode card knowledge card
- auto-skill flow Mac modules bot resultSummary
- publish_project_skill vs episode memory vs auto skill
- bot library disclosure skillsListed skillUsed
- tri thuc AgentWitch episode playbook autoskill

## Short answer

AgentWitch has **four separate learning pipelines**—do not call them all “knowledge cards.” **Episode notes** are Mac-local snippets from **Runs** (`mistake` / `fix` / `decision` / `lesson`). **Playbook skills** live in the cloud library (`publish_project_skill`). **Knowledge candidates** are owner-promoted cloud items (`lesson` / `fact` / `decision`). **Auto-skills** are owner-gated drafts from **repeated Mac run modules**, not from bot summaries alone. Bots should always set **`resultSummary`** on done tasks and publish a **Playbook skill** only when reuse goes beyond that line; they do **not** create auto-skills.

## Terminology (use these words)

| Name (engineering)                 | User-facing                                                       | Storage / API                         | Who creates                                           |
| ---------------------------------- | ----------------------------------------------------------------- | ------------------------------------- | ----------------------------------------------------- |
| **Episode note** (episode card)    | Knowledge snippets / run notes on **AgentWitch on this computer** | AWL `knowledge.db` → `episodes`       | System after Mac **Runs**                             |
| **Playbook skill** (project skill) | **Playbook** / Library skill                                      | Neon + `publish_project_skill`        | Owner, members, bots (report)                         |
| **Knowledge candidate**            | (Console promote flow)                                            | `project_knowledge_items`             | Mac lesson distill, AWB `POST /knowledge/update`      |
| **Auto-skill suggestion**          | “Save as skill?” (owner)                                          | `project-auto-skills` + Mac module DB | Mac `reportAutoSkillRunCompleted` after completed Run |

**Deprecated in internal chat:** unqualified **“knowledge card”** (means episode notes in AWL HTML, Playbook skill in bot copy, or both).

**Homonym:** Cloud task field **`resultSummary`** (≤200 chars on `update_project_task`) is **not** the same as Mac `AutoSkillRunRecord.resultSummary` (slice of run output for module drafting).

## Four pipelines (do not conflate)

```text
Mac Run ──► episode notes (inject before next Run)
Mac Run ──► knowledge candidate (optional cloud lesson, owner promotes)
Bot/Mac ──► Playbook skill (library, list/get before work)
Mac Run (completed, projectId) ──► auto-skill modules ──► owner question ──► Playbook skill
```

| Pipeline            | Trigger                         | Owner gate                  |
| ------------------- | ------------------------------- | --------------------------- |
| Episode notes       | Run on linked folder            | Local Knowledge flags       |
| Knowledge candidate | Successful capture / AWB lesson | Promote / reject in Console |
| Playbook skill      | `publish_project_skill`         | Draft / publish ACL         |
| Auto-skill          | `onAutoSkillRunCompleted`       | Save / Not now / Never      |

**Bot-only cloud work** does not run the auto-skill hook unless run prompt/output exist on the owner Mac (`project-data/<id>/tasks/` + scan, or a live Mac **Run**). Auto-skill is **not** driven primarily by bot Playbook publishes.

**Library lookup split:** Mac writers use local **`skills_find`** / **`skills_run`** (logged in `skill_find_log`). Cloud bots use **`list_project_skills`** / **`get_project_skill`** (no per-task log unless we add disclosure fields).

## Auto-skill flow (best practice)

1. **Owner:** Enable auto-skills in Console; choose judge (`auto` / Ollama / signed-in CLI / bot); `publishMode` draft vs publish; link project folder on Mac.
2. **During work:** Read Playbooks (`list_project_skills` / `get_project_skill` or Mac `skills_find`); optional episode notes injected on Mac.
3. **After Mac Run completes** (with `projectId`): `reportAutoSkillRunCompleted` → extract modules (prefer `[[WAVE_PLAN]]`) → cluster → at ≥2 occurrences draft SKILL.md → cloud suggestion.
4. **Owner** answers Save / Not now / Never → skill in library → AWL mirror.
5. **Backfill:** Mac “Scan past tasks” → `scanProjectTasksForAutoSkills` (same hook, idempotent per task id).

Canonical design: [auto-skill-modules-plan.md](../agent-witch/auto-skill-modules-plan.md). Implementation: `apps/live/features/project-history/internal/core/onAutoSkillRunCompleted.ts`, `apps/install/entry/startAgentWitchClient.ts`.

## Bot / agent reporting (target behavior)

| Action                                           | Required?               | Visible to humans                 |
| ------------------------------------------------ | ----------------------- | --------------------------------- |
| `update_project_task` → done + **resultSummary** | Yes (bots)              | Task board                        |
| `publish_project_skill` when reuse > one line    | When applicable         | Library + optional messenger line |
| Auto-skill / module extract                      | **No** (system + owner) | Console questions                 |
| AWB `/knowledge/update` lesson                   | Optional (local agents) | Candidate inbox, not auto-skill   |

**Open product issue:** Required **onboarding Playbook** on join (`PROJECT_BOT_KNOWLEDGE_CARD_ON_JOIN_LINE`) adds per-seat ops docs to the library; decide drop vs optional vs non-skill kind in rollout PR 1.

## Implementation rollout plan (approved direction)

**Verdict:** Do not ship docs-only or copy-only slices without reaching **already-joined** bots (`check_product_updates` catalog). Do not rely on messenger honor lines without optional structured fields.

### First slice (~1–2 weeks)

| PR    | Goal                                      | Main touchpoints                                                                                                                                                                                                                                                  | Acceptance                                                                      |
| ----- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **1** | Terminology + fix misleading bot copy     | `projectBotKnowledgeCardReport.constant.ts`, `buildProjectInviteJoinReportSkillsStep.ts`, orchestrator clause, **catalog v30** (`productConnectUpdates*.constant.ts`, bump `PRODUCT_CONNECT_UPDATES_CATALOG_VERSION`), this doc, dev guide ch.10, invite fixtures | No bot string ties `resultSummary` → auto-skill; v30 in `check_product_updates` |
| **2** | Messenger disclosure (5A)                 | Extend `projectBriefingHowToDispatch.constant.ts` (+ poll twin): before work `Library: listed N; using <slug> \| none`; on write `Wrote: playbook <slug> \| summary only`                                                                                         | Wake + poll share wording; briefing tests pass                                  |
| **3** | Optional task fields + soft warnings (5B) | `projectTaskTools.constant.ts`, `updateProjectTask`, migration, `checkBotTaskReport` warning `disclosure_missing`, AWC task detail “reported by bot”                                                                                                              | Old bots unchanged; missing disclosure warns, does not fail                     |

**PR 1 also:** Centralize sentences in one constants module; copy-lock test pattern like `projectInviteJoinTypes.copyLock.test.ts`.

**Tests (related):** `npx vitest run` on `src/lib/agentAccess/productConnectUpdates*`, `src/features/projects/access/invites`, `src/lib/projects/tasks`, briefing ACL tests after each PR.

### Stretch / next slice

| Item            | Notes                                                                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Phase 2 UI copy | AWL “Run notes” (`buildKnowledgeImpactPanelHtml.ts`); AWC auto-skill helper (“Mac Runs only”); token-saver global rule — **bump install bundle** if rules change |
| 5D              | Surface Mac `skill_find_log` on Run / task UI                                                                                                                    |
| 5E              | Mostly covered by PR 3 `artifactsWritten` + terminology doc                                                                                                      |

### Defer (product decision)

| Item                                         | Why                               |
| -------------------------------------------- | --------------------------------- |
| **5C** MCP audit per task (hard enforcement) | Privacy + complexity              |
| **Phase 3** bot-only → auto-skill bridge     | Changes Mac-only auto-skill model |
| **Phase 4** full `skills.find/run` adoption  | Follow auto-skill-modules plan    |

### Risks

- **Copy drift** across join, briefing, orchestrator, catalog — mitigate with shared constants + copy-lock tests.
- **5A without 5B** — looks compliant, is not; ship PR 3 in the same slice if skip detection matters.
- **Required new task fields** — breaks MCP clients (`additionalProperties: false`); keep optional + warnings first.
- **Playbook dedupe** — verify `publish_project_skill` upsert before promising “update not duplicate.”

## Related

- [Chapter 10 — Learning, memory, and improvements](../guides/developer-guide/10-learning-memory-and-improvements.md)
- [auto-skill-modules-plan.md](../agent-witch/auto-skill-modules-plan.md)
- [local-rag-check-v2-design.md](../design/local-rag-check-v2-design.md) (episode memory design)
- [awb-knowledge-update-local-agent.md](awb-knowledge-update-local-agent.md)
- Code: `apps/live/features/knowledge/internal/core/episode/`, `src/features/project-auto-skills/`, `src/features/project-skill-share/`

## Last reviewed

2026-10-09
