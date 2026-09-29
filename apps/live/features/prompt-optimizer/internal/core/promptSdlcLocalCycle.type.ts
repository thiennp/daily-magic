import type {
  HarnessWriterAgent,
  PromptSdlcCycleStatus,
  PromptSdlcWizardState,
} from "../../../../adapters/promptSdlcAwcCore";

export interface PromptSdlcLocalRun {
  readonly output: string;
  readonly tokens: number | null;
  readonly delayMs: number;
  /** Where the score looked: git changes, named files, or the writer reply. */
  readonly lookedAt?: string;
  /** File and git changes captured after the run. */
  readonly evidence?: string;
  /** Suggestion from the token review, forwarded to the improver. */
  readonly tokenReview?: string;
}

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
  /** Output of running this prompt, plus the tokens and delay of that run. */
  readonly run?: PromptSdlcLocalRun;
}

export interface PromptSdlcLocalCycle {
  readonly id: string;
  readonly goal: string;
  readonly judgeModel: HarnessWriterAgent | "manual";
  readonly improverModel: HarnessWriterAgent | "manual";
  readonly runnerModel?: HarnessWriterAgent | "manual";
  readonly workingDirectory?: string;
  readonly status: PromptSdlcCycleStatus;
  readonly currentRound: number;
  readonly passScore: number;
  readonly maxRounds: number;
  readonly errorMessage: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly revisions: readonly PromptSdlcLocalRevision[];
  readonly sourceSkill?: {
    readonly fileName: string;
    readonly name: string;
    readonly description: string;
  };
  readonly judgeInstructions?: string;
  readonly improverInstructions?: string;
  /** Set while a judging round is running the prompt or scoring its output. */
  readonly judgePhase?: "running" | "scoring" | "reviewing";
  readonly wizard?: PromptSdlcWizardState;
  /** When true, the judge scores only; runnerModel executes the prompt. */
  readonly judgeScoresOnly?: boolean;
  /** Wizard step 2: judge scores prompt text only; no folder run. */
  readonly judgePromptTextOnly?: boolean;
}
