/**
 * Task refinement rules for a joining bot/agent (appended to the orchestrator
 * clause, so get_agent_guide, the briefing, the join prompt and product
 * updates all carry it).
 */
export const PROJECT_TASK_REFINEMENT_CLAUSE =
  "Refine: split each request into single-purpose subtasks with split_project_task (no repeats). Attach the closest skill and its parameters (list_project_skills with a short query); prefer a script skill over an agent, because an agent costs tokens. " +
  "Take a task with claim_project_task and end it with release_project_task (done with a verifySignal and resultSummary, failed, blocked with a reason, or released). " +
  "If a subtask needs a skill that does not exist yet, set needsSkill: it blocks until a CLI publishes the skill, then it unblocks by itself. When you wake, call list_project_task_blockers first. " +
  "Keep the skills you use in a skills folder in your workspace (get_project_skill). Use the cheapest effort that works (low effort, no extended thinking, small context) and climb one tier only after a verified failure.";
