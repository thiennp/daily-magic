import { stripAgentRunWavePlanFromOutput } from "@/features/agent/utils/stripAgentRunWavePlanFromOutput";
import type { AgentRunInputContext } from "@/lib/dispatch/agentRunInputContext.type";

const optionalTrimmedString = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export const parseAgentRunInputContext = (
  value: unknown,
): AgentRunInputContext | undefined => {
  if (typeof value !== "object" || value === null) return undefined;
  const record = value as Record<string, unknown>;
  const agentLabel = optionalTrimmedString(record.agentLabel);
  if (agentLabel === null) return undefined;
  return {
    agentLabel,
    computerName: optionalTrimmedString(record.computerName),
    projectName: optionalTrimmedString(record.projectName),
    taskTitle: optionalTrimmedString(record.taskTitle),
  };
};

export const parseAgentRunInputRequest = (
  payload: Record<string, unknown>,
): {
  readonly agentRunId: string;
  readonly question: string;
  readonly partialOutput: string;
  readonly context?: AgentRunInputContext;
} | null => {
  const agentRunId =
    typeof payload.agentRunId === "string" ? payload.agentRunId : "";
  const question = stripAgentRunWavePlanFromOutput(
    typeof payload.question === "string" ? payload.question : "",
  );
  const partialOutput = stripAgentRunWavePlanFromOutput(
    typeof payload.partialOutput === "string" ? payload.partialOutput : "",
  );
  if (agentRunId.length === 0 || question.length === 0) return null;
  const context = parseAgentRunInputContext(payload.context);
  return {
    agentRunId,
    question,
    partialOutput,
    ...(context !== undefined ? { context } : {}),
  };
};
