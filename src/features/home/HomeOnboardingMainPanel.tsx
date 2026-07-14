"use client";

import AppHero from "@/components/surfaces/AppHero";
import { HOME_ONBOARDING_MAIN_STEP_CONTENT } from "@/features/home/constants/homeOnboardingMainStepContent.constant";
import HomeDashboardHero from "@/features/home/HomeDashboardHero";
import HomeOnboardingMainStep from "@/features/home/HomeOnboardingMainStep";
import HomeOnboardingTemplateStep from "@/features/home/HomeOnboardingTemplateStep";
import useOnboardingSteps from "@/features/home/hooks/useOnboardingSteps";
import findNextIncompleteOnboardingStep from "@/features/home/utils/findNextIncompleteOnboardingStep";
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

const isWorkflowStep = (stepId: string): boolean =>
  stepId === "workflow" || stepId === "create-workflow";

export default function HomeOnboardingMainPanel({
  user,
}: HomeOnboardingMainPanelProps) {
  const { steps, isLoading, reloadSteps } = useOnboardingSteps();
  const nextStep = findNextIncompleteOnboardingStep(steps);

  if (isLoading) {
    return (
      <AppHero variant="plain">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading your setup progress…
        </p>
      </AppHero>
    );
  }

  if (
    nextStep === null ||
    isMacConnectStep(nextStep.id) ||
    (!(nextStep.id in HOME_ONBOARDING_MAIN_STEP_CONTENT) &&
      !isWorkflowStep(nextStep.id))
  ) {
    return <HomeDashboardHero user={user} />;
  }

  if (isWorkflowStep(nextStep.id)) {
    return <HomeOnboardingTemplateStep onSaved={reloadSteps} />;
  }

  return (
    <HomeOnboardingMainStep
      step={nextStep}
      content={HOME_ONBOARDING_MAIN_STEP_CONTENT[nextStep.id]}
    />
  );
}
