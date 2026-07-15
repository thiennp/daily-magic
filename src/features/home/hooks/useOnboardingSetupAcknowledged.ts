import { useCallback, useEffect, useState } from "react";

import { fetchOnboardingSetupAcknowledged } from "@/features/home/utils/onboardingSetupAcknowledgedApi";
import hasUserAcknowledgedOnboardingSetup from "@/features/home/utils/hasUserAcknowledgedOnboardingSetup";
import { markOnboardingSetupAcknowledged } from "@/features/home/utils/onboardingSetupAcknowledgedStore";
import syncOnboardingSetupAcknowledgedFlag from "@/features/home/utils/syncOnboardingSetupAcknowledgedFlag";

const useOnboardingSetupAcknowledged = (): {
  readonly isSetupAcknowledged: boolean;
  readonly isLoading: boolean;
  readonly acknowledgeSetup: () => void;
} => {
  const [dbSetupAcknowledged, setDbSetupAcknowledged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lifecycle = { cancelled: false };

    void fetchOnboardingSetupAcknowledged().then((dbFlag) => {
      if (lifecycle.cancelled) {
        return;
      }

      syncOnboardingSetupAcknowledgedFlag(dbFlag);
      setDbSetupAcknowledged(dbFlag);
      setIsLoading(false);
    });

    return () => {
      lifecycle.cancelled = true;
    };
  }, []);

  const acknowledgeSetup = useCallback((): void => {
    markOnboardingSetupAcknowledged();
    setDbSetupAcknowledged(true);
  }, []);

  return {
    isSetupAcknowledged:
      hasUserAcknowledgedOnboardingSetup(dbSetupAcknowledged),
    isLoading,
    acknowledgeSetup,
  };
};

export default useOnboardingSetupAcknowledged;
