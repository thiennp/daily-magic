import type {
  HarnessWriterAgent,
  PromptSdlcCycleStatus,
} from "../../../../adapters/promptSdlcAwcCore";

export interface PromptSdlcLocalJudgement {
  readonly score: number | null;
  readonly passed: boolean | null;
  readonly reasons: string | null;
  readonly rawReply: string;
  readonly tokens?: number | null;
}

export interface PromptSdlcLocalRevision {
  readonly roundNumber: number;
  readonly promptText: string;
  readonly judgement: PromptSdlcLocalJudgement | null;
  /** Tokens the improver spent to write this prompt. The source prompt has none. */
  readonly writerTokens?: number | null;
}

export interface PromptSdlcLocalCycle {
  readonly id: string;
  readonly goal: string;
  readonly judgeModel: HarnessWriterAgent | "manual";
  readonly improverModel: HarnessWriterAgent | "manual";
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
