import type { PromptSdlcCycleStatus } from "@/lib/promptOptimizer/PromptSdlcCycleStatus.constant";
import type { PromptSdlcCallRole } from "@/lib/promptOptimizer/types/PromptSdlcModelChoice.type";

export default interface PromptSdlcCycleRecord {
  readonly id: string;
  readonly ownerUserId: string;
  readonly deviceId: string | null;
  readonly goal: string;
  readonly sourcePrompt: string;
  readonly judgeKind: "writer" | "ollama";
  readonly judgeModel: string;
  readonly improverKind: "writer" | "ollama";
  readonly improverModel: string;
  readonly passScore: number;
  readonly maxRounds: number;
  readonly status: PromptSdlcCycleStatus;
  readonly activeRunId: string | null;
  readonly pendingLocalPrompt: string | null;
  readonly pendingLocalRole: PromptSdlcCallRole | null;
  readonly currentRound: number;
  readonly errorMessage: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}
