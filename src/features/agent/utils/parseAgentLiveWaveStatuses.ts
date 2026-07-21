import type { AgentLiveWaveItemStatus } from "@/features/agent/utils/agentLiveWavePlan.type";
import { AGENT_RUN_WAVE_STATUS_MARKER } from "@/lib/dispatch/agentRunWavePlan.constant";

const STATUS_LINE = /^([^|\n]+)\|(pending|working|done)\s*$/i;

const collectStatuses = (
  lines: readonly string[],
  index: number,
  statuses: ReadonlyMap<string, AgentLiveWaveItemStatus>,
): ReadonlyMap<string, AgentLiveWaveItemStatus> => {
  if (index >= lines.length) {
    return statuses;
  }

  const line = (lines[index] ?? "").trim();
  if (line.startsWith("[[") && line.includes("]]")) {
    return statuses;
  }

  const match = STATUS_LINE.exec(line);
  if (match === null) {
    return collectStatuses(lines, index + 1, statuses);
  }

  const id = (match[1] ?? "").trim();
  const status = (match[2] ?? "").toLowerCase() as AgentLiveWaveItemStatus;
  if (id.length === 0) {
    return collectStatuses(lines, index + 1, statuses);
  }

  const next = new Map(statuses);
  next.set(id, status);
  return collectStatuses(lines, index + 1, next);
};

/** Merge all [[WAVE_STATUS]] blocks; later lines override earlier ones. */
export const parseAgentLiveWaveStatuses = (
  output: string,
): ReadonlyMap<string, AgentLiveWaveItemStatus> => {
  if (!output.includes(AGENT_RUN_WAVE_STATUS_MARKER)) {
    return new Map();
  }

  const parts = output.split(AGENT_RUN_WAVE_STATUS_MARKER).slice(1);
  return parts.reduce<ReadonlyMap<string, AgentLiveWaveItemStatus>>(
    (statuses, part) => {
      const lines = part.split(/\r?\n/).slice(1);
      return collectStatuses(lines, 0, statuses);
    },
    new Map(),
  );
};
