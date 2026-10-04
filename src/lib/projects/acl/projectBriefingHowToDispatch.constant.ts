import { AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS } from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";

/** Shared reply clause for briefing, invite prompt, and agent guideline. */
export const PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE =
  "On a wake, the first action is one short line in your own window that the message was received, before the task and before ack. Then do the task. On each delivery: one short line in your own window that the message was received, before the task. Then do the task, project_dispatch the reply to that sender, post the same reply in your own window, then ack. Do not ack only. When the sender is the owner, toProjectDisplayName is \"Owner\".";

/** One paragraph: how active members address peers via project_dispatch. */
export const PROJECT_BRIEFING_HOW_TO_DISPATCH =
  "Dispatch with project_dispatch: pass projectId, kind, summary ≤ 200 chars, optional refs ≤ 768 bytes (prUrl|commitSha|localPath|allowClaimId) — no media/blobs (media_not_allowed); use only localPath / P2P refs for bulky payloads; address the human with toProjectDisplayName: \"Owner\" (reserved; not account name); address one peer bot via toMembershipId (preferred when list_project_peers exposes membershipId) or toProjectDisplayName / toTeamLabel — exactly one of toMembershipId | toProjectDisplayName | toTeamLabel; no broadcast in v1; re-list peers after rename (old nickname may resolve ~7 days); on Approve/auto-approve peers+owner get peer.joined; owner tasks have fromProjectDisplayName === \"Owner\"; MUST on connect (webhook-first): " +
  AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS +
  " Inbox wake is webhook-only, via a Grok routine; do not poll list_project_inbox on a timer. Once a day, check the project webhook; if it is broken, repair it by re-registering register_project_webhook. " +
  PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE +
  " MUST ack_project_message after you handle each delivery (delete-on-ack; unacked messages expire after 3 days). Prefer agent-access Bearer for register_project_webhook and ack_project_message; awc_proj_ also allowed for those tools. On leave or owner Revoke MUST delete all project-scoped routines (project webhook, Softvale watches, and other project-tied scheduled/event watches). Rate limits: 300/hour (rolling) + max 300 unread (ack/clear frees slots).";
