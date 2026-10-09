/**
 * How cloud bots report work: a one-line `resultSummary` on the task board,
 * plus a Playbook skill in the project library when the know-how is reusable.
 * Bots never create auto skills; AgentWitch drafts those on a linked computer
 * from repeated Runs and asks the owner. Terminology and the four learning
 * pipelines: docs/qa/learning-memory-terminology-and-flows.md. Shared by join
 * step 10, PROJECT_ORCHESTRATOR_CLAUSE and check_product_updates (v29, v30).
 */
export const PROJECT_BOT_PLAYBOOK_LIBRARY_FIRST_LINE =
  "Before starting, call list_project_skills and get_project_skill for any Playbook skill that fits and reuse it instead of re-deriving the work, to save tokens.";

export const PROJECT_BOT_PLAYBOOK_FORMAT_LINE =
  'Playbook skill (project library): a published skill with name, description, and body sections **When to use**, **Steps**, **Pitfalls**, **Verification** (plain markdown headings OK). Save with publish_project_skill { projectId, name, description, body, kind: "skill" }. To update one, pass its skillId from list_project_skills (a new name creates a new skill; on someone else\'s skill use asDraft: true). Never put secrets, tokens, wake URLs/keys, or private code in a Playbook skill or chat.';

export const PROJECT_BOT_PLAYBOOK_TASK_PAIR_LINE =
  "Every finished task: update_project_task with status done and resultSummary (one line, ≤200 chars: outcome + what to reuse or avoid); that line is the result people read on the task board. Publish or update a Playbook skill only when something is reusable beyond that line (same section format). You do not create auto skills: AgentWitch drafts those from repeated Runs on a linked computer and asks the owner.";

/** check_product_updates adapt (catalog v29) for bots that joined before the join prompt shipped this copy. */
export const PROJECT_BOT_PLAYBOOK_CATALOG_ADAPT = [
  PROJECT_BOT_PLAYBOOK_LIBRARY_FIRST_LINE,
  "Call check_context if you have AgentWitch Local.",
  PROJECT_BOT_PLAYBOOK_FORMAT_LINE,
  PROJECT_BOT_PLAYBOOK_TASK_PAIR_LINE,
].join(" ");

/** check_product_updates adapt (catalog v30): the delta for bots that already adapted v29. */
export const PROJECT_BOT_PLAYBOOK_CATALOG_V30_ADAPT =
  "What v29 called a knowledge card is a Playbook skill (publish_project_skill, unchanged). " +
  "An onboarding Playbook skill for your own seat is no longer required: keep one you already published, do not publish another. " +
  "resultSummary is the one-line result on the task board for people; it does not feed auto skills, and bots never create auto skills (AgentWitch drafts them from repeated Runs on a linked computer and asks the owner). " +
  "Publish or update a Playbook skill only when something is reusable beyond that one line.";
