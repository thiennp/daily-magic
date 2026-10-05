import { randomUUID } from "node:crypto";

import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { isCursorCloudExecutorDeviceId } from "@/lib/cursorCloud/cursorCloudExecutorDeviceId.constant";
import { buildDashboardHttpSender } from "@/lib/dispatch/buildDashboardHttpSender";
import { dispatchClaudeRunForDashboardUserMac } from "@/lib/dispatch/dispatchClaudeRunForDashboardUserMac";
import { dispatchCursorCloudRunForDashboardUser } from "@/lib/dispatch/dispatchCursorCloudRunForDashboardUser";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import { resolveDashboardDispatchProjectContext } from "@/lib/dispatch/resolveDashboardDispatchProjectContext";
import { resolveTargetDeviceId } from "@/lib/dispatch/resolveWriterRunAgentClient";
import { validateSessionContinuationRequiresTargetDevice } from "@/lib/dispatch/validateSessionContinuationRequiresTargetDevice";
import type { DispatchClaudeRunForDashboardResult } from "@/lib/dispatch/types/DispatchClaudeRunForDashboardResult.type";

export type { DispatchClaudeRunForDashboardResult };

export const dispatchClaudeRunForDashboardUser = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly requesterUserId: string;
  readonly requesterEmail?: string | null;
  readonly body: AgentRunDispatchBody;
  readonly requestId?: string;
  readonly allowHubRelay?: boolean;
}): Promise<DispatchClaudeRunForDashboardResult> => {
  const requestId = input.requestId ?? randomUUID();
  const sender = buildDashboardHttpSender(
    input.requesterUserId,
    input.requesterEmail,
  );
  const continuationError = validateSessionContinuationRequiresTargetDevice({
    body: input.body,
    requestId,
  });
  if (continuationError !== null) {
    return { ok: false, message: continuationError };
  }

  const projectContext = await resolveDashboardDispatchProjectContext({
    body: input.body,
    requesterUserId: input.requesterUserId,
    targetDeviceId: input.body.targetDeviceId?.trim() || null,
    requestId,
  });
  if (!projectContext.ok) {
    return { ok: false, message: projectContext.message };
  }

  const { body, payload } = projectContext;
  const targetDeviceId = resolveTargetDeviceId(payload);

  if (
    targetDeviceId !== undefined &&
    isCursorCloudExecutorDeviceId(targetDeviceId)
  ) {
    return dispatchCursorCloudRunForDashboardUser({
      runtime: input.runtime,
      requesterUserId: input.requesterUserId,
      prompt: body.prompt,
      capabilityId: body.capabilityId ?? null,
      projectId: body.projectId ?? null,
      requestId,
    });
  }

  return dispatchClaudeRunForDashboardUserMac({
    runtime: input.runtime,
    sender,
    body,
    requesterUserId: input.requesterUserId,
    requestId,
    allowHubRelay: input.allowHubRelay !== false,
    payload,
    targetDeviceId,
  });
};
