import { isPromptSdlcCycleStatus } from "@/lib/promptOptimizer/PromptSdlcCycleStatus.constant";
import type PromptSdlcCycleSummary from "@/lib/promptOptimizer/types/PromptSdlcCycleSummary.type";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const readPromptSdlcHistory = (
  body: unknown,
): readonly PromptSdlcCycleSummary[] => {
  if (!isRecord(body) || body.ok !== true || !Array.isArray(body.cycles)) {
    return [];
  }

  return body.cycles.flatMap((cycle) => {
    if (
      !isRecord(cycle) ||
      typeof cycle.id !== "string" ||
      typeof cycle.goal !== "string" ||
      typeof cycle.status !== "string" ||
      !isPromptSdlcCycleStatus(cycle.status)
    ) {
      return [];
    }

    return [
      {
        id: cycle.id,
        goal: cycle.goal,
        status: cycle.status,
        currentRound: Number(cycle.currentRound),
        createdAt: String(cycle.createdAt),
      },
    ];
  });
};
