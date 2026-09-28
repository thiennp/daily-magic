import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { PromptSdlcCycleStatus } from "@/lib/promptSdlc/PromptSdlcCycleStatus.constant";

export interface PromptSdlcLocalJudgement {
  readonly score: number | null;
  readonly passed: boolean | null;
  readonly reasons: string | null;
  readonly rawReply: string;
}

export interface PromptSdlcLocalRevision {
  readonly roundNumber: number;
  readonly promptText: string;
  readonly judgement: PromptSdlcLocalJudgement | null;
}

export interface PromptSdlcLocalCycle {
  readonly id: string;
  readonly goal: string;
  readonly judgeModel: HarnessWriterAgent;
  readonly improverModel: HarnessWriterAgent;
  readonly workingDirectory?: string;
  readonly status: PromptSdlcCycleStatus;
  readonly currentRound: number;
  readonly passScore: number;
  readonly maxRounds: number;
  readonly errorMessage: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly revisions: readonly PromptSdlcLocalRevision[];
}
