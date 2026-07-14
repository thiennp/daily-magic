export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const readRunId = (payload: Record<string, unknown>): string | null => {
  const runId = payload.runId ?? payload.agentRunId;
  return typeof runId === "string" && runId.length > 0 ? runId : null;
};

export const appendOutput = (current: string, chunk: string): string =>
  chunk.length === 0 ? current : `${current}${chunk}`;

export const mergeTerminalResultOutput = (
  currentOutput: string,
  resultOutput: string,
): string => {
  const trimmedResult = resultOutput.trimEnd();
  if (trimmedResult.length === 0) {
    return currentOutput;
  }

  if (currentOutput.includes(trimmedResult)) {
    return currentOutput;
  }

  const separator =
    currentOutput.length === 0 || currentOutput.endsWith("\n") ? "" : "\n";

  return `${currentOutput}${separator}${resultOutput}`;
};

export const matchesActiveRun = (
  activeRunId: string | null,
  payload: Record<string, unknown>,
): boolean => activeRunId !== null && readRunId(payload) === activeRunId;
