import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { buildProjectInviteJoinAccessCheckStep } from "@/features/projects/access/invites/buildProjectInviteJoinAccessCheckStep";
import { buildProjectInviteJoinBriefingPeersStep } from "@/features/projects/access/invites/buildProjectInviteJoinBriefingPeersStep";
import { buildProjectInviteJoinConnectStep } from "@/features/projects/access/invites/buildProjectInviteJoinConnectStep";
import { buildProjectInviteJoinDispatchStep } from "@/features/projects/access/invites/buildProjectInviteJoinDispatchStep";
import { buildProjectInviteJoinFallbackPrompt } from "@/features/projects/access/invites/buildProjectInviteJoinFallbackPrompt";
import { buildProjectInviteJoinLeaveStep } from "@/features/projects/access/invites/buildProjectInviteJoinLeaveStep";
import { buildProjectInviteJoinProjectLine } from "@/features/projects/access/invites/buildProjectInviteJoinProjectLine";
import { buildProjectInviteJoinRedeemStep } from "@/features/projects/access/invites/buildProjectInviteJoinRedeemStep";
import { buildProjectInviteJoinWakeWebhookStep } from "@/features/projects/access/invites/buildProjectInviteJoinWakeWebhookStep";
import { resolveProjectInviteJoinToken } from "@/features/projects/access/invites/resolveProjectInviteJoinToken";

/** Static join text (no input, not reused): kept inline. */
const GOAL_LINES: readonly string[] = [
  "Goal: join this Agent Witch project via invite redeem.",
];

/** Step 5 — human summary before further work. */
const SUMMARY_LINES: readonly string[] = [
  "5. BEFORE any further work: print a clear human summary to your user covering project name, folder/repo refs, your nickname (self), peer nicknames (projectDisplayName) and teamLabels, and how to work on this project.",
  "   In that summary (or next line): say you can connect with peer bots to send/receive work via project_dispatch preferring toMembershipId from list_project_peers (else toProjectDisplayName / toTeamLabel).",
];

/** Step 9 — check_product_updates. */
const PRODUCT_UPDATES_LINES: readonly string[] = [
  "9. Product updates — after connect / post-Approve summary, and periodically while active:",
  '   Call check_product_updates { "sinceCatalogVersion": <lastSeen or 0> }.',
  "   Start with sinceCatalogVersion 0 after join; afterwards pass the last catalogVersion you stored.",
  "   Response includes catalogVersion, entries[], tools[], connect, and adaptHint.",
  "   When hasUpdates (catalog advances): adapt behavior from entries[].adapt, tools, connect, and adaptHint; tell your user briefly that the product catalog advanced.",
  "   Store returned catalogVersion for the next call. check_product_updates is catalog-wide — use agent-access Bearer (required/preferred); awc_proj_ alone 401s. Dual-auth: awc_proj_ OK only for project-scoped tools listed in step 4c; prefer agent-access for register_project_webhook and ack_project_message.",
];

export type ProjectInviteJoinPromptInput = {
  readonly inviteUrl: string;
  readonly token?: string | null;
  readonly projectId?: string;
  readonly projectName?: string | null;
};

/**
 * Join orchestrator — the invite Copy prompt. Calls each join step in order
 * and joins them with a blank line. Pure: no env, clock, or DB reads; copy only.
 */
export const buildProjectInviteJoinPrompt = (
  input: ProjectInviteJoinPromptInput,
): string => {
  const token = resolveProjectInviteJoinToken(input);
  const projectLine = buildProjectInviteJoinProjectLine(input);
  if (!token) {
    return buildProjectInviteJoinFallbackPrompt({ projectLine });
  }
  const projectIdHint =
    input.projectId?.trim() || "<projectId from redeem response>";
  const steps: readonly (readonly string[])[] = [
    GOAL_LINES,
    buildProjectInviteJoinConnectStep({ urls: buildAgentAccessUrls() }),
    buildProjectInviteJoinRedeemStep({ token }),
    buildProjectInviteJoinAccessCheckStep({ projectIdHint }),
    buildProjectInviteJoinBriefingPeersStep({ projectIdHint }),
    SUMMARY_LINES,
    buildProjectInviteJoinDispatchStep({ projectIdHint }),
    buildProjectInviteJoinWakeWebhookStep(),
    buildProjectInviteJoinLeaveStep({ projectIdHint }),
    PRODUCT_UPDATES_LINES,
  ];
  const lines = steps.flatMap((step, index) =>
    index === 0 ? [...step] : ["", ...step],
  );
  if (projectLine) {
    lines.push("", projectLine);
  }
  return lines.join(String.fromCharCode(10));
};
