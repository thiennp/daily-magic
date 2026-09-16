import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import type { ClaudeRunAgentResolution } from "@/lib/dispatch/resolveWriterRunAgentClient";
import { tryDispatchClaudeRunThroughHubRelay } from "@/lib/dispatch/tryDispatchClaudeRunThroughHubRelay";
import { buildWriterRunUnavailableDispatchMessage } from "@/lib/dispatch/buildWriterRunUnavailableDispatchMessage";
import type { DispatchClaudeRunForDashboardResult } from "@/lib/dispatch/types/DispatchClaudeRunForDashboardResult.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

export const resolveWriterDispatchWithoutLiveHubClient = async (input: {
  readonly allowHubRelay: boolean;
  readonly agentResolution: Extract<
    ClaudeRunAgentResolution,
    { readonly ok: true }
  >;
  readonly executorUserId: string;
  readonly requesterUserId: string;
  readonly requestId: string;
  readonly body: AgentRunDispatchBody;
  readonly fallbackDeviceId: string | undefined;
}): Promise<DispatchClaudeRunForDashboardResult> => {
  const resolvedDeviceId = input.agentResolution.deviceId;

  if (
    input.allowHubRelay &&
    resolvedDeviceId !== null &&
    resolvedDeviceId.length > 0
  ) {
    const relayResult = await tryDispatchClaudeRunThroughHubRelay({
      executorUserId: input.executorUserId,
      requesterUserId: input.requesterUserId,
      deviceId: resolvedDeviceId,
      requestId: input.requestId,
      body: input.body,
    });

    if (relayResult !== null) {
      return relayResult;
    }
  }

  const unavailableDeviceId =
    resolvedDeviceId !== null && resolvedDeviceId.length > 0
      ? resolvedDeviceId
      : (input.fallbackDeviceId ?? "");

  const message: AgentWitchMessage =
    await buildWriterRunUnavailableDispatchMessage({
      deviceId: unavailableDeviceId,
      requestId: input.requestId,
    });

  return { ok: false, message };
};
