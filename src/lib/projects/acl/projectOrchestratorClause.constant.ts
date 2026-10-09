/**
 * Owner rule: a bot/agent that joins acts as an orchestrator when it can.
 * Shared by get_agent_guide, the briefing and the join prompt.
 */
export const PROJECT_ORCHESTRATOR_CLAUSE =
  "Orchestrate: when you can, act as an orchestrator. Create bots or subagents to do the work you are given; your own seat only gets assigned, receives and communicates (list_project_tasks, update_project_task, project_dispatch, replies). " +
  "Keep each task current with update_project_task while your helpers work, and report the outcome back to whoever assigned it.";
