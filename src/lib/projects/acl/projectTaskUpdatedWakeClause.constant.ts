import { PROJECT_MESSAGE_KIND_TASK_UPDATED } from "@/lib/projects/acl/messaging/projectTaskMessageKind.constant";

/** task.updated handling, folded into the shared wake clause (briefing, invite, guideline). */
export const PROJECT_TASK_UPDATED_WAKE_CLAUSE =
  `On kind "${PROJECT_MESSAGE_KIND_TASK_UPDATED}": read the summary. If it says stop or the task went to someone else, stop work on it now and reply task.status. ` +
  "If it says assigned to you, start it in priority order (p0 first; list_project_tasks status=queued mine=true sort=priority). " +
  "Set in_progress via update_project_task when you start, done when finished. Never work a task owned by another seat. Then ack.";
