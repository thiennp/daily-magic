import { randomUUID } from "node:crypto";

import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { resolveCapabilityForDispatch } from "@/lib/capabilities/resolveCapabilityForDispatch";
import { buildClaudeDispatchPayloadFromBody } from "@/lib/dispatch/buildClaudeDispatchPayloadFromBody";
import { buildDashboardHttpSender } from "@/lib/dispatch/buildDashboardHttpSender";
import { executeClaudeRunDispatch } from "@/lib/dispatch/executeClaudeRunDispatch";
import { finalizeDashboardDispatchResult } from "@/lib/dispatch/finalizeDashboardDispatchResult";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import { resolveDispatchPolicyForExecutor } from "@/lib/dispatch/resolveDispatchPolicyForExecutor";
import {
  resolveClaudeRunAgentClient,
  resolveTargetDeviceId,
} from "@/lib/dispatch/resolveClaudeRunAgentClient";
import { resolveClaudeDispatchTarget } from "@/lib/dispatch/resolveClaudeDispatchTarget";
import { validateSessionContinuationRequiresTargetDevice } from "@/lib/dispatch/validateSessionContinuationRequiresTargetDevice";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

export type DispatchClaudeRunForDashboardResult =
  | {
      readonly ok: true;
      readonly message: AgentWitchMessage;
      readonly run: AgentRunRecord;
    }
  | {
      readonly ok: false;
      readonly message: AgentWitchMessage;
    };

export const dispatchClaudeRunForDashboardUser = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly requesterUserId: string;
  readonly requesterEmail?: string | null;
  readonly body: AgentRunDispatchBody;
  readonly requestId?: string;
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

  const payload = buildClaudeDispatchPayloadFromBody(input.body);

  const target = await resolveClaudeDispatchTarget(sender, payload);
  if (!target.ok) {
    return { ok: false, message: target.error };
  }

  const capabilityResolution = await resolveCapabilityForDispatch(
    input.requesterUserId,
    target.executorUserId,
    input.body.capabilityId ?? undefined,
    target.groupId,
    requestId,
  );

  if (!capabilityResolution.ok) {
    return { ok: false, message: capabilityResolution.error };
  }

  const agentResolution = await resolveClaudeRunAgentClient({
    runtime: input.runtime,
    senderUserId: input.requesterUserId,
    executorUserId: target.executorUserId,
    targetDeviceId: resolveTargetDeviceId(payload),
    requestId,
  });

  if (!agentResolution.ok) {
    return { ok: false, message: agentResolution.error };
  }

  const dispatchPolicy = await resolveDispatchPolicyForExecutor({
    executorUserId: target.executorUserId,
    groupId: target.groupId,
    capabilityPolicyOverride:
      capabilityResolution.capability?.dispatchPolicyOverride ?? null,
  });

  const message = await executeClaudeRunDispatch({
    runtime: input.runtime,
    agentClient: agentResolution.agentClient,
    deviceId: agentResolution.deviceId,
    sender,
    prompt: input.body.prompt,
    payload,
    executorUserId: target.executorUserId,
    groupId: target.groupId,
    dispatchPolicy,
    capabilityId: capabilityResolution.capability?.id ?? null,
    capabilityVersionId: capabilityResolution.capabilityVersionId,
    requestId,
  });

  return finalizeDashboardDispatchResult(message, requestId);
};
