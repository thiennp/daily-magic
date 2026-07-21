import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { dispatchCursorCloudRun } from "@/lib/dispatch/dispatchCursorCloudRun";
import { finalizeDashboardDispatchResult } from "@/lib/dispatch/finalizeDashboardDispatchResult";
import { resolveDispatchPolicyForExecutor } from "@/lib/dispatch/resolveDispatchPolicyForExecutor";
import type { DispatchClaudeRunForDashboardResult } from "@/lib/dispatch/dispatchClaudeRunForDashboardUser";

export const dispatchCursorCloudRunForDashboardUser = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly requesterUserId: string;
  readonly prompt: string;
  readonly capabilityId: string | null;
  readonly requestId: string;
}): Promise<DispatchClaudeRunForDashboardResult> => {
  const dispatchPolicy = await resolveDispatchPolicyForExecutor({
    executorUserId: input.requesterUserId,
    groupId: null,
    capabilityPolicyOverride: null,
  });
  const cloudResult = await dispatchCursorCloudRun({
    runtime: input.runtime,
    requesterUserId: input.requesterUserId,
    prompt: input.prompt,
    groupId: null,
    dispatchPolicy,
    capabilityId: input.capabilityId,
    capabilityVersionId: null,
    requestId: input.requestId,
  });
  if (!cloudResult.ok) {
    return cloudResult;
  }
  return finalizeDashboardDispatchResult(cloudResult.message, input.requestId);
};
