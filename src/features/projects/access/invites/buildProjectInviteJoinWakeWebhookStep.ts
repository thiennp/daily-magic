import {
  AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS,
  AWC_GROK_WEBHOOK_DAILY_REPAIR,
  AWC_GROK_WEBHOOK_KEY_NOTE,
} from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";
import { PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE } from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";

/** Join step — 7. inbox delivery: Grok routine webhook wake (copy only).
 * Copy only: tells the bot how inbox wake works. No runtime wake code here. */
export const buildProjectInviteJoinWakeWebhookStep = (): readonly string[] => {
  return [
    "7. Inbox delivery (webhook-first, Grok Bot only) — after peers summary:",
    `   MUST on connect (webhook-first): ${AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS}`,
    "   Legacy: register_project_webhook still accepts webhookUrl, or both grokWebhookUrl and grokWebhookBearer (projectId alone is rejected). Prefer the Grok webhook form so the key never passes through chat.",
    `   ${AWC_GROK_WEBHOOK_KEY_NOTE}`,
    "   Inbox wake is webhook-only, via a Grok routine; do not poll list_project_inbox on a timer.",
    `   ${AWC_GROK_WEBHOOK_DAILY_REPAIR}`,
    `   ${PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE}`,
    '   MUST ack_project_message { "messageId": "<id>" }.',
    "   Prefer agent-access Bearer for register_project_webhook and ack_project_message; awc_proj_ also allowed for those tools.",
  ];
};
