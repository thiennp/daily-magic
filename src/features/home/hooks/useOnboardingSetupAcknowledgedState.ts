import { useCallback, useEffect, useState } from "react";

import {
  fetchOnboardingSetupAcknowledged,
  hasUserAcknowledgedOnboardingSetup,
  markOnboardingSetupAcknowledged,
  syncOnboardingSetupAcknowledgedFlag,
} from "@/features/home/utils/public-api/presentation";

const useOnboardingSetupAcknowledgedState = (): {
  readonly isSetupAcknowledged: boolean;
  readonly isLoadingSetupAcknowledged: boolean;
  readonly acknowledgeSetup: () => void;
} => {
  const [dbSetupAcknowledged, setDbSetupAcknowledged] = useState(false);
  const [isLoadingSetupAcknowledged, setIsLoadingSetupAcknowledged] =
    useState(true);

  useEffect(() => {
    const lifecycle = { cancelled: false };

    void fetchOnboardingSetupAcknowledged().then((dbFlag) => {
      if (lifecycle.cancelled) {
        return;
      }

      syncOnboardingSetupAcknowledgedFlag(dbFlag);
      setDbSetupAcknowledged(dbFlag);
      setIsLoadingSetupAcknowledged(false);
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
    isLoadingSetupAcknowledged,
    acknowledgeSetup,
  };
};

export default useOnboardingSetupAcknowledgedState;
