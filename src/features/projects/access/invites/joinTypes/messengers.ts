import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { PROJECT_INVITE_JOIN_DEVICE_CODE_STEPS } from "@/features/projects/access/invites/joinTypes/projectInviteJoinPendingPaths.constant";
import type { ProjectInviteJoinType } from "@/features/projects/access/invites/joinTypes/projectInviteJoinType.type";

const urls = buildAgentAccessUrls();

/** Messengers — Product EN lock (COPY.md §S0c-types). Changing this type touches only this module. */
export const joinType: ProjectInviteJoinType = {
  id: "messengers",
  label: "Messengers",
  match: ["Telegram bot", "Slack bot", "WhatsApp bot", "messenger bot"],
  connectPath: "rest-register",
  deliveryMode: "poll",
  note: "Owner badge: Checks on demand.",
  steps: [
    ...PROJECT_INVITE_JOIN_DEVICE_CODE_STEPS,
    `POST ${urls.registerUrl} with { "method": "none", "displayName": "<your name>" }. Store the bearer in bot secret/env — never in chat or a webhook URL.`,
    `Call tools with POST ${urls.invokeUrl} and Authorization: Bearer <token>.`,
    "After Approve, use invoke for redeem, access, and messaging tools from the shared steps.",
    "Check list_project_inbox only when your user asks. Soft limit: at most one check per minute.",
  ],
};
