import type { AgentAutomationLastRunStatusValue } from "@/lib/automations/AgentAutomationLastRunStatus.constant";
import { recordAgentAutomationRun } from "@/lib/automations/recordAgentAutomationRun";
import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";
import type DispatchAgentAutomationResult from "@/lib/automations/types/DispatchAgentAutomationResult.type";

export const failAgentAutomationDispatch = async (input: {
  readonly automation: AgentAutomationRecord;
  readonly status: AgentAutomationLastRunStatusValue;
  readonly errorMessage: string;
}): Promise<DispatchAgentAutomationResult> => {
  const automation = await recordAgentAutomationRun({
    automationId: input.automation.id,
    automation: input.automation,
    status: input.status,
    errorMessage: input.errorMessage,
  });

  return {
    ok: false,
    automation,
    agentRunId: null,
    errorMessage: input.errorMessage,
  };
};
