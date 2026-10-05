import {
  AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS,
  AWC_GROK_WEBHOOK_DAILY_REPAIR,
} from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";
import {
  PROJECT_B2B_SILENCE_BLOCK_MS,
  PROJECT_B2B_SILENCE_NOTIFY_MS,
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

const SILENCE_NOTIFY_MINUTES = PROJECT_B2B_SILENCE_NOTIFY_MS / 60_000;
const SILENCE_BLOCK_MINUTES = PROJECT_B2B_SILENCE_BLOCK_MS / 60_000;

/** Shared reply clause for briefing, invite prompt, and agent guideline. */
export const PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE =
  "On a wake, the first action is one short line in your own window that the message was received, before the task and before ack. Then do the task. " +
  "On each delivery: one short line in your own window that the message was received, before the task. " +
  `Then do the task: first project_dispatch kind "${PROJECT_MESSAGE_KIND_TASK_PROCESSING}" to that sender with summary "processing <messageId>" (refs cannot carry the message id), ` +
  `then kind "${PROJECT_MESSAGE_KIND_TASK_STATUS}" with summary "status <messageId>: <progress>" every ${SILENCE_NOTIFY_MINUTES} minutes while working, ` +
  `then kind "${PROJECT_MESSAGE_KIND_TASK_DONE}" or "${PROJECT_MESSAGE_KIND_TASK_BLOCKED}" with summary "<messageId>: <result>" as the reply to that sender, post the same reply in your own window, then ack. ` +
  `If you are silent for ${SILENCE_NOTIFY_MINUTES} minutes the server tells the sender; after ${SILENCE_BLOCK_MINUTES} minutes the delivery is blocked. ` +
  'Do not ack only. When the sender is the owner, toProjectDisplayName is "Owner".';

/** One paragraph: how active members address peers via project_dispatch. */
export const PROJECT_BRIEFING_HOW_TO_DISPATCH =
  "Dispatch with project_dispatch: pass projectId, kind, summary ≤ 200 chars, optional refs ≤ 768 bytes (prUrl|commitSha|localPath|allowClaimId) — no media/blobs (media_not_allowed); use only localPath / P2P refs for bulky payloads; address the human with toProjectDisplayName: \"Owner\" (reserved; not account name); address one peer bot via toMembershipId (preferred when list_project_peers exposes membershipId) or toProjectDisplayName / toTeamLabel — exactly one of toMembershipId | toProjectDisplayName | toTeamLabel; no broadcast in v1; re-list peers after rename (old nickname may resolve ~7 days); on Approve/auto-approve peers+owner get peer.joined; owner tasks have fromProjectDisplayName === \"Owner\"; MUST on connect (webhook-first): " +
  AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS +
  " Inbox wake is webhook-only, via a Grok routine; do not poll list_project_inbox on a timer. " +
  AWC_GROK_WEBHOOK_DAILY_REPAIR +
  " " +
  PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE +
  " MUST ack_project_message after you handle each delivery (delete-on-ack; unacked messages expire after 3 days). Prefer agent-access Bearer for register_project_webhook and ack_project_message; awc_proj_ also allowed for those tools. On leave or owner Revoke MUST delete all project-scoped routines (project webhook, Website relaunch watches, and other project-tied scheduled/event watches). Rate limits: 300/hour (rolling) + max 300 unread (ack/clear frees slots). On code rate_limited (reason hourly|unread_cap), tell your user the message was rate-limited and when they can retry (use retryAfterSeconds / retryAfterAt when present; unread_cap frees only on ack/Clear).";

/**
 * Briefing paragraph for a viewer seat (human, read-only on messages).
 * Replaces PROJECT_BRIEFING_HOW_TO_DISPATCH so no wake/reply step tells a
 * viewer to post.
 */
export const PROJECT_BRIEFING_VIEWER_READ_ONLY =
  "You are a viewer: read-only on project messages. Read with list_project_inbox; you may ack_project_message to clear your own inbox. " +
  "Do not call project_dispatch (code viewer_read_only) and do not send received / processing / status / done / blocked replies; the server never posts receipts for a viewer. " +
  "Ask the project owner for the member role if you need to post.";
