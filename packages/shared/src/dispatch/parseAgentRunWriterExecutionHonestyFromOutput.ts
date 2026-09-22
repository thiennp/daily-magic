import {
  AGENT_RUN_WRITER_EXECUTION_CLI_MISSING_WRITER_API_KEY_BACKEND,
  AGENT_RUN_WRITER_EXECUTION_HONESTY_MARKER,
} from "./agentRunWriterExecutionHonesty.constant";

export type ParsedAgentRunWriterExecutionHonesty = {
  readonly backend: string;
  readonly reasonCode: string | null;
};

const parseKeyValueLine = (
  line: string,
): { readonly key: string; readonly value: string } | null => {
  const separatorIndex = line.indexOf("=");
  if (separatorIndex <= 0) {
    return null;
  }
  const key = line.slice(0, separatorIndex).trim();
  const value = line.slice(separatorIndex + 1).trim();
  if (key.length === 0) {
    return null;
  }
  return { key, value };
};

export const parseAgentRunWriterExecutionHonestyFromOutput = (
  output: string,
): ParsedAgentRunWriterExecutionHonesty | null => {
  const markerIndex = output.indexOf(AGENT_RUN_WRITER_EXECUTION_HONESTY_MARKER);
  if (markerIndex < 0) {
    return null;
  }

  const afterMarker = output.slice(
    markerIndex + AGENT_RUN_WRITER_EXECUTION_HONESTY_MARKER.length,
  );
  const lines = afterMarker
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  let backend: string | null = null;
  let reasonCode: string | null = null;

  for (const line of lines.slice(0, 8)) {
    const parsed = parseKeyValueLine(line);
    if (parsed === null) {
      break;
    }
    if (parsed.key === "agentRunWriterExecutionBackend") {
      backend = parsed.value;
    }
    if (parsed.key === "agentRunWriterExecutionReasonCode") {
      reasonCode = parsed.value;
    }
  }

  if (backend === null) {
    return null;
  }

  return { backend, reasonCode };
};

export const isCliWriterApiKeyMissingExecutionBackend = (
  backend: string | null,
): boolean =>
  backend === AGENT_RUN_WRITER_EXECUTION_CLI_MISSING_WRITER_API_KEY_BACKEND;
