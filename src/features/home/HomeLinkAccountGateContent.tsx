"use client";

import { useCallback, type ReactNode } from "react";

import AppHero from "@/components/surfaces/AppHero";
import HomeConnectComputerGuide from "@/features/home/HomeConnectComputerGuide";
import { HOME_MAIN_COLUMN_WITHOUT_LEFT_RAIL_CLASS } from "@/features/home/homeDashboardLayout.constant";
import { HomeLeftRailVisibilityProvider } from "@/features/home/HomeLeftRailVisibility";
import {
  useCursorCloudConnection,
  useHomeConnectedMacs,
} from "@/features/home/hooks/public-api/presentation";
import { usePairedDeviceContext } from "@/features/home/PairedDeviceContext";
import {
  countLinkedAgentWitchComputers,
  resolveHomeDashboardMode,
} from "@/features/home/utils/public-api/presentation";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";

export interface HomeLinkAccountGateContentProps {
  readonly appOrigin: string;
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
  readonly children: ReactNode;
  readonly below?: ReactNode;
}

export default function HomeLinkAccountGateContent({
  appOrigin,
  installCommand,
  isWebSocketSupported,
  host,
  children,
  below,
}: HomeLinkAccountGateContentProps) {
  const { markPaired } = usePairedDeviceContext();
  const { devices, isLoading } = useHomeConnectedMacs();
  const { summary: cursorCloudSummary, isLoading: isCursorCloudLoading } =
    useCursorCloudConnection();
  const dashboardMode = resolveHomeDashboardMode({
    isLoading: isLoading || isCursorCloudLoading,
    deviceCount: countLinkedAgentWitchComputers(devices),
    hasCursorCloudConnection: cursorCloudSummary.connected,
  });
  const handleLinked = useCallback(() => {
    markPaired();
  }, [markPaired]);

  const board =
    dashboardMode === "loading" ? (
      <main className={HOME_MAIN_COLUMN_WITHOUT_LEFT_RAIL_CLASS}>
        <AppHero variant="plain">
          <p className="text-sm text-awc-fg-muted dark:text-gray-400">
            {MAC_WORKER_BENEFIT_COPY.checkingMacReady}
          </p>
        </AppHero>
      </main>
    ) : dashboardMode === "connect" ? (
      <main className={HOME_MAIN_COLUMN_WITHOUT_LEFT_RAIL_CLASS}>
        <HomeConnectComputerGuide
          appOrigin={appOrigin}
          installCommand={installCommand}
          isWebSocketSupported={isWebSocketSupported}
          host={host}
          onLinked={handleLinked}
        />
      </main>
    ) : (
      children
    );

  return (
    <HomeLeftRailVisibilityProvider showLeftRail={false}>
      {board}
      {below}
    </HomeLeftRailVisibilityProvider>
  );
}
