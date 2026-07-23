const OUTPUT_STORE_KEY = "daily-magic.agent-run-terminal-output.v1";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readOutputStore = (): Record<string, string> => {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = window.localStorage.getItem(OUTPUT_STORE_KEY);
  if (raw === null) {
    return {};
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, string] => typeof entry[1] === "string",
      ),
    );
  } catch {
    return {};
  }
};

const writeOutputStore = (store: Record<string, string>): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(OUTPUT_STORE_KEY, JSON.stringify(store));
};

export const loadAgentRunTerminalOutput = (runId: string): string =>
  readOutputStore()[runId] ?? "";

export const appendAgentRunTerminalOutput = (
  runId: string,
  chunk: string,
): string => {
  if (chunk.length === 0) {
    return loadAgentRunTerminalOutput(runId);
  }

  const outputs = readOutputStore();
  const nextOutput = `${outputs[runId] ?? ""}${chunk}`;
  outputs[runId] = nextOutput;
  writeOutputStore(outputs);
  return nextOutput;
};

export const setAgentRunTerminalOutput = (
  runId: string,
  output: string,
): void => {
  const outputs = readOutputStore();
  outputs[runId] = output;
  writeOutputStore(outputs);
};

export const removeAgentRunTerminalOutput = (runId: string): void => {
  const trimmedRunId = runId.trim();
  if (trimmedRunId.length === 0) {
    return;
  }

  const outputs = readOutputStore();
  if (!(trimmedRunId in outputs)) {
    return;
  }

  const remainingOutputs = { ...outputs };
  delete remainingOutputs[trimmedRunId];
  writeOutputStore(remainingOutputs);
};
