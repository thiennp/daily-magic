/**
 * How cloud bots report “knowledge cards” for the project library and auto-skill
 * learning. AWL episode cards are created on the owner's Mac from local runs;
 * bots use publish_project_skill + task resultSummary. Shared by join step 10,
 * briefing step 4, and PROJECT_ORCHESTRATOR_CLAUSE.
 */
export const PROJECT_BOT_KNOWLEDGE_CARD_FORMAT_LINE =
  'Knowledge card (project library): a published skill with name, description, and body sections **When to use**, **Steps**, **Pitfalls**, **Verification** (plain markdown headings OK). Save with publish_project_skill { projectId, name, description, body, kind: "skill" }. Never put secrets, tokens, wake URLs/keys, or private code in the card or chat.';

export const PROJECT_BOT_KNOWLEDGE_CARD_TASK_PAIR_LINE =
  "Every finished task: update_project_task with status done and resultSummary (one line, ≤200 chars: outcome + what to reuse or avoid) so AgentWitch can learn auto skills from repeats; when anything is reusable beyond that line, publish or update a matching knowledge card (same section format).";

export const PROJECT_BOT_KNOWLEDGE_CARD_ON_JOIN_LINE =
  'REQUIRED once right after you are active and list_project_peers (step 4): publish an onboarding knowledge card via publish_project_skill — name like "How <your nickname> works on this project" — covering your inbox delivery (wake or poll), Tasks first, visible messenger replies, ack_project_message, and how you publish cards after each job.';

/** check_product_updates adapt (catalog v29) for bots that joined before join-prompt copy shipped. */
export const PROJECT_BOT_KNOWLEDGE_CARD_CATALOG_ADAPT =
  "Before each task, Check this project first: list_project_skills and get_project_skill for anything that fits; call check_context if you have AgentWitch Local. " +
  "If you never published an onboarding card for this project, do it now: " +
  PROJECT_BOT_KNOWLEDGE_CARD_ON_JOIN_LINE +
  " " +
  PROJECT_BOT_KNOWLEDGE_CARD_FORMAT_LINE +
  " " +
  PROJECT_BOT_KNOWLEDGE_CARD_TASK_PAIR_LINE;
