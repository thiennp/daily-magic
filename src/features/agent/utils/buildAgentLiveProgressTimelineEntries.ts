import type { AgentLiveProgressUpdate } from "@/features/agent/utils/parseAgentLiveProgressUpdates";
import { parseAgentLiveProgressCheckpointExchanges } from "@/features/agent/utils/parseAgentLiveProgressCheckpointExchanges";

export interface AgentLiveProgressTimelineEntry {
  readonly offset: number;
  readonly kind: "progress" | "checkpoint-question" | "checkpoint-answer";
  readonly progressIndex?: number;
  readonly question?: string;
  readonly answer?: string;
}

export const buildAgentLiveProgressTimelineEntries = (
  source: string,
  updates: readonly AgentLiveProgressUpdate[],
): readonly AgentLiveProgressTimelineEntry[] => {
  const progressEntries = updates.reduce<{
    readonly entries: readonly AgentLiveProgressTimelineEntry[];
    readonly searchFrom: number;
  }>(
    (accumulator, update, index) => {
      const titleIndex = source.indexOf(update.title, accumulator.searchFrom);
      if (titleIndex < 0) {
        return accumulator;
      }

      return {
        entries: [
          ...accumulator.entries,
          {
            offset: titleIndex,
            kind: "progress",
            progressIndex: index,
          },
        ],
        searchFrom: titleIndex + update.title.length,
      };
    },
    { entries: [], searchFrom: 0 },
  ).entries;

  const checkpointEntries = parseAgentLiveProgressCheckpointExchanges(
    source,
  ).flatMap((exchange) => [
    {
      offset: exchange.offset,
      kind: "checkpoint-question" as const,
      question: exchange.question,
    },
    {
      offset: exchange.offset + 1,
      kind: "checkpoint-answer" as const,
      answer: exchange.answer,
      question: exchange.question,
    },
  ]);

  return [...progressEntries, ...checkpointEntries].sort(
    (left, right) => left.offset - right.offset,
  );
};
