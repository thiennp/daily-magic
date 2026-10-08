/**
 * Owner rule (8cf8f64f): check the Tasks tab before acting on any direct
 * project request. Shared by get_agent_guide, the briefing, the join prompt,
 * the wake clause and check_product_updates.
 */
export const PROJECT_TASKS_FIRST_CLAUSE =
  "Tasks first: before acting on any project request you get directly (your user, the Owner, a peer, chat, wake or inbox), call list_project_tasks { projectId } and look for a matching open task (queued, planned, in_progress, blocked). " +
  "Owned by another seat: do not redo it; tell the requester who owns it and coordinate with that seat. " +
  "Yours or unowned: continue it and keep it current with update_project_task. " +
  "None: create_project_task first (clear title + status description so another bot can continue), then work and update it (in_progress, then done, or blocked with the reason).";

/** One-line pointer used inside the wake reply clause. */
export const PROJECT_TASKS_FIRST_WAKE_POINTER =
  "Before doing the work, check list_project_tasks for an existing task (see Tasks first).";
