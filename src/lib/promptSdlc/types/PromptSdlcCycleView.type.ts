import type { PromptSdlcCycleStatus } from "@/lib/promptSdlc/PromptSdlcCycleStatus.constant";
import type { PromptSdlcCallRole } from "@/lib/promptSdlc/types/PromptSdlcModelChoice.type";

export interface PromptSdlcJudgementView {
  readonly score: number | null;
  readonly passed: boolean | null;
  readonly reasons: string | null;
  readonly rawReply: string;
  readonly judgeModel: string;
}

export interface PromptSdlcRevisionView {
  readonly id: string;
  readonly roundNumber: number;
  readonly promptText: string;
  readonly judgement: PromptSdlcJudgementView | null;
}

export interface PromptSdlcPendingLocalCall {
  readonly role: PromptSdlcCallRole;
  readonly prompt: string;
}

export default interface PromptSdlcCycleView {
  readonly id: string;
  readonly goal: string;
  readonly judgeModel: string;
  readonly improverModel: string;
  readonly status: PromptSdlcCycleStatus;
  readonly currentRound: number;
  readonly maxRounds: number;
  readonly passScore: number;
  readonly errorMessage: string | null;
  readonly activeRunId: string | null;
  readonly activeRunStatus: string | null;
  readonly pendingLocal: PromptSdlcPendingLocalCall | null;
  readonly revisions: readonly PromptSdlcRevisionView[];
}
