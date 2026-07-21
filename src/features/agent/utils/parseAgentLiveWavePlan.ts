import type { AgentLiveWavePlanItem } from "@/features/agent/utils/agentLiveWavePlan.type";
import { AGENT_RUN_WAVE_PLAN_MARKER } from "@/lib/dispatch/agentRunWavePlan.constant";

const PLAN_LINE = /^(W|A)\|([^|\n]+)\|([^|\n]+)\|(\d+)\s*$/i;

const parsePlanLine = (
  line: string,
  parentWaveId: string | null,
): {
  readonly item: AgentLiveWavePlanItem;
  readonly nextParentWaveId: string | null;
} | null => {
  const match = PLAN_LINE.exec(line.trim());
  if (match === null) {
    return null;
  }

  const kind = match[1]?.toUpperCase() === "W" ? "wave" : "agent";
  const id = (match[2] ?? "").trim();
  const title = (match[3] ?? "").trim();
  const estimateSeconds = Number.parseInt(match[4] ?? "", 10);
  if (
    id.length === 0 ||
    title.length === 0 ||
    !Number.isFinite(estimateSeconds)
  ) {
    return null;
  }
  if (estimateSeconds <= 0) {
    return null;
  }

  if (kind === "wave") {
    return {
      item: {
        kind,
        id,
        title,
        estimateSeconds,
        parentWaveId: null,
      },
      nextParentWaveId: id,
    };
  }

  return {
    item: {
      kind,
      id,
      title,
      estimateSeconds,
      parentWaveId,
    },
    nextParentWaveId: parentWaveId,
  };
};

const collectPlanItems = (
  lines: readonly string[],
  index: number,
  parentWaveId: string | null,
  items: readonly AgentLiveWavePlanItem[],
): readonly AgentLiveWavePlanItem[] => {
  if (index >= lines.length) {
    return items;
  }

  const line = lines[index] ?? "";
  if (line.trim().startsWith("[[") && line.includes("]]")) {
    return items;
  }

  const parsed = parsePlanLine(line, parentWaveId);
  if (parsed === null) {
    return collectPlanItems(lines, index + 1, parentWaveId, items);
  }

  return collectPlanItems(lines, index + 1, parsed.nextParentWaveId, [
    ...items,
    parsed.item,
  ]);
};

/** Latest [[WAVE_PLAN]] block in agent output. */
export const parseAgentLiveWavePlan = (
  output: string,
): readonly AgentLiveWavePlanItem[] => {
  const markerIndex = output.lastIndexOf(AGENT_RUN_WAVE_PLAN_MARKER);
  if (markerIndex < 0) {
    return [];
  }

  const afterMarker = output.slice(
    markerIndex + AGENT_RUN_WAVE_PLAN_MARKER.length,
  );
  const lines = afterMarker.split(/\r?\n/).slice(1);
  return collectPlanItems(lines, 0, null, []);
};
