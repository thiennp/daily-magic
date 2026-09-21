import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { advanceOfficialWorkflowRunAfterAgentRun } from "@/lib/workflowOrchestration/advanceOfficialWorkflowRunAfterAgentRun";
import { completeOfficialWorkflowHumanStep } from "@/lib/workflowOrchestration/completeOfficialWorkflowHumanStep";
import { continueOfficialWorkflowRun } from "@/lib/workflowOrchestration/continueOfficialWorkflowRun";
import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import { officialWorkflowDispatchTestState } from "@/lib/workflowOrchestration/officialWorkflowRunEngine.testState";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";
import { createWorkflowRunRecord } from "@/lib/workflowOrchestration/workflowRunQueries";

export const ENGINE_TEST_REQUESTER_USER_ID = "user-1";

export const engineTestBroadcasts: AgentWitchMessage[] = [];

export const engineTestRuntime = {
  broadcastToDashboardUser: (_userId: string, message: AgentWitchMessage) => {
    engineTestBroadcasts.push(message);
  },
} as unknown as AgentWitchHubRuntime;

export const resetEngineTestState = (): void => {
  engineTestBroadcasts.length = 0;
  officialWorkflowDispatchTestState.shouldFail = false;
  officialWorkflowDispatchTestState.lastRunId = "";
};

export const finishEngineTestAgentStep = async (
  exitCode: number,
  output: string,
): Promise<void> => {
  await advanceOfficialWorkflowRunAfterAgentRun(
    engineTestRuntime,
    officialWorkflowDispatchTestState.lastRunId,
    exitCode,
    output,
  );
};

export const buildEngineTestDefinition = (): OfficialWorkflowDefinition => ({
  templateId: "engine-demo",
  version: 2,
  capabilityName: "Engine demo",
  nodes: [
    buildOfficialWorkflowHumanNode(0, "Confirm scope", "Confirm the scope."),
    buildOfficialWorkflowAgentNode(1, "Draft", "Draft the change."),
    buildOfficialWorkflowHumanNode(2, "Review draft", "Approve or ask fixes.", {
      allowSkip: true,
    }),
    buildOfficialWorkflowAgentNode(3, "Apply fixes", "Apply requested fixes.", {
      skipWhenPriorResponseMatches: ["approve"],
    }),
    buildOfficialWorkflowHumanNode(4, "Confirm fixes", "Confirm the fixes."),
  ],
});

export const startEngineTestRun = async (
  definition: OfficialWorkflowDefinition,
): Promise<string> => {
  const run = await createWorkflowRunRecord({
    requesterUserId: ENGINE_TEST_REQUESTER_USER_ID,
    executorUserId: ENGINE_TEST_REQUESTER_USER_ID,
    deviceId: "device-1",
    capabilityId: "capability-1",
    templateId: definition.templateId,
    fieldValues: {},
    definitionSnapshot: definition as unknown as Record<string, unknown>,
    orchestrationVersion: definition.version,
  });

  await continueOfficialWorkflowRun({
    runtime: engineTestRuntime,
    workflowRunId: run.id,
    requesterUserId: ENGINE_TEST_REQUESTER_USER_ID,
    dispatchBodyBase: { writerAgent: "claude-cli", capabilityId: null },
  });

  return run.id;
};

export const readLastEngineTestHumanStep = ():
  Readonly<Record<string, unknown>> | undefined =>
  engineTestBroadcasts
    .filter(
      (entry) =>
        entry.type === AGENT_WITCH_MESSAGE_TYPES.WORKFLOW_HUMAN_STEP_REQUIRED,
    )
    .at(-1)?.payload;

export const answerPendingEngineTestHumanStep = async (
  workflowRunId: string,
  response: string,
): Promise<void> => {
  const payload = readLastEngineTestHumanStep();
  await completeOfficialWorkflowHumanStep({
    runtime: engineTestRuntime,
    requesterUserId: ENGINE_TEST_REQUESTER_USER_ID,
    workflowRunId,
    stepRunId: String(payload?.stepRunId),
    response,
    dispatchBodyBase: { writerAgent: "claude-cli" },
  });
};
