"use client";

import type { ReactNode } from "react";

import HomeConnectComputerGuide from "@/features/home/HomeConnectComputerGuide";
import HomeOnboardingChecklist from "@/features/home/HomeOnboardingChecklist";
import { useHasPairedDevice } from "@/features/home/hooks/useHasPairedDevice";
import { useLinkLocalAgentAccount } from "@/features/home/hooks/useLinkLocalAgentAccount";

interface HomeLinkAccountGateProps {
  readonly appOrigin: string;
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly children: ReactNode;
}

export default function HomeLinkAccountGate({
  appOrigin,
  installCommand,
  isWebSocketSupported,
  host,
  children,
}: HomeLinkAccountGateProps) {
  const { hasPairedDevice, isLoading, refresh } = useHasPairedDevice();
  const { isLinking, linkError, linkNow } = useLinkLocalAgentAccount({
    appOrigin,
    enabled: !isLoading && !hasPairedDevice,
    onLinked: () => {
      refresh();
    },
  });

  if (isLoading) {
    return (
      <section className="rounded-3xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Checking your computer connection…
        </p>
      </section>
    );
  }

  if (!hasPairedDevice) {
    return (
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 text-left sm:gap-8">
        <HomeOnboardingChecklist />
        <HomeConnectComputerGuide
          installCommand={installCommand}
          isWebSocketSupported={isWebSocketSupported}
          host={host}
          isLinking={isLinking}
          linkError={linkError}
          onLinkNow={() => {
            void linkNow();
          }}
        />
      </div>
    );
  }

  return children;
}
