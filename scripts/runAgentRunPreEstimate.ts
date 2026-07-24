import {
  runHeadlessWriter,
  type AgentWitchHeadlessWriterConfig,
} from "./agentWitchHeadlessWriterRun";
import type { HarnessWriterAgentId } from "./buildWriterCliInvocation";
import { buildAgentRunPreEstimatePrompt } from "./dispatch/agentRunWorkingEstimate.constant";
import { extractUserTaskFromWrappedPrompt } from "./dispatch/extractUserTaskFromWrappedPrompt";
import { formatAgentRunEstimateSummary } from "./dispatch/formatAgentRunEstimateSummary";
import { parseAgentRunWorkingEstimateSeconds } from "./dispatch/parseAgentRunWorkingEstimateSeconds";
import {
  AGENT_RUN_REPORT_STATUSES,
  upsertAgentRunReportFile,
} from "./agentWitchRunReport";

export type AgentRunPreEstimateResult = {
  readonly estimateSeconds: number | null;
  readonly estimateSummary: string;
  readonly estimateOutput: string;
};

export const runAgentRunPreEstimate = async (input: {
  readonly config: AgentWitchHeadlessWriterConfig;
  readonly writerAgent: HarnessWriterAgentId;
  readonly wrappedPrompt: string;
  readonly projectFolderPath: string;
  readonly reportKey: string;
  readonly agentRunId: string;
}): Promise<AgentRunPreEstimateResult> => {
  const taskPrompt = extractUserTaskFromWrappedPrompt(input.wrappedPrompt);
  const estimatePrompt = buildAgentRunPreEstimatePrompt(taskPrompt);
  const headlessResult = await runHeadlessWriter(
    input.config,
    input.writerAgent,
    estimatePrompt,
  );
  const estimateSeconds = parseAgentRunWorkingEstimateSeconds(
    headlessResult.output,
  );
  const estimateSummary = formatAgentRunEstimateSummary(estimateSeconds);

  upsertAgentRunReportFile({
    projectFolderPath: input.projectFolderPath,
    reportKey: input.reportKey,
    agentRunId: input.agentRunId,
    status: AGENT_RUN_REPORT_STATUSES.IN_PROGRESS,
    userSummary: estimateSummary,
    ...(headlessResult.output.trim().length > 0
      ? { details: headlessResult.output.trim() }
      : {}),
    ...(estimateSeconds !== null ? { estimateSeconds } : {}),
  });

  return {
    estimateSeconds,
    estimateSummary,
    estimateOutput: headlessResult.output,
  };
};
