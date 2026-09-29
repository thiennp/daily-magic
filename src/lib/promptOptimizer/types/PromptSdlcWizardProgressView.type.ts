import type {
  PromptSdlcWizardGatePhase,
  PromptSdlcWizardPhase,
} from "@/lib/promptOptimizer/wizard/types/PromptSdlcWizardPhase.constant";

export default interface PromptSdlcWizardProgressView {
  readonly phase: PromptSdlcWizardPhase;
  readonly gate: PromptSdlcWizardGatePhase | null;
}
