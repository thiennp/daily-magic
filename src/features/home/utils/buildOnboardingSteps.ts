import { buildNavConsolidationNewTaskHref } from "@/lib/shell/buildNavConsolidationNewTaskHref";
import { PROJECTS_LIBRARY_INTENT_HREF } from "@/lib/shell/projectTabIntentHrefs.constant";

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
    label: "Connect your computer",
    done: input.hasPairedDevice,
    href: "/#your-setup",
  },
  {
    id: "task",
    label: "Send your first task",
    done: input.hasSentTask,
    href: buildNavConsolidationNewTaskHref(),
  },
  {
    id: "workflow",
    label: "Save a playbook (optional)",
    done: input.hasCreatedWorkflowOrAgent,
    href: PROJECTS_LIBRARY_INTENT_HREF,
    optional: true,
  },
  {
    id: "automate",
    label: "Schedule a workflow (optional)",
    done: input.hasScheduledAutomation,
    href: "/automations",
    optional: true,
  },
];
