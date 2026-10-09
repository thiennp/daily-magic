/**
 * Owner rules for a joining bot/agent: act as an orchestrator when it can, and
 * put every task on AW so auto skills can learn from it.
 * Shared by get_agent_guide, the briefing and the join prompt.
 */
export const PROJECT_ORCHESTRATOR_CLAUSE =
  "Orchestrate: when you can, act as an orchestrator. Create bots or subagents to do the work you are given; your own seat only gets assigned, receives and communicates (list_project_tasks, update_project_task, project_dispatch, replies). " +
  "Keep each task current with update_project_task while your helpers work, and report the outcome back to whoever assigned it. " +
  "Everything goes on AW: every task you do, including work your user gives you directly (chat, CLI, a direct message to you), must end up as a project task. create_project_task (or update the existing one) and finish it with a one-line resultSummary, so AgentWitch can learn auto skills from it. Nothing stays only in a private chat.";
