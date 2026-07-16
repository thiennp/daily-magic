import { unauthorizedAgentOnlyError } from "@/lib/agentWitch/agentWitchHubClientOperations";
import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { getAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export interface TerminalStreamPublisherAuthorization {
  readonly executorUserId: string;
  readonly executorDeviceId: string | null;
}

export type AuthorizeTerminalStreamPublisherResult =
  | {
      readonly ok: true;
      readonly run: AgentRunRecord;
      readonly publisher: TerminalStreamPublisherAuthorization;
    }
  | { readonly ok: false; readonly error: AgentWitchMessage };

const resolvePublisher = (
  sender: AgentWitchHubClient,
): TerminalStreamPublisherAuthorization => ({
  executorUserId: sender.userId ?? "",
  executorDeviceId: sender.deviceId ?? null,
});

const deviceMatchesRun = (
  publisher: TerminalStreamPublisherAuthorization,
  run: AgentRunRecord,
): boolean => {
  if (run.deviceId === null) {
    return true;
  }

  return (
    publisher.executorDeviceId !== null &&
    publisher.executorDeviceId === run.deviceId
  );
};

export const authorizeTerminalStreamPublisher = async (
  sender: AgentWitchHubClient | undefined,
  runId: string,
  options?: { readonly allowNonRunning?: boolean },
  requestId?: string,
): Promise<AuthorizeTerminalStreamPublisherResult> => {
  if (sender?.role !== "agent" || !isNonEmptyString(sender.userId)) {
    return { ok: false, error: unauthorizedAgentOnlyError(requestId) };
  }

  const run = getAgentRunSession(runId) ?? (await getAgentRunById(runId));

  if (run === null) {
    return {
      ok: false,
      error: buildDispatchError("Unknown agent run.", requestId),
    };
  }

  const publisher = resolvePublisher(sender);

  if (run.executorUserId !== publisher.executorUserId) {
    return {
      ok: false,
      error: buildDispatchError("Agent is not the run executor.", requestId),
    };
  }

  if (!deviceMatchesRun(publisher, run)) {
    return {
      ok: false,
      error: buildDispatchError(
        "Agent device does not match the run executor device.",
        requestId,
      ),
    };
  }

  if (
    options?.allowNonRunning !== true &&
    run.status !== AgentRunStatus.RUNNING
  ) {
    return {
      ok: false,
      error: buildDispatchError("Agent run is not streaming.", requestId),
    };
  }

  return { ok: true, run, publisher };
};
