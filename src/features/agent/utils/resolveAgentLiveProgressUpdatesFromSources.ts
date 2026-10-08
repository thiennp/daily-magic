import { cleanAgentOutputForUser } from "@/features/agent/utils/cleanAgentOutputForUser";
import {
  parseAgentLiveProgressUpdates,
  type AgentLiveProgressUpdate,
} from "@/features/agent/utils/parseAgentLiveProgressUpdates";

/** Prefer the richer stream when pause-time partialOutput has more [[PROGRESS]] blocks. */
export const resolveAgentLiveProgressUpdatesFromSources = (
  output: string,
  partialOutput?: string | null,
): readonly AgentLiveProgressUpdate[] => {
  // Harness rule lines that mention [[PROGRESS]] must never become updates.
  const fromOutput = parseAgentLiveProgressUpdates(
    cleanAgentOutputForUser(output, { keepMarkers: true }),
  );
  const fromPartial = parseAgentLiveProgressUpdates(
    cleanAgentOutputForUser(partialOutput ?? "", { keepMarkers: true }),
  );

  if (fromPartial.length === 0) {
    return fromOutput;
  }
  if (fromOutput.length === 0) {
    return fromPartial;
  }

  return fromPartial.length >= fromOutput.length ? fromPartial : fromOutput;
};

export const resolveAgentLiveProgressCleanedSource = (
  output: string,
  partialOutput?: string | null,
): string => {
  const primary = output.trim();
  const partial = (partialOutput ?? "").trim();

  if (partial.length === 0) {
    return output;
  }
  if (primary.length === 0) {
    return partialOutput ?? "";
  }
  if (partial.includes(primary)) {
    return partialOutput ?? "";
  }
  if (primary.includes(partial)) {
    return output;
  }

  return `${output}\n${partial}`;
};
