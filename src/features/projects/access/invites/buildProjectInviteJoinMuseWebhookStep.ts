import { AWC_MUSE_HMAC_WEBHOOK_REGISTER_STEPS } from "@/lib/agentAccess/awcMuseHmacWebhookRegisterCopy.constant";
import { PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE } from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";

/** Join step — 7. inbox delivery: Muse HMAC webhook wake (copy only).
 * Wording lives in awcMuseHmacWebhookRegisterCopy.constant.ts. The reply clause
 * is the shared dispatch line, in the same spot as the Grok step 7. */
export const buildProjectInviteJoinMuseWebhookStep = (): readonly string[] => {
  return [
    "7. Inbox delivery (webhook-first, Muse HMAC) — after peers summary:",
    `   MUST on connect (webhook-first): ${AWC_MUSE_HMAC_WEBHOOK_REGISTER_STEPS}`,
    "   Inbox wake is webhook-only; do not poll list_project_inbox on a timer.",
    "   Project scope (HARD): the wake POST body carries projectId + messageId for ONE project — use that projectId on every list_project_inbox / project_messenger_reply / project_dispatch / ack; never act on another project's messages in the same wake.",
    `   ${PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE}`,
    '   MUST ack_project_message { "messageId": "<id>" }.',
    "   Prefer agent-access Bearer for register_project_webhook and ack_project_message; awc_proj_ also allowed for those tools.",
  ];
};
