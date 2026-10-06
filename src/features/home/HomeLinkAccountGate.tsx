"use client";

import type { ReactNode } from "react";

import HomeLinkAccountGateContent from "@/features/home/HomeLinkAccountGateContent";
import { OnboardingStepsProvider } from "@/features/home/hooks/useOnboardingSteps";
import { PairedDeviceProvider } from "@/features/home/PairedDeviceContext";

interface HomeLinkAccountGateProps {
  readonly appOrigin: string;
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly children: ReactNode;
  readonly below?: ReactNode;
}

export default function HomeLinkAccountGate({
  appOrigin,
  installCommand,
  isWebSocketSupported,
  host,
  children,
  below,
}: HomeLinkAccountGateProps) {
  return (
    <PairedDeviceProvider>
      <OnboardingStepsProvider>
        <HomeLinkAccountGateContent
          appOrigin={appOrigin}
          installCommand={installCommand}
          isWebSocketSupported={isWebSocketSupported}
          host={host}
          below={below}
        >
          {children}
        </HomeLinkAccountGateContent>
      </OnboardingStepsProvider>
    </PairedDeviceProvider>
  );
}
