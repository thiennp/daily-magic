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

**Decided (PR 1):** the required per-seat **onboarding Playbook** (`How <nickname> works on this project`) is dropped. `get_project_briefing` already carries delivery, ack and reply rules, and every bot is told to list the whole library (`list_project_skills`) before each task, so N near-identical ops docs cost every bot tokens and bury real Playbooks. Bots that already published one keep it; catalog v30 tells them it is no longer required.

## Implementation rollout plan

**Verdict:** Do not ship docs-only or copy-only slices without reaching **already-joined** bots (`check_product_updates` catalog). Do not rely on messenger honor lines without structured fields: a chat line the app cannot check proves nothing, and it adds a bubble to every task next to the received / processing / status / done messages.

### First slice (~1–2 weeks)

| PR    | Goal                                                    | Main touchpoints                                                                                                                                                                                                                                                                                                                                                             | Acceptance                                                                                                                                                           | Status |
| ----- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **1** | Terminology + fix misleading bot copy                   | `projectBotPlaybookReport.constant.ts` (renamed from `projectBotKnowledgeCardReport`), `buildProjectInviteJoinReportSkillsStep.ts`, `buildProjectInviteJoinBriefingPeersStep.ts`, `projectOrchestratorClause.constant.ts`, **catalog v29 reworded + v30** (`productConnectUpdatesPlaybook.constant.ts`, `PRODUCT_CONNECT_UPDATES_CATALOG_VERSION` = 30), join prompt fixture | No bot string ties `resultSummary` → auto-skill; no “knowledge card” in bot copy; no required onboarding skill; v30 in `check_product_updates`; copy-lock test green | Done   |
| **2** | Optional task disclosure fields + soft warning (was 5B) | `projectTaskTools.constant.ts`, `parseUpdateProjectTaskArgs`, `updateProjectTask`, migration on `project_task_records`, `checkBotTaskReport` warning `disclosure_missing`, AWC task detail “reported by bot”                                                                                                                                                                 | Old bots unchanged; missing disclosure warns, does not fail; fields stay short (Neon keeps meta only)                                                                | Next   |
| **3** | Messenger disclosure (was 5A), only if still wanted     | `projectBriefingHowToDispatch.constant.ts` (+ poll twin) or, better, the server-built task-done notice                                                                                                                                                                                                                                                                       | Built from the PR 2 fields (`Library: listed N; using <slug> \| none`), not from bot-written wording; wake + poll share one source                                   | Maybe  |

**Why PR 2 before PR 3.** The first draft shipped the messenger lines (5A) first. Without structured fields they are an honor system the app cannot check, and the same wording has to be kept in sync across the wake and poll briefings. With PR 2 in place the app can show “used / wrote” from data, and a chat line, if anyone still wants one, can be generated server-side from those fields.

**PR 1 detail (what shipped).** Every bot-facing sentence lives in `projectBotPlaybookReport.constant.ts` and is reused by join step 10, the orchestrator clause and catalog v29. Catalog v29 now carries the corrected copy, so a bot still at catalog 28 never receives the old onboarding rule; v30 is a short delta for bots that already adapted v29 (rename, onboarding no longer required, `resultSummary` is not an auto-skill input). `projectBotPlaybookReport.copyLock.test.ts` forbids “knowledge card”, a required onboarding skill and any sentence that links `resultSummary` to auto-skill learning on every report surface (join step, full join prompt, briefing, orchestrator clause, catalog v29).

**Tests (related):** `npx vitest run src/lib/agentAccess src/features/projects/access/invites src/lib/projects/acl` after PR 1; add `src/lib/projects/tasks` for PR 2.

### Stretch / next slice

| Item            | Notes                                                                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Phase 2 UI copy | AWL “Run notes” (`buildKnowledgeImpactPanelHtml.ts`); AWC auto-skill helper (“Mac Runs only”); token-saver global rule — **bump install bundle** if rules change |
| 5D              | Surface Mac `skill_find_log` on Run / task UI                                                                                                                    |
| 5E              | Mostly covered by PR 2 `artifactsWritten` + terminology doc                                                                                                      |

### Defer (product decision)

| Item                                         | Why                               |
| -------------------------------------------- | --------------------------------- |
| **5C** MCP audit per task (hard enforcement) | Privacy + complexity              |
| **Phase 3** bot-only → auto-skill bridge     | Changes Mac-only auto-skill model |
| **Phase 4** full `skills.find/run` adoption  | Follow auto-skill-modules plan    |

### Risks

- **Copy drift** across join, briefing, orchestrator, catalog — mitigated by the shared constants module and the copy-lock test; add any new report sentence to the constants, not inline.
- **Disclosure that looks compliant but is not** — messenger lines alone (old 5A) prove nothing; ship PR 2 first if skip detection matters.
- **Required new task fields** — breaks MCP clients (`additionalProperties: false`); keep optional + warnings first.
- **Playbook dedupe** — `publish_project_skill` is an upsert by `skillId` (derived from the name when omitted): the same id adds a version (AWC keeps 20), a new name creates a new skill, and a member can only add a draft to someone else's skill. Bot copy therefore says to pass the `skillId` from `list_project_skills` to update.
- **Catalog contradiction** — a bot at catalog 28 receives v29 and v30 together; v29 must stay free of anything v30 retracts (the copy-lock test enforces it).

## Related

- [Chapter 10 — Learning, memory, and improvements](../guides/developer-guide/10-learning-memory-and-improvements.md)
- [auto-skill-modules-plan.md](../agent-witch/auto-skill-modules-plan.md)
- [local-rag-check-v2-design.md](../design/local-rag-check-v2-design.md) (episode memory design)
- [awb-knowledge-update-local-agent.md](awb-knowledge-update-local-agent.md)
- Code: `apps/live/features/knowledge/internal/core/episode/`, `src/features/project-auto-skills/`, `src/features/project-skill-share/`, `src/lib/agentAccess/projectBotPlaybookReport.constant.ts`

## Last reviewed

2026-10-09
