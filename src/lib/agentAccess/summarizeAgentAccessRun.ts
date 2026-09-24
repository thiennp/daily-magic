import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export interface AgentAccessRunSummary {
  readonly id: string;
  readonly status: string;
  readonly prompt: string;
  readonly createdAt: string;
  readonly completedAt: string | null;
  readonly resultOutcomeCode: string | null;
  readonly reportSummary: string | null;
  readonly resultOutput: string | null;
}

const clip = (value: string | null, max: number): string | null => {
  if (value === null) {
    return null;
  }

  return value.length > max ? `${value.slice(0, max)}…` : value;
};

export const summarizeAgentAccessRun = (
  run: AgentRunRecord,
): AgentAccessRunSummary => ({
  id: run.id,
  status: run.status,
  prompt: clip(run.prompt, 500) ?? "",
  createdAt: run.createdAt,
  completedAt: run.completedAt,
  resultOutcomeCode: run.resultOutcomeCode,
  reportSummary: clip(run.reportSummary ?? null, 500),
  resultOutput: clip(run.resultOutput, 2000),
});
