import type { PromptSdlcCycleStatus } from "@/lib/promptOptimizer/PromptSdlcCycleStatus.constant";

export default interface PromptSdlcCycleSummary {
  readonly id: string;
  readonly goal: string;
  readonly status: PromptSdlcCycleStatus;
  readonly currentRound: number;
  readonly createdAt: string;
}
