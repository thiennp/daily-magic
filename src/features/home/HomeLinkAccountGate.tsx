"use client";

import { useCallback, type ReactNode } from "react";

import HomeConnectComputerGuide from "@/features/home/HomeConnectComputerGuide";
import HomeOnboardingChecklist from "@/features/home/HomeOnboardingChecklist";
import {
  HOME_DASHBOARD_GRID_CLASS,
  HOME_LEFT_RAIL_CLASS,
  HOME_MAIN_COLUMN_CLASS,
} from "@/features/home/homeDashboardLayout.constant";
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
  const handleLinked = useCallback(() => {
    void refresh();
  }, [refresh]);
  const { isLinking, linkError, linkNow } = useLinkLocalAgentAccount({
    appOrigin,
    onLinked: handleLinked,
  });

  if (isLoading) {
    return (
      <div className={HOME_DASHBOARD_GRID_CLASS}>
        <aside className={HOME_LEFT_RAIL_CLASS}>
          <HomeOnboardingChecklist />
        </aside>
        <main className={HOME_MAIN_COLUMN_CLASS}>
          <section className="rounded-3xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Checking your computer connection…
            </p>
          </section>
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
            onLinkNow={() => {
              void linkNow();
            }}
          />
        </main>
      </div>
    );
  }

  return children;
}
