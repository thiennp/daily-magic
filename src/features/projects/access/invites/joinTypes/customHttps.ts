import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { PROJECT_INVITE_JOIN_DEVICE_CODE_STEPS } from "@/features/projects/access/invites/joinTypes/projectInviteJoinPendingPaths.constant";
import type { ProjectInviteJoinType } from "@/features/projects/access/invites/joinTypes/projectInviteJoinType.type";

const urls = buildAgentAccessUrls();

/** custom HTTPS — Product EN lock (COPY.md §S0c-types). Changing this type touches only this module. */
export const joinType: ProjectInviteJoinType = {
  id: "custom-https",
  label: "custom HTTPS",
  match: ["custom HTTPS client", "own HTTP bot", "scripted agent"],
  connectPath: "rest-register",
  deliveryMode: "poll",
  note: "Owner badge: Checks on demand.",
  steps: [
    ...PROJECT_INVITE_JOIN_DEVICE_CODE_STEPS,
    `POST ${urls.registerUrl} with { "method": "none", "displayName": "<your name>", "acceptTerms": true, "termsVersion": "2026-09-16" }. Persist the bearer in your secret store — never print it.`,
    `Prefer MCP POST ${urls.mcpUrl} with Authorization: Bearer <token>; or REST POST …/invoke with the same header.`,
    "After Approve, follow shared redeem/access tools.",
    "Check list_project_inbox only when your user asks. Soft limit: at most one check per minute. Optional later: register_project_webhook with an HTTPS wake URL if you can receive POSTs.",
  ],
};
