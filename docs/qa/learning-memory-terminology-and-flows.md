# What are episode notes, Playbook skills, knowledge candidates, and auto-skills?

## Query aliases

- learning memory terminology episode card knowledge card
- auto-skill flow Mac modules bot resultSummary
- publish_project_skill vs episode memory vs auto skill
- bot library disclosure skillsListed skillUsed
- tri thuc AgentWitch episode playbook autoskill
- knowledgeShare shared episode notes Knowledge impact
- onboarding playbook dropped catalog v30

## Short answer

AgentWitch has **four separate learning pipelines**—do not call them all “knowledge cards.” **Episode notes** are Mac-local snippets from **Runs** (`mistake` / `fix` today; the type also allows `decision` / `lesson`). **Playbook skills** live in the cloud library (`publish_project_skill`). **Knowledge candidates** are owner-promoted cloud items (`lesson` / `fact` / `decision`). **Auto-skills** are owner-gated drafts from **repeated Mac run modules** on any linked computer (owner or member seat), not from bot summaries. Bots should always set **`resultSummary`** on done tasks and publish a **Playbook skill** only when reuse goes beyond that line; they do **not** create auto-skills.

## Terminology (use these words)

| Name (engineering)                 | User-facing                                                       | Storage / API                         | Who creates                                                            |
| ---------------------------------- | ----------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------- |
| **Episode note** (episode card)    | Knowledge snippets / run notes on **AgentWitch on this computer** | AWL `knowledge.db` → `episodes`       | System after Mac **Runs** (`mistake`, `fix`)                           |
| **Playbook skill** (project skill) | **Playbook** / Library skill                                      | Neon + `publish_project_skill`        | Owner, members, bots (report)                                          |
| **Knowledge candidate**            | (Console promote flow)                                            | `project_knowledge_items`             | Mac lesson distill, 3× recurring mistake, AWB `POST /knowledge/update` |
| **Auto-skill suggestion**          | “Save as skill?” (owner)                                          | `project-auto-skills` + Mac module DB | Mac `reportAutoSkillRunCompleted` after completed Run                  |

**Deprecated in internal chat:** unqualified **“knowledge card”** (means episode notes in AWL HTML, Playbook skill in bot copy, or both).

**Homonym:** Cloud task field **`resultSummary`** (≤200 chars on `update_project_task`) is **not** the same as Mac `AutoSkillRunRecord.resultSummary` (first 600 chars of run output for module drafting).

**Episode notes can leave the Mac, as a view only.** Episode notes stay on the computer by default. A project folder with `knowledgeShare` **on** (`<project>/.agent-witch/token-saver.json`, default off) also sends the redacted note text with the heartbeat to the owner's Console **Knowledge impact** list (cloud `project_knowledge_cards`). That list is not a Playbook skill and not a knowledge candidate; nothing in it is promoted automatically.

## Four pipelines (do not conflate)

```text
Mac Run ──► episode notes (inject before next Run)
Mac Run ──► knowledge candidate (optional cloud lesson, owner promotes)
Bot/Mac ──► Playbook skill (library, list/get before work)
Mac Run (completed, projectId) ──► auto-skill modules ──► owner question ──► Playbook skill
```

| Pipeline            | Trigger                                                       | Owner gate                                                                       |
| ------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Episode notes       | Run on linked folder                                          | `knowledge` flag (default on); `knowledgeShare` for the owner view (default off) |
| Knowledge candidate | Run exit 0 with output / 3rd repeat of a mistake / AWB lesson | Promote / reject in Console                                                      |
| Playbook skill      | `publish_project_skill`                                       | Draft / publish ACL                                                              |
| Auto-skill          | `onAutoSkillRunCompleted`                                     | Save / Not now / Never                                                           |

**Bot-only cloud work** does not run the auto-skill hook unless run prompt/output exist on a Mac linked to the project (a live **Run**, or the Mac “Scan past tasks” backfill). The project's auto-skill toggle applies to every seat's computer, owner and member alike. Auto-skill is **not** driven by bot Playbook publishes or by `resultSummary`.

**Library lookup split:** Mac writers use local **`skills_find`** / **`skills_run`** (logged in `skill_find_log`). Cloud bots use **`list_project_skills`** / **`get_project_skill`** (no per-task log unless we add disclosure fields).

## Auto-skill flow (best practice)

1. **Owner:** Enable auto-skills in Console; choose judge (`auto` / Ollama / signed-in CLI / bot); `publishMode` draft vs publish; link project folder on Mac.
2. **During work:** Read Playbooks (`list_project_skills` / `get_project_skill` or Mac `skills_find`); optional episode notes injected on Mac.
3. **After a Mac Run completes** (status `completed`, non-empty prompt, with `projectId`): `reportAutoSkillRunCompleted` → extract modules (prefer `[[WAVE_PLAN]]`) → cluster → at ≥2 occurrences draft SKILL.md → cloud suggestion.
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

