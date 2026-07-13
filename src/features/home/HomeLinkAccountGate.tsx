"use client";

import { useCallback, type ReactNode } from "react";

import AppHero from "@/components/surfaces/AppHero";
import HomeConnectComputerGuide from "@/features/home/HomeConnectComputerGuide";
import HomeOnboardingChecklist from "@/features/home/HomeOnboardingChecklist";
import {
  HOME_DASHBOARD_GRID_CLASS,
  HOME_LEFT_RAIL_CLASS,
  HOME_MAIN_COLUMN_CLASS,
} from "@/features/home/homeDashboardLayout.constant";
import {
  PairedDeviceProvider,
  usePairedDeviceContext,
} from "@/features/home/PairedDeviceContext";
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
  return (
    <PairedDeviceProvider>
      <HomeLinkAccountGateContent
        appOrigin={appOrigin}
        installCommand={installCommand}
        isWebSocketSupported={isWebSocketSupported}
        host={host}
      >
        {children}
      </HomeLinkAccountGateContent>
    </PairedDeviceProvider>
  );
}

function HomeLinkAccountGateContent({
  appOrigin,
  installCommand,
  isWebSocketSupported,
  host,
  children,
}: HomeLinkAccountGateProps) {
  const { hasPairedDevice, isLoading, refresh, markPaired } =
    usePairedDeviceContext();
  const handleLinked = useCallback(() => {
    markPaired();
    void refresh();
  }, [markPaired, refresh]);
  const { isLinking, linkError } = useLinkLocalAgentAccount({
    appOrigin,
    autoLink: !isLoading && !hasPairedDevice,
    onLinked: handleLinked,
  });

  if (isLoading) {
    return (
      <div className={HOME_DASHBOARD_GRID_CLASS}>
        <aside className={HOME_LEFT_RAIL_CLASS}>
          <HomeOnboardingChecklist />
        </aside>
        <main className={HOME_MAIN_COLUMN_CLASS}>
          <AppHero variant="plain">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Checking your computer connection…
            </p>
          </AppHero>
        </main>
      </div>
    );
  }

  if (!hasPairedDevice) {
    return (
      <div className={HOME_DASHBOARD_GRID_CLASS}>
        <aside className={HOME_LEFT_RAIL_CLASS}>
          <HomeOnboardingChecklist />
        </aside>
        <main className={HOME_MAIN_COLUMN_CLASS}>
          <HomeConnectComputerGuide
            installCommand={installCommand}
            isWebSocketSupported={isWebSocketSupported}
            host={host}
            isLinking={isLinking}
            linkError={linkError}
          />
        </main>
      </div>
    );
  }

  return children;
}
