import {
  AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS,
  AWC_GROK_WEBHOOK_DAILY_REPAIR,
} from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";
import {
  PROJECT_TASKS_FIRST_CLAUSE,
  PROJECT_TASKS_FIRST_WAKE_POINTER,
} from "@/lib/projects/acl/projectTasksFirstClause.constant";
import { PROJECT_ORCHESTRATOR_CLAUSE } from "@/lib/projects/acl/projectOrchestratorClause.constant";
import { PROJECT_TASK_UPDATED_WAKE_CLAUSE } from "@/lib/projects/acl/projectTaskUpdatedWakeClause.constant";
import {
  PROJECT_B2B_SILENCE_BLOCK_MS,
  PROJECT_B2B_SILENCE_NOTIFY_MS,
  PROJECT_MESSAGE_KIND_PROJECT_UPDATED,
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_RECEIVED,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

const SILENCE_NOTIFY_MINUTES = PROJECT_B2B_SILENCE_NOTIFY_MS / 60_000;
const SILENCE_BLOCK_MINUTES = PROJECT_B2B_SILENCE_BLOCK_MS / 60_000;

/** Shared reply clause for briefing, invite prompt, and agent guideline. */
export const PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE =
  "On a wake, read projectId and messageId from the wake POST body and act ONLY on that projectId (never mix another project's inbox, briefing, or replies). " +
  "Wake/briefing carries ONLY this project's id, name, and the triggering message — no status/tips/EN-PASS from other projects; answer only about this project; questions about another product go to that product's project. " +
  "The first action — before list_project_inbox, before composing, before the task and before ack — is project_dispatch kind " +
  `"${PROJECT_MESSAGE_KIND_TASK_RECEIVED}" to that sender with summary "received <messageId>" using the wake payload messageId, projectId, and from* (do not wait to read inbox); ` +
  "also one short line in your own window that the message was received. " +
  PROJECT_TASKS_FIRST_WAKE_POINTER +
  " " +
  "On each delivery: same first action (task.received + own-window line) before list_project_inbox({ projectId }) and before the task. " +
  `Then do the task: list_project_inbox if needed, then optional project_dispatch kind "${PROJECT_MESSAGE_KIND_TASK_PROCESSING}" to that sender with summary "processing <messageId>" (refs cannot carry the message id; task.received / task.processing are state-only chips — never stop there alone). ` +
  `ALWAYS finish with a visible app-messenger bubble: prefer project_messenger_reply { projectId, summary, kind: "${PROJECT_MESSAGE_KIND_TASK_STATUS}" | "${PROJECT_MESSAGE_KIND_TASK_DONE}" | "${PROJECT_MESSAGE_KIND_TASK_BLOCKED}", inReplyTo: <messageId> } ` +
  `(every owner/member ask needs a visible reply in the app messenger — even just "ok" or "done"; use kind "${PROJECT_MESSAGE_KIND_TASK_STATUS}" with summary "status <messageId>: <progress>" every ${SILENCE_NOTIFY_MINUTES} minutes while working, ` +
  `then kind "${PROJECT_MESSAGE_KIND_TASK_DONE}" or "${PROJECT_MESSAGE_KIND_TASK_BLOCKED}" with summary "<messageId>: <result>"). ` +
  `Alternate OK: project_dispatch the same kind "${PROJECT_MESSAGE_KIND_TASK_STATUS}" | "${PROJECT_MESSAGE_KIND_TASK_DONE}" | "${PROJECT_MESSAGE_KIND_TASK_BLOCKED}" to that sender (when the sender is the owner, toProjectDisplayName is "Owner"). ` +
  "post the same reply in your own window, then ack. " +
  `If you are silent for ${SILENCE_NOTIFY_MINUTES} minutes the server tells the sender; after ${SILENCE_BLOCK_MINUTES} minutes the delivery is blocked. ` +
  "Do not ack only. Never stop at task.received / task.processing alone.";

/** Shared project.updated wake clause for briefing, invite prompt, and agent guideline. */
export const PROJECT_UPDATED_WAKE_REPLY_CLAUSE =
  `On kind "${PROJECT_MESSAGE_KIND_PROJECT_UPDATED}": re-pull get_project_acl and get_project_briefing (and knowledge list if relevant), tell the user in one short line that project info changed, then ack. Do not ack only. ` +
  PROJECT_TASK_UPDATED_WAKE_CLAUSE;

/** Addressing rules shared by the wake (webhook) and poll briefings. */
export const PROJECT_BRIEFING_DISPATCH_ADDRESSING =
  'Dispatch with project_dispatch: pass projectId, kind, summary ≤ 200 chars, optional refs ≤ 768 bytes (prUrl|commitSha|localPath|allowClaimId) — no media/blobs (media_not_allowed); use only localPath / P2P refs for bulky payloads; address the human with toProjectDisplayName: "Owner" (reserved; not account name); address one peer bot via toMembershipId (preferred when list_project_peers exposes membershipId) or toProjectDisplayName — exactly one of toMembershipId | toProjectDisplayName (one recipient per send; toTeamLabel removed); no broadcast in v1; re-list peers after rename (old nickname may resolve ~7 days); on Approve/invite auto-approve peers+owner get peer.joined; on knowledge|folder_refs|repo_urls|project_info change peers+owner get project.updated; owner tasks have fromProjectDisplayName === "Owner"; ';

/** Ack, rate-limit, and leave rules shared by the wake and poll briefings. */
export const PROJECT_BRIEFING_DISPATCH_TAIL =
  " MUST ack_project_message after you handle each delivery (delete-on-ack; unacked messages expire after 3 days). Prefer agent-access Bearer for register_project_webhook and ack_project_message; awc_proj_ also allowed for those tools. On leave or owner Revoke MUST delete all project-scoped routines (project webhook, Website relaunch watches, and other project-tied scheduled/event watches). Rate limits: 300/hour (rolling) + max 300 unread (ack/clear frees slots). On code rate_limited (reason hourly|unread_cap), tell your user the message was rate-limited and when they can retry (use retryAfterSeconds / retryAfterAt when present; unread_cap frees only on ack/Clear).";

/** One paragraph: how active members address peers via project_dispatch. */
export const PROJECT_BRIEFING_HOW_TO_DISPATCH =
  PROJECT_TASKS_FIRST_CLAUSE +
  " " +
  PROJECT_ORCHESTRATOR_CLAUSE +
  " " +
  PROJECT_BRIEFING_DISPATCH_ADDRESSING +
  "MUST on connect (webhook-first): " +
  AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS +
  " Inbox wake is webhook-only, via a Grok routine; do not poll list_project_inbox on a timer. " +
  AWC_GROK_WEBHOOK_DAILY_REPAIR +
  " " +
  PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE +
  " " +
  PROJECT_UPDATED_WAKE_REPLY_CLAUSE +
  PROJECT_BRIEFING_DISPATCH_TAIL;

/**
 * Briefing paragraph for a viewer seat (human, read-only on messages).
 * Replaces PROJECT_BRIEFING_HOW_TO_DISPATCH so no wake/reply step tells a
 * viewer to post.
 */
export const PROJECT_BRIEFING_VIEWER_READ_ONLY =
  "You are a viewer: read-only on project messages. Read with list_project_inbox; you may ack_project_message to clear your own inbox. " +
  "Do not call project_dispatch (code viewer_read_only) and do not send received / processing / status / done / blocked replies; the server never posts receipts for a viewer. " +
  "Ask the project owner for the member role if you need to post.";
