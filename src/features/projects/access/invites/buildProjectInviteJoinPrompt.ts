import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import { buildProjectInviteJoinAccessCheckStep } from "@/features/projects/access/invites/buildProjectInviteJoinAccessCheckStep";
import { buildProjectInviteJoinBriefingPeersStep } from "@/features/projects/access/invites/buildProjectInviteJoinBriefingPeersStep";
import { buildProjectInviteJoinConnectStep } from "@/features/projects/access/invites/buildProjectInviteJoinConnectStep";
import { buildProjectInviteJoinDispatchStep } from "@/features/projects/access/invites/buildProjectInviteJoinDispatchStep";
import { buildProjectInviteJoinFallbackPrompt } from "@/features/projects/access/invites/buildProjectInviteJoinFallbackPrompt";
import { buildProjectInviteJoinGoalStep } from "@/features/projects/access/invites/buildProjectInviteJoinGoalStep";
import { buildProjectInviteJoinLeaveStep } from "@/features/projects/access/invites/buildProjectInviteJoinLeaveStep";
import { buildProjectInviteJoinProductUpdatesStep } from "@/features/projects/access/invites/buildProjectInviteJoinProductUpdatesStep";
import { buildProjectInviteJoinProjectLine } from "@/features/projects/access/invites/buildProjectInviteJoinProjectLine";
import { buildProjectInviteJoinRedeemStep } from "@/features/projects/access/invites/buildProjectInviteJoinRedeemStep";
import { buildProjectInviteJoinSummaryStep } from "@/features/projects/access/invites/buildProjectInviteJoinSummaryStep";
import { buildProjectInviteJoinWakeWebhookStep } from "@/features/projects/access/invites/buildProjectInviteJoinWakeWebhookStep";
import { resolveProjectInviteJoinToken } from "@/features/projects/access/invites/resolveProjectInviteJoinToken";

export type ProjectInviteJoinPromptInput = {
  readonly inviteUrl: string;
  readonly token?: string | null;
  readonly projectId?: string;
  readonly projectName?: string | null;
};

/**
 * Join orchestrator — the invite Copy prompt. Calls each join step in order
 * and joins them with a blank line. Copy only: no runtime state changes.
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
    buildProjectInviteJoinGoalStep(),
    buildProjectInviteJoinConnectStep({ urls: buildAgentAccessUrls() }),
    buildProjectInviteJoinRedeemStep({ token }),
    buildProjectInviteJoinAccessCheckStep({ projectIdHint }),
    buildProjectInviteJoinBriefingPeersStep({ projectIdHint }),
    buildProjectInviteJoinSummaryStep(),
    buildProjectInviteJoinDispatchStep({ projectIdHint }),
    buildProjectInviteJoinWakeWebhookStep(),
    buildProjectInviteJoinLeaveStep({ projectIdHint }),
    buildProjectInviteJoinProductUpdatesStep(),
  ];
  const lines = steps.flatMap((step, index) =>
    index === 0 ? [...step] : ["", ...step],
  );
  if (projectLine) {
    lines.push("", projectLine);
  }
  return lines.join(String.fromCharCode(10));
};
