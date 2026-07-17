import { AGENT_RUN_PROGRESS_MARKER } from "@/lib/dispatch/agentRunProgress.constant";

export interface AgentLiveProgressUpdate {
  readonly title: string;
  readonly detail: string;
}

/** How many non-empty detail lines belong to one [[PROGRESS]] block. */
export const AGENT_LIVE_PROGRESS_MAX_DETAIL_LINES = 3;

export interface ParsedAgentLiveProgressBlock {
  readonly update: AgentLiveProgressUpdate;
  /** Bytes after the marker consumed by title + detail lines. */
  readonly consumedLength: number;
}

const lineBreakLength = (index: number, lineCount: number): number =>
  index < lineCount - 1 ? 1 : 0;

const accumulateProgressBlock = (
  lines: readonly string[],
  index: number,
  offset: number,
  title: string | null,
  detailLines: readonly string[],
): ParsedAgentLiveProgressBlock | null => {
  if (index >= lines.length) {
    if (title === null) {
      return null;
    }
    return {
      update: { title, detail: detailLines.join("\n") },
      consumedLength: offset,
    };
  }

  const line = lines[index] ?? "";
  const nextOffset =
    offset + line.length + lineBreakLength(index, lines.length);
  const trimmed = line.trim();

  if (title === null) {
    if (trimmed.length === 0) {
      return accumulateProgressBlock(
        lines,
        index + 1,
        nextOffset,
        null,
        detailLines,
      );
    }
    return accumulateProgressBlock(
      lines,
      index + 1,
      nextOffset,
      trimmed,
      detailLines,
    );
  }

  if (trimmed.length === 0) {
    return {
      update: { title, detail: detailLines.join("\n") },
      consumedLength: offset,
    };
  }

  const nextDetails = [...detailLines, trimmed];
  if (nextDetails.length >= AGENT_LIVE_PROGRESS_MAX_DETAIL_LINES) {
    return {
      update: { title, detail: nextDetails.join("\n") },
      consumedLength: nextOffset,
    };
  }

  return accumulateProgressBlock(
    lines,
    index + 1,
    nextOffset,
    title,
    nextDetails,
  );
};

export const parseNextAgentLiveProgressBlock = (
  textAfterMarker: string,
): ParsedAgentLiveProgressBlock | null =>
  accumulateProgressBlock(textAfterMarker.split(/\r?\n/), 0, 0, null, []);

const collectProgressUpdates = (
  remaining: string,
  updates: readonly AgentLiveProgressUpdate[],
): readonly AgentLiveProgressUpdate[] => {
  const markerIndex = remaining.indexOf(AGENT_RUN_PROGRESS_MARKER);
  if (markerIndex < 0) {
    return updates;
  }

  const afterMarker = markerIndex + AGENT_RUN_PROGRESS_MARKER.length;
  const parsed = parseNextAgentLiveProgressBlock(remaining.slice(afterMarker));
  if (parsed === null) {
    return updates;
  }

  return collectProgressUpdates(
    remaining.slice(afterMarker + parsed.consumedLength),
    [...updates, parsed.update],
  );
};

export const parseAgentLiveProgressUpdates = (
  output: string,
): readonly AgentLiveProgressUpdate[] => collectProgressUpdates(output, []);
