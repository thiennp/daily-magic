import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";

export type OnboardingStep = {
  readonly id: string;
  readonly label: string;
  readonly done: boolean;
  readonly href: string;
  readonly optional?: boolean;
};

interface BuildOnboardingStepsInput {
  readonly hasPairedDevice: boolean;
  readonly hasCreatedWorkflowOrAgent: boolean;
  readonly hasSentTask: boolean;
  readonly hasScheduledAutomation: boolean;
}

export const buildOnboardingSteps = (
  input: BuildOnboardingStepsInput,
): readonly OnboardingStep[] => [
  {
    id: "pair",
    label: MAC_WORKER_BENEFIT_COPY.onboardingChecklistLabel,
    done: input.hasPairedDevice,
    href: "/#your-setup",
  },
  {
    id: "workflow",
    label: "Create your first workflow or agent",
    done: input.hasCreatedWorkflowOrAgent,
    href: "/library",
  },
  {
    id: "task",
    label: "Send your first task",
    done: input.hasSentTask,
    href: buildAgentComposerHref(),
  },
  {
    id: "automate",
    label: "Schedule a workflow (optional)",
    done: input.hasScheduledAutomation,
    href: "/automations",
    optional: true,
  },
];
