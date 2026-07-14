"use client";

import { useCallback, type ReactNode } from "react";

import AppHero from "@/components/surfaces/AppHero";
import HomeConnectComputerGuide from "@/features/home/HomeConnectComputerGuide";
import HomeConnectedMacsPanel from "@/features/home/HomeConnectedMacsPanel";
import {
  HOME_DASHBOARD_GRID_CLASS,
  HOME_LEFT_RAIL_CLASS,
  HOME_MAIN_COLUMN_CLASS,
} from "@/features/home/homeDashboardLayout.constant";
import useHomeConnectedMacs from "@/features/home/hooks/useHomeConnectedMacs";
import {
  PairedDeviceProvider,
  usePairedDeviceContext,
} from "@/features/home/PairedDeviceContext";
import { useLinkLocalAgentAccount } from "@/features/home/hooks/useLinkLocalAgentAccount";
import { resolveHomeDashboardMode } from "@/features/home/utils/resolveHomeDashboardMode";

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
  const { markPaired } = usePairedDeviceContext();
  const { devices, isLoading } = useHomeConnectedMacs();
  const dashboardMode = resolveHomeDashboardMode({
    isLoading,
    deviceCount: devices.length,
  });
  const handleLinked = useCallback(() => {
    markPaired();
  }, [markPaired]);
  useLinkLocalAgentAccount({
    appOrigin,
    autoLink: dashboardMode === "dashboard",
    silentFailures: true,
    onLinked: handleLinked,
  });

  if (dashboardMode === "loading") {
    return (
      <div className={HOME_DASHBOARD_GRID_CLASS}>
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

  if (dashboardMode === "connect") {
    return (
      <div className={HOME_DASHBOARD_GRID_CLASS}>
        <aside className={HOME_LEFT_RAIL_CLASS}>
          <HomeConnectedMacsPanel
            installCommand={installCommand}
            isWebSocketSupported={isWebSocketSupported}
            host={host}
          />
        </aside>
        <main className={HOME_MAIN_COLUMN_CLASS}>
          <HomeConnectComputerGuide
            appOrigin={appOrigin}
            installCommand={installCommand}
            isWebSocketSupported={isWebSocketSupported}
            host={host}
            onLinked={handleLinked}
          />
        </main>
      </div>
    );
  }

  return children;
}
