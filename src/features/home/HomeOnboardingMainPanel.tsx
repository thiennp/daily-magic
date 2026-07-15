"use client";

import AppHero from "@/components/surfaces/AppHero";
import { HOME_ONBOARDING_MAIN_STEP_CONTENT } from "@/features/home/constants/homeOnboardingMainStepContent.constant";
import HomeDashboardHero from "@/features/home/HomeDashboardHero";
import HomeOnboardingSetupCompletePanel from "@/features/home/HomeOnboardingSetupCompletePanel";
import HomeOnboardingMainStep from "@/features/home/HomeOnboardingMainStep";
import HomeOnboardingTemplateStep from "@/features/home/HomeOnboardingTemplateStep";
import useOnboardingSteps from "@/features/home/hooks/useOnboardingSteps";
import findNextIncompleteOnboardingStep from "@/features/home/utils/findNextIncompleteOnboardingStep";
import shouldShowOnboardingSetupCompletePanel from "@/features/home/utils/shouldShowOnboardingSetupCompletePanel";
import isTaskOnboardingStep from "@/features/home/utils/isTaskOnboardingStep";
import isWorkflowOnboardingStep from "@/features/home/utils/isWorkflowOnboardingStep";
import type { GlobalRoleValue } from "@/lib/auth/roles";

interface HomeOnboardingMainPanelProps {
  readonly user: {
    readonly email: string;
    readonly name: string | null;
    readonly globalRole: GlobalRoleValue;
  };
}

const isMacConnectStep = (stepId: string): boolean =>
  stepId === "pair" || stepId === "connect-mac";

export default function HomeOnboardingMainPanel({
  user,
}: HomeOnboardingMainPanelProps) {
  const {
    steps,
    isLoading,
    reloadSteps,
    markWorkflowStepDone,
    isSetupAcknowledged,
    isLoadingSetupAcknowledged,
    acknowledgeSetup,
  } = useOnboardingSteps();
  const nextStep = findNextIncompleteOnboardingStep(steps);

  const handleWorkflowSaved = (): void => {
    markWorkflowStepDone();
    void reloadSteps();
  };

  if (isLoading || isLoadingSetupAcknowledged) {
    return (
      <AppHero variant="plain">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading your setup progress…
        </p>
      </AppHero>
    );
  }

  if (shouldShowOnboardingSetupCompletePanel(steps, isSetupAcknowledged)) {
    return <HomeOnboardingSetupCompletePanel onDismiss={acknowledgeSetup} />;
  }

  if (
    nextStep === null ||
    isMacConnectStep(nextStep.id) ||
    (!(nextStep.id in HOME_ONBOARDING_MAIN_STEP_CONTENT) &&
      !isWorkflowOnboardingStep(nextStep.id))
  ) {
    return <HomeDashboardHero user={user} />;
  }

  if (isWorkflowOnboardingStep(nextStep.id)) {
    return <HomeOnboardingTemplateStep onSaved={handleWorkflowSaved} />;
  }

  return (
    <HomeOnboardingMainStep
      step={nextStep}
      content={HOME_ONBOARDING_MAIN_STEP_CONTENT[nextStep.id]}
      priorStep={
        isTaskOnboardingStep(nextStep.id)
          ? steps.find((step) => isWorkflowOnboardingStep(step.id))
          : undefined
      }
    />
  );
}
