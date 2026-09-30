import type PromptSdlcWizardAttempt from "./PromptSdlcWizardAttempt.type";
import type {
  PromptSdlcWizardGatePhase,
  PromptSdlcWizardPhase,
} from "./PromptSdlcWizardPhase.constant";
import type { PromptSdlcWizardSplitOption } from "./PromptSdlcWizardSplitOption.type";
import type PromptSdlcWizardModuleStatistics from "./PromptSdlcWizardModuleStatistics.type";
import type PromptSdlcWizardVariable from "./PromptSdlcWizardVariable.type";

export interface PromptSdlcWizardModuleRun {
  readonly moduleId: string;
  readonly title: string;
  readonly prompt: string;
  readonly status:
    "pending" | "running" | "paused" | "passed" | "stopped" | "failed";
  readonly selectedRevisionRound: number | null;
  /** Scored rounds for this module (step 4 evaluation). */
  readonly statistics?: PromptSdlcWizardModuleStatistics | null;
}

export default interface PromptSdlcWizardState {
  readonly schemaVersion: number;
  readonly phase: PromptSdlcWizardPhase;
  /** When set, the UI shows Continue / feedback gate for this step. */
  readonly gate: PromptSdlcWizardGatePhase | null;
  readonly variables: readonly PromptSdlcWizardVariable[];
  readonly templatedPrompt: string;
  readonly attempts: readonly PromptSdlcWizardAttempt[];
  readonly avoidByStep: Readonly<
    Record<PromptSdlcWizardGatePhase, readonly string[]>
  >;
  readonly evaluateSelectedRound: number | null;
  readonly splitOptions: readonly PromptSdlcWizardSplitOption[];
  readonly selectedSplitOptionId: string | null;
  /** From the chosen split option; drives chain handoff between modules. */
  readonly selectedSplitTopology: "chain" | "parallel" | null;
  readonly modules: readonly PromptSdlcWizardModuleRun[];
  readonly currentModuleIndex: number;
  readonly runnerInstructions: string;
  /** Consumed on the next generalize/separate writer call (feedback rerun form). */
  readonly pendingStepInstructions: string;
  /** User-edited values for `{{placeholders}}` during Step 4 module runs. */
  readonly parameterValues: Readonly<Record<string, string>>;
  /** Minimum judge score for a module trial to pass in Step 4. */
  readonly modulePassScore?: number;
}
