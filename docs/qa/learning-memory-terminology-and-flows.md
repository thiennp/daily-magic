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

**Library lookup has two lanes.** A bot with a computer calls local **`skills_find`** first (hybrid keyword + embedding search, top 5, logged in `skill_find_log`, and **`skills_run`** can run the skill's approved scripts). A bot without it, or when it answers `unavailable`, calls **`list_project_skills { projectId, query }`**: compact rows `{skillId, name, description, tags}`, best 3 (max 10 via `limit`) plus `total`, matched on word prefixes of name, tags, description and id (a query of two or more words must match two of them, so a vague task returns nothing). Without `query` or `limit` the tool still returns the whole library. Then **`get_project_skill`**. Only a missing or unavailable tool switches lanes, not an empty result. Tags come from the `keywords:` / `tags:` front matter of the saved body, the same keys the computer's index reads; skills saved before tags existed are backfilled on first use.

## Auto-skill flow (best practice)

1. **Owner:** Enable auto-skills in Console; choose judge (`auto` / Ollama / signed-in CLI / bot); `publishMode` draft vs publish; link project folder on Mac.
2. **During work:** Read Playbooks (`list_project_skills` / `get_project_skill` or Mac `skills_find`); optional episode notes injected on Mac.
3. **After a Mac Run completes** (status `completed`, non-empty prompt, with `projectId`): `reportAutoSkillRunCompleted` → extract modules (prefer `[[WAVE_PLAN]]`) → cluster → at ≥2 occurrences draft SKILL.md → cloud suggestion.
4. **Owner** answers Save / Not now / Never → skill in library → AWL mirror.
5. **Backfill:** Mac “Scan past tasks” → `scanProjectTasksForAutoSkills` (same hook, idempotent per task id).

Canonical design: [auto-skill-modules-plan.md](../agent-witch/auto-skill-modules-plan.md). Implementation: `apps/live/features/project-history/internal/core/onAutoSkillRunCompleted.ts`, `apps/install/entry/startAgentWitchClient.ts`.

## Folder docs to Playbook skills (deterministic, owner-approved)

A fifth way to get a skill, separate from the four pipelines: the Library's **Scan project docs** button asks a linked computer to read the project folder's `.cursor/skills`, `.cursor/commands` and `docs/qa` and raise owner questions (Save / Not now / Never). **No model runs**, nothing is published without the owner's Save, and the draft text is stored in the cloud until the owner answers (the question says so). It does not use the repeat counter, so a doc is eligible the first time.

- **First real run (AgentWitch project):** the scan read 60 docs and raised 3 questions with 22 more eligible, as the dry run predicted. Reviewing the three drafts found three defects in the converter, fixed before any Save: relative links (`../../docs/a.md`) became dead links inside a skill (now rewritten to the path from the folder root, a link leaving the folder keeps its text), filler keywords (`new`, `using`, `one`), and a title-only description (the first body sentence that says something new is added). The three questions were answered Not now so the next scan asks again with the better drafts.
- **A changed doc updates its skill.** When a doc that already made a skill changes, the next scan asks "<path> changed. Update the skill <id>?" (the draft carries `updates: <id>`); an unchanged doc is skipped. Save publishes a new version of that same skill, but only if the skill really has `origin: folder-doc` and the same `source:` path; otherwise it is saved as a new skill. These update questions are not held back by the library or backfill caps.
- **How the owner sees it.** The cloud keeps at most 120 characters of a suggestion's `judgeLabel` and forces `occurrences` to at least 2, and the card does not show the label, so the card itself recognises a doc question by its `doc-` id prefix and says: "From the project doc <path>. No AI wrote it, and the text is stored in your AgentWitch cloud until you answer." with a "Never for this doc" button, instead of "You ran this kind of task 2 times".
- **Conversion.** A skill or command is used as it is; a Q&A doc becomes a skill (file name as the name, the question plus the first sentence of the short answer as the description, `Query aliases` as `keywords:`). The front matter gets `source: <path>@<git blob sha>` and `origin: folder-doc`.
- **Gates.** At least 3 steps (numbered ones for Q&A: bullet facts are not a procedure); not a pointer page (40% of lines are links); not already a skill (same name or `name-xxxx`); secrets scrubbed and a doc-mode check that rejects home-directory paths and emails but allows relative paths, ids, https URLs, `~/` and system paths. References are checked against the folder: a draft that names a file (in backticks or a link, when its first folder exists at the project root) or an `npm run` script that is gone is not asked about and counts as `stale_references`. On this repo it blocked 2 of 25 candidate docs, both really stale (bundle 336).
- **Caps.** Up to 8 candidates and 3 questions per pass; library 30; 10 doc-made skills until a pilot passes (a whole-library read costs about 140 tokens per skill).
- **No repeats.** The question id is per doc version (`doc-<path hash>-<sha>`): a doc the owner saved, refused or left pending is not asked again; a changed file is a new question. The status line also counts doc-made skills whose source changed or was deleted (it does not edit or revoke them).
- **Dry run on this repo:** 60 docs read, 25 eligible (commands and skills mostly; most Q&A docs are explanations, not procedures).
- **Code:** `apps/live/features/project-history/internal/core/ingestFolderDocsAsSkillDrafts.ts` (+ `evaluateDocSource`, `convertDocToSkillDraft`, `shouldIngestDoc`, `validateDocSkillDraft`, `docOriginSkills`), runner `scanProjectDocsForAutoSkills.ts`, message `autoskill.scan.request` with `docs: true`, button in `AwcAutoSkillsActions.tsx`.
- **Rescans.** "Scan past tasks" no longer re-extracts or re-judges a run that already fed the module store (`hasProcessedAutoSkillRun`).
- **Pilot (AgentWitch, 14 skills):** add up to 10 doc-made skills; success is empty-lookup rate down 20% relative, follow-through not lower, 40% of them fetched within 4 weeks, owner acceptance at least 60%, average lookup tokens under 150. Stop if acceptance is under 30% or Never outnumbers Save, or a secret passes the check.
- **Pilot log (2026-10-09, AgentWitch).** Scan 1 (bundle 333) gave drafts with dead relative links, filler keywords and thin descriptions; owner answered Not now, converter fixed (334). Scan 2 (bundle 335): 3 questions from 60 docs read. The two FSA commands (`command-fsa-migrate-feature`, `command-fsa-implement-feature`) read well and were saved: real description, repo-root links, steps intact. `command-refactor-extract-utility` is left pending (weak). Acceptance so far 2 of 3, no Never, no secret found. A lookup by task words returns both saved skills with the right one first. New defect found and fixed (d1287552): a saved skill took the question title as its description ("Save … as a skill?"), so bots saw a useless line; it now takes the front matter description (the two already saved keep the old line; the library UI has no edit, and search still finds them by name and tags). Deploys 334 and 335 first failed on a Docker Hub 429; the Dockerfile now pulls the Node image from the ECR Public mirror.
- **Skills from commit history (2026-10-09).** Mined 90 days of AgentWitch commits for repeated work and published four skills with real steps from the repo: `agentwitch-add-db-migration`, `agentwitch-permission-review-round`, `agentwitch-add-showcase-article`, `agentwitch-add-bot-guidance-update`. Five realistic asks: the right skill came first for four; the one ask with no matching skill (pricing page layout) still got two weak matches via the word layout, the same false-positive weakness as before. Skills made this way carry `origin: commit-history` and a `source:` line naming the commits.
- **Scan 3 (2026-10-09, bundle 336).** 60 docs read, 3 questions, eligible fell from 22 to 17 (the two stale docs are gone and the earlier answers count). Outcomes: `skill-storybook-page-wave-qa` saved (a real procedure; lookup now returns it with its own description, which confirms the description fix is live); `skill-commit-push-main` Not now (it overlaps the existing `agentwitch-commit-and-push`); `learning-memory-terminology-and-flows` Never (a long reference doc, not a procedure, and it changes with every edit of the audit). Running totals: saved 3, Not now 2 (extract-utility, commit-push-main), Never 1, no secret found; acceptance 3 of 6 questions answered Save, 50%, under the 60% target. Two gaps found: (1) a reference doc with numbered lists passes the step gate; (2) the duplicate check compares names only, so a doc that repeats an existing skill under another name still gets asked.

## Bot / agent reporting (target behavior)

| Action                                           | Required?               | Visible to humans                 |
| ------------------------------------------------ | ----------------------- | --------------------------------- |
| `update_project_task` → done + **resultSummary** | Yes (bots)              | Task board                        |
| `publish_project_skill` when reuse > one line    | When applicable         | Library + optional messenger line |
| Auto-skill / module extract                      | **No** (system + owner) | Console questions                 |
| AWB `/knowledge/update` lesson                   | Optional (local agents) | Candidate inbox, not auto-skill   |

**Decided:** the required per-seat **onboarding Playbook** (`How <nickname> works on this project`) is dropped. `get_project_briefing` already carries delivery, ack and reply rules, and every bot is told to list the whole library (`list_project_skills`) before each task, so N near-identical ops docs cost every bot tokens and bury real Playbooks. Bots that already published one keep it; the catalog entry tells them it is no longer required, and that they may keep it.

## Implementation rollout plan

**Verdict:** Reach **already-joined** bots through the `check_product_updates` catalog, not docs alone. Disclosure must be structured data: a chat line the app cannot check proves nothing, and it adds a bubble to every task next to the received / processing / status / done messages.

| Step                         | Goal                                                                                                                                                                                       | Main touchpoints                                                                                                                                                                                                                                                                                                           | Status  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **1** Terminology + bot copy | Playbook-skill wording; `resultSummary` is not an auto-skill input                                                                                                                         | `projectBotPlaybookReport.constant.ts`, `buildProjectInviteJoinReportSkillsStep.ts`, `buildProjectInviteJoinBriefingPeersStep.ts`, `projectOrchestratorClause.constant.ts`, catalog v30 (`productConnectUpdatesPlaybook.constant.ts`, `PRODUCT_CONNECT_UPDATES_CATALOG_VERSION` = 31), join prompt fixture, copy-lock test | Done    |
| **1b** Library lookup lanes  | Cloud `query` / `limit` on `list_project_skills` (compact rows, tags, minimum two matched words); bot copy says `skills_find` first, list with a query otherwise; metadata-only lookup log | `filterProjectSkillsByQuery.ts`, `searchProjectSkills.ts`, `extractSkillTags.ts`, `recordProjectSkillLookup.ts`, migration 132, `projectBotPlaybookReport.constant.ts`, `projectLocalFirstStep.constant.ts`, catalog v31                                                                                                   | Done    |
| **2** Task disclosure fields | Optional `skillsListed`, `skillUsed`, `artifactsWritten` on `update_project_task`, soft warning `disclosure_missing`, “reported by bot” line in AWC task detail                            | Same path as `resultSummary` (commit `43706edf`, about 20 files): `ensureProjectTaskRecordsSchema` + migration, task type / mapper / parser / merge / write queries, `projectTaskTools.constant.ts`, `checkBotTaskReport`, `AwcProjectTaskRecordDetail`                                                                    | Backlog |

**Steps 1 and 1b as built.** Every bot-facing sentence lives in `projectBotPlaybookReport.constant.ts` and is reused by join step 10, the orchestrator clause and the single catalog entry `bot-playbook-skill-report` (v31, reaches bots at catalog 28 to 30). The entry ends with a one-time note retiring the old wording (“knowledge card”, required onboarding skill). `projectBotPlaybookReport.copyLock.test.ts` forbids “knowledge card”, a required onboarding skill and any sentence that links `resultSummary` to auto-skill learning on every report surface (join step, full join prompt, briefing, orchestrator clause, catalog).

**Step 1b first measurement** (this computer's 51 skills, 15 task-style queries written by the author, so recall is optimistic). The whole `list_project_skills` answer is about 7,100 tokens; the compact top 3 averages about 81 (zero when nothing fits). The right skill was in the top 3 for 12 of 12 queries and the 3 queries with no related skill (“fix the bug”, “deploy a kubernetes cluster”, “add a new endpoint for invoices”) returned nothing. Tags made no difference on this set because it has no synonym queries; that is what the field data below must show. The library also holds near-duplicates (`implement-baby-care-features` and `-e4d6`) that take result slots.

### Measuring on AgentWitch's own features

Every `list_project_skills` and `get_project_skill` call made through MCP writes one row to `project_skill_lookup_log` (migration 132): project, actor, tool, whether a query was given, the query length, rows returned, `total`, response size in tokens (chars / 4), the top skill ids, and for `get` the skill id. The query text is never stored (Neon keeps meta only). The UI does not write to it.

Per feature, keep a row in the table below and fill it from these queries (replace `$1` with the project id; period = the dates the feature was built):

```sql
-- cost and shape of lookups
SELECT date_trunc('day', created_at) AS day,
  count(*) FILTER (WHERE tool = 'list' AND had_query) AS query_lookups,
  round(avg(response_tokens) FILTER (WHERE tool = 'list' AND had_query)) AS avg_tokens,
  count(*) FILTER (WHERE tool = 'list' AND had_query AND returned = 0) AS empty,
  count(*) FILTER (WHERE tool = 'list' AND NOT had_query) AS whole_library_reads
FROM project_skill_lookup_log WHERE project_id = $1 GROUP BY 1 ORDER BY 1 DESC;

-- share of non-empty lookups followed by a get of one returned skill within 15 minutes
SELECT round(100.0 * count(*) FILTER (WHERE EXISTS (
  SELECT 1 FROM project_skill_lookup_log g
  WHERE g.project_id = l.project_id AND g.actor_user_id = l.actor_user_id
    AND g.tool = 'get' AND g.skill_id = ANY (l.top_ids)
    AND g.created_at BETWEEN l.created_at AND l.created_at + interval '15 minutes'
)) / NULLIF(count(*), 0), 1) AS followed_pct
FROM project_skill_lookup_log l
WHERE l.project_id = $1 AND l.tool = 'list' AND l.had_query AND l.returned > 0;
```

**Soft signals on `update_project_task`.** A successful update can carry a `warnings` list (never an error): moving a task to `in_progress` when the same user has no library lookup in the log for the last 20 minutes, and marking it `done` with a `resultSummary` under 15 characters. An unreadable log never warns. A whole-library `list_project_skills` also returns a `warning`. Not built: an automatic `guidance.update` nudge for bots on an old catalog (the owner or inviter can still press the per-bot button, and a bot that holds only an `awc_proj_` key cannot call `check_product_updates` at all).

### Audit rounds on the lookup itself

Real libraries: AgentWitch (14 skills), baby-care (24 distinct names). Queries come from the AgentWitch project chat (real asks, several with no matching skill) plus short lookups; the baby-care set is author-written, so its numbers are optimistic. A whole-library read of AgentWitch costs about 3,000 tokens.

| Round | Where                                                        | Change                                                                                         | recall@3      | Rank 1        | No-skill queries answered empty      | Avg tokens / lookup |
| ----- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | ------------- | ------------- | ------------------------------------ | ------------------- |
| 1     | production, AgentWitch (16 queries)                          | tags + word-prefix match + two-word rule                                                       | 11/13         | 10/13         | 2/3                                  | a few hundred       |
| 2     | offline on the same library, same 16 queries                 | IDF weights, short words whole-word only, one rare name/tag word allowed, cut below 40% of top | 12/13         | 11/13         | 2/3                                  | 70                  |
| 2     | offline, baby-care (12 queries, author-written)              | same                                                                                           | 9/9           | 9/9           | 3/3                                  | 61                  |
| 3     | production, AgentWitch (19 new queries, not used for tuning) | none (measurement)                                                                             | 13/13         | 12/13         | 2/6                                  | a few hundred       |
| 4     | offline, AgentWitch (35 queries) and baby-care (12)          | short query words match the same word or its plural, never a longer word                       | 24/26 and 9/9 | 24/26 and 9/9 | 5/9 to 4/9 (false positives) and 0/3 | 70                  |

Round 3 and 4 notes. Recall held at 100% on queries the algorithm had never seen, but precision on asks with no matching skill is weak: 4 of 6 such real asks returned a wrong skill (common words such as "project", "history", "release" and the stem "page" matching "pager"). A coverage threshold (the share of the query's rarity mass that a skill matches) was measured and rejected: no value kept recall above 95% (at 0.25, false positives fell from 5 to 1 but recall fell from 92% to 85%). A wrong candidate costs the bot a few hundred tokens and it still has to `get_project_skill` before following it, so recall stays the goal. Offline numbers use the computer's skill index, whose descriptions differ slightly from the cloud's, so production is the reference for recall.

Round 1 defects and what fixed them: common words ("project chat") outranked a rare one ("bot"); a single strong match ("push") was dropped by the two-word rule; "aw" matched "awl"; results below the top were noise. Open after round 2: synonyms ("release" for "bump a version") need tags, and no production skill has any because the auto-skill draft prompt never asked for `keywords:` (it does now, install bundle 329; older skills stay untagged until re-saved); "add local folder for aw" still returns the local-layout skill.

| Feature (period) | Query lookups | Avg tokens | Empty % | Followed % | Whole-library reads | Notes |
| ---------------- | ------------- | ---------- | ------- | ---------- | ------------------- | ----- |
| (fill in)        |               |            |         |            |                     |       |

How to read it. **Avg tokens** should stay far below the ~7,100 of a whole-library read. **Whole-library reads** above zero mean a bot ignored the lane rule. **Empty %** high means skills are missing or tags are thin (publish the repeated work, add `keywords:`); **Followed %** low with few empties means the right skill is not in the top 3 or the bot ignores results. The log cannot say whether the skill helped; for that compare the task's total tokens with similar earlier tasks, and read the Knowledge impact panel for episode notes (repeat-mistake rate against the holdout runs).

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
