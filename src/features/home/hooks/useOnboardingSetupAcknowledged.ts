"use client";

import useOnboardingSteps from "@/features/home/hooks/useOnboardingSteps";

const useOnboardingSetupAcknowledged = (): {
  readonly isSetupAcknowledged: boolean;
  readonly isLoading: boolean;
  readonly acknowledgeSetup: () => void;
} => {
  const { isSetupAcknowledged, isLoadingSetupAcknowledged, acknowledgeSetup } =
    useOnboardingSteps();

  return {
    isSetupAcknowledged,
    isLoading: isLoadingSetupAcknowledged,
    acknowledgeSetup,
  };
};

export default useOnboardingSetupAcknowledged;
