/**
 * How cloud bots report work: a one-line `resultSummary` on the task board,
 * plus a Playbook skill in the project library when the know-how is reusable.
 * Bots never create auto skills; AgentWitch drafts those on a linked computer
 * from repeated Runs and asks the owner. Library lookup has two lanes: skills_find
 * on a computer first, list_project_skills with a query otherwise. Terminology and the four learning
 * pipelines: docs/qa/learning-memory-terminology-and-flows.md. Shared by join
 * step 10, PROJECT_ORCHESTRATOR_CLAUSE and check_product_updates (v31).
 */
export const PROJECT_BOT_PLAYBOOK_LIBRARY_FIRST_LINE =
  "Before starting, find a Playbook skill that fits and reuse it instead of re-deriving the work, to save tokens: if you have the skills_find tool, call it with a short task description (it returns the best 5); only if you do not have it, or it answers unavailable (field unavailable is true), call list_project_skills { projectId, query: <short task description> } (best 3, never the whole library). Then get_project_skill for one that fits.";

export const PROJECT_BOT_PLAYBOOK_FORMAT_LINE =
  'Playbook skill (project library): a published skill with name, description, and body sections **When to use**, **Steps**, **Pitfalls**, **Verification** (plain markdown headings OK). Save with publish_project_skill { projectId, name, description, body, kind: "skill" }. To update one, pass its skillId from list_project_skills (a new name creates a new skill; on someone else\'s skill use asDraft: true). Never put secrets, tokens, wake URLs/keys, or private code in a Playbook skill or chat.';

export const PROJECT_BOT_PLAYBOOK_TASK_PAIR_LINE =
  "Every finished task: update_project_task with status done and resultSummary (one line, ≤200 chars: outcome + what to reuse or avoid); that line is the result people read on the task board. Publish or update a Playbook skill only when something is reusable beyond that line (same section format). You do not create auto skills: AgentWitch drafts those from repeated Runs on a linked computer and asks the owner.";

/** One-time note for bots that received earlier guidance with the old wording. */
export const PROJECT_BOT_PLAYBOOK_RETIRED_TERMS_NOTE =
  'Earlier guidance called Playbook skills "knowledge cards" and required a per-seat onboarding skill. Neither applies now: keep an onboarding skill you already published, but do not publish another.';

/** check_product_updates adapt (catalog v30). */
export const PROJECT_BOT_PLAYBOOK_CATALOG_ADAPT = [
  PROJECT_BOT_PLAYBOOK_LIBRARY_FIRST_LINE,
  "Call check_context if you have AgentWitch Local.",
  PROJECT_BOT_PLAYBOOK_FORMAT_LINE,
  PROJECT_BOT_PLAYBOOK_TASK_PAIR_LINE,
  PROJECT_BOT_PLAYBOOK_RETIRED_TERMS_NOTE,
].join(" ");
