import { useEffect, type Dispatch, type SetStateAction } from "react";

import { pairedDevicesResource } from "@/features/agent-witch/pairedDevicesResource";
import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";

const useOnboardingPairStepSync = (input: {
  readonly demoPreview: unknown;
  readonly isConnectStepDone: boolean;
  readonly setSteps: Dispatch<SetStateAction<readonly OnboardingStep[]>>;
}): void => {
  useEffect(() => {
    if (input.demoPreview || input.isConnectStepDone) {
      return;
    }

    return pairedDevicesResource.subscribe(() => {
      const snapshot = pairedDevicesResource.getSnapshot();
      if (snapshot === null) {
        return;
      }

      const paired = snapshot.devices.length > 0;
      input.setSteps((current) =>
        current.map((step) =>
          step.id === "pair" ? { ...step, done: paired } : step,
        ),
      );
    });
  }, [input.demoPreview, input.isConnectStepDone, input.setSteps]);
};

export default useOnboardingPairStepSync;
