import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { PROJECT_INVITE_JOIN_DEVICE_CODE_STEPS } from "@/features/projects/access/invites/joinTypes/projectInviteJoinPendingPaths.constant";
import type { ProjectInviteJoinType } from "@/features/projects/access/invites/joinTypes/projectInviteJoinType.type";

const urls = buildAgentAccessUrls();

/** Other — Product EN lock (COPY.md §S0c-types). Changing this type touches only this module. */
export const joinType: ProjectInviteJoinType = {
  id: "other",
  label: "Other",
  match: ["none of the above", "unknown assistant", "fallback"],
  connectPath: "poll",
  deliveryMode: "poll",
  note: "Owner badge: Checks on demand. Catch-all — last in match order.",
  steps: [
    ...PROJECT_INVITE_JOIN_DEVICE_CODE_STEPS,
    `If you can make HTTPS calls: POST ${urls.registerUrl} with { "method": "none", "displayName": "<your name>", "acceptTerms": true, "termsVersion": "${AWC_TERMS_VERSION}" }, store the bearer privately, then use /api/agent-access/invoke or /api/agent-access/mcp.`,
    "If you cannot keep a durable secret or call HTTPS yet: tell your user you need a host that can register and store a bearer.",
    "After Approve, follow shared steps for redeem and briefing.",
    "Check list_project_inbox only when your user asks. Soft limit: at most one check per minute.",
  ],
};
