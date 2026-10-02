"use client";

import useOnboardingSetupAcknowledged from "@/features/home/hooks/useOnboardingSetupAcknowledged";
import useOnboardingSteps from "@/features/home/hooks/useOnboardingSteps";
import shouldShowHomeLeftRail from "@/features/home/utils/shouldShowHomeLeftRail";

const useHomeLeftRailVisible = (): boolean => {
  const { steps } = useOnboardingSteps();
  const { isSetupAcknowledged } = useOnboardingSetupAcknowledged();

  return shouldShowHomeLeftRail(steps, isSetupAcknowledged);
};

export default useHomeLeftRailVisible;
