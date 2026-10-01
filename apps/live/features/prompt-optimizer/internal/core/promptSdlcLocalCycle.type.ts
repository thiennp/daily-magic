import type {
  HarnessWriterAgent,
  PromptSdlcCycleStatus,
  PromptSdlcWizardState,
} from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcCostControls } from "@/lib/promptOptimizer/types/PromptSdlcCostControl.type";
import type { PromptSdlcWriterErrorKind } from "./readPromptSdlcWriterOutput";

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
  /** Writer timeout budget used for this revision's execute (when set). */
  readonly timeoutBudgetMs?: number;
  /** How timeoutBudgetMs was chosen. */
  readonly timeoutSource?: "recommended" | "explicit" | "default";
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
  /** Distinct writer failure kind for agent/billing outcomes. */
  readonly errorKind?: PromptSdlcWriterErrorKind;
  /** Spend / trial ceilings; proposal + confirm before Step 4. */
  readonly costControls?: PromptSdlcCostControls;
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
