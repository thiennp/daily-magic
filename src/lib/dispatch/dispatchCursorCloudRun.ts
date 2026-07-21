import { createCursorCloudAgentRun } from "@/lib/cursorCloud/createCursorCloudAgentRun";
import { getCursorCloudApiKeyForUser } from "@/lib/cursorCloud/cursorCloudConnectionQueries";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { broadcastAgentRunRecord } from "@/lib/dispatch/broadcastAgentRunRecord";
import {
  buildCursorCloudRunResultOutput,
  resolveCursorCloudAuthSecret,
} from "@/lib/dispatch/buildCursorCloudRunResultOutput";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import { updateAgentRunStatus } from "@/lib/dispatch/agentRunQueries";
import { persistAgentRun } from "@/lib/dispatch/persistAgentRun";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const buildCursorCloudDispatchError = (
  errorMessage: string,
  requestId?: string,
): { readonly ok: false; readonly message: AgentWitchMessage } => ({
  ok: false,
  message: {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
    payload: { errorMessage },
    requestId,
  },
});

export const dispatchCursorCloudRun = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly requesterUserId: string;
  readonly prompt: string;
  readonly groupId: string | null;
  readonly dispatchPolicy: DispatchPolicyValue;
  readonly capabilityId: string | null;
  readonly capabilityVersionId: string | null;
  readonly requestId?: string;
}): Promise<
  | {
      readonly ok: true;
      readonly message: AgentWitchMessage;
      readonly run: AgentRunRecord;
    }
  | { readonly ok: false; readonly message: AgentWitchMessage }
> => {
  const authSecret = resolveCursorCloudAuthSecret();
  if (authSecret === null) {
    return buildCursorCloudDispatchError(
      "Server auth is not configured for Cursor Cloud.",
      input.requestId,
    );
  }

  const apiKey = await getCursorCloudApiKeyForUser(
    input.requesterUserId,
    authSecret,
  );
  if (apiKey === null) {
    return buildCursorCloudDispatchError(
      "Connect Cursor Cloud on Home before sending cloud tasks.",
      input.requestId,
    );
  }

  const created = await createCursorCloudAgentRun({
    apiKey,
    prompt: input.prompt,
  });
  if (created === null) {
    return buildCursorCloudDispatchError(
      "Cursor Cloud rejected the task. Check your API key and plan.",
      input.requestId,
    );
  }

  const persistedRun = await persistAgentRun({
    groupId: input.groupId,
    requesterUserId: input.requesterUserId,
    executorUserId: input.requesterUserId,
    deviceId: null,
    prompt: input.prompt,
    status: AgentRunStatus.RUNNING,
    dispatchPolicy: input.dispatchPolicy,
    writerAgent: "cursor-cloud",
    capabilityId: input.capabilityId,
    capabilityVersionId: input.capabilityVersionId,
  });

  const run =
    (await updateAgentRunStatus(persistedRun.id, AgentRunStatus.RUNNING, {
      resultOutput: buildCursorCloudRunResultOutput(created),
    })) ?? persistedRun;

  broadcastAgentRunRecord(input.runtime, run, input.requestId);

  return {
    ok: true,
    message: {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      payload: {
        dispatched: true,
        agentRunId: run.id,
        cursorCloudAgentId: created.agentId,
        cursorCloudAgentUrl: created.agentUrl,
        cursorCloudRunId: created.runId,
      },
      requestId: input.requestId,
    },
    run,
  };
};