**Decided:** the required per-seat **onboarding Playbook** (`How <nickname> works on this project`) is dropped. `get_project_briefing` already carries delivery, ack and reply rules, and every bot is told to list the whole library (`list_project_skills`) before each task, so N near-identical ops docs cost every bot tokens and bury real Playbooks. Bots that already published one keep it; catalog v30 tells them it is no longer required, and that they may keep it.

## Implementation rollout plan

**Verdict:** Reach **already-joined** bots through the `check_product_updates` catalog, not docs alone. Disclosure must be structured data: a chat line the app cannot check proves nothing, and it adds a bubble to every task next to the received / processing / status / done messages.

| Step                         | Goal                                                                                                                                                            | Main touchpoints                                                                                                                                                                                                                                                                                                           | Status  |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **1** Terminology + bot copy | Playbook-skill wording; `resultSummary` is not an auto-skill input                                                                                              | `projectBotPlaybookReport.constant.ts`, `buildProjectInviteJoinReportSkillsStep.ts`, `buildProjectInviteJoinBriefingPeersStep.ts`, `projectOrchestratorClause.constant.ts`, catalog v30 (`productConnectUpdatesPlaybook.constant.ts`, `PRODUCT_CONNECT_UPDATES_CATALOG_VERSION` = 30), join prompt fixture, copy-lock test | Done    |
| **2** Task disclosure fields | Optional `skillsListed`, `skillUsed`, `artifactsWritten` on `update_project_task`, soft warning `disclosure_missing`, “reported by bot” line in AWC task detail | Same path as `resultSummary` (commit `43706edf`, about 20 files): `ensureProjectTaskRecordsSchema` + migration, task type / mapper / parser / merge / write queries, `projectTaskTools.constant.ts`, `checkBotTaskReport`, `AwcProjectTaskRecordDetail`                                                                    | Backlog |

**Step 1 as built.** Every bot-facing sentence lives in `projectBotPlaybookReport.constant.ts` and is reused by join step 10, the orchestrator clause and the single catalog entry `bot-playbook-skill-report` (v30, reaches bots at catalog 28 and 29). The entry ends with a one-time note retiring the old wording (“knowledge card”, required onboarding skill). `projectBotPlaybookReport.copyLock.test.ts` forbids “knowledge card”, a required onboarding skill and any sentence that links `resultSummary` to auto-skill learning on every report surface (join step, full join prompt, briefing, orchestrator clause, catalog).

**Step 2 design.** Fields stay optional (not every task touches the library, and `additionalProperties: false` rejects unknown keys for MCP clients); a missing field warns and never fails. Keep values short: Neon holds meta only. Build it when the app needs to show or measure library use; there is no chat-line variant, because a server-side notice built from these fields would replace it.

**Tests (related):** `npx vitest run src/lib/agentAccess src/features/projects/access/invites src/lib/projects/acl`; add `src/lib/projects/tasks` for step 2.

### Later

| Item                                          | Why later                                                                                                                                                        |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Phase 2 UI copy                               | AWL “Run notes” (`buildKnowledgeImpactPanelHtml.ts`); AWC auto-skill helper (“Mac Runs only”); token-saver global rule — **bump install bundle** if rules change |
| Surface Mac `skill_find_log` on Run / task UI | Local usage log exists; no UI yet                                                                                                                                |
| MCP audit per task (hard enforcement)         | Privacy + complexity                                                                                                                                             |
| Bot-only → auto-skill bridge                  | Changes the Mac-only auto-skill model                                                                                                                            |
| Full `skills.find/run` adoption               | Follow the auto-skill-modules plan                                                                                                                               |

### Risks

- **Copy drift** across join, briefing, orchestrator and catalog — keep every report sentence in the constants module; the copy-lock test covers each surface.
- **Required new task fields** break MCP clients (`additionalProperties: false`); keep step 2 fields optional.
- **Playbook dedupe** — `publish_project_skill` is an upsert by `skillId` (derived from the name when omitted): the same id adds a version (AWC keeps 20), a new name creates a new skill, and a member can only add a draft to someone else’s skill. Bot copy says to pass the `skillId` from `list_project_skills` to update.

## Related

- [Chapter 10 — Learning, memory, and improvements](../guides/developer-guide/10-learning-memory-and-improvements.md)
- [auto-skill-modules-plan.md](../agent-witch/auto-skill-modules-plan.md)
- [local-rag-check-v2-design.md](../design/local-rag-check-v2-design.md) (episode memory design)
- [awb-knowledge-update-local-agent.md](awb-knowledge-update-local-agent.md)
- Code: `apps/live/features/knowledge/internal/core/episode/`, `src/features/project-auto-skills/`, `src/features/project-skill-share/`, `src/lib/agentAccess/projectBotPlaybookReport.constant.ts`

## Last reviewed

2026-10-09
