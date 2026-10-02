"use client";

import { useCallback, type ReactNode } from "react";

import AppHero from "@/components/surfaces/AppHero";
import HomeConnectComputerGuide from "@/features/home/HomeConnectComputerGuide";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";
import { HOME_MAIN_COLUMN_WITHOUT_LEFT_RAIL_CLASS } from "@/features/home/homeDashboardLayout.constant";
import { HomeLeftRailVisibilityProvider } from "@/features/home/HomeLeftRailVisibility";
import useHomeLeftRailVisible from "@/features/home/hooks/useHomeLeftRailVisible";
import useHomeConnectedMacs from "@/features/home/hooks/useHomeConnectedMacs";
import useCursorCloudConnection from "@/features/home/hooks/useCursorCloudConnection";
import {
  PairedDeviceProvider,
  usePairedDeviceContext,
} from "@/features/home/PairedDeviceContext";
import { OnboardingStepsProvider } from "@/features/home/hooks/useOnboardingSteps";
import { resolveHomeDashboardMode } from "@/features/home/utils/resolveHomeDashboardMode";

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

function HomeLinkAccountGateContent({
  appOrigin,
  installCommand,
  isWebSocketSupported,
  host,
  children,
  below,
}: HomeLinkAccountGateProps) {
  const { markPaired } = usePairedDeviceContext();
  const { devices, isLoading } = useHomeConnectedMacs();
  const { summary: cursorCloudSummary, isLoading: isCursorCloudLoading } =
    useCursorCloudConnection();
  const dashboardMode = resolveHomeDashboardMode({
    isLoading: isLoading || isCursorCloudLoading,
    deviceCount: devices.length,
    hasCursorCloudConnection: cursorCloudSummary.connected,
  });
  const handleLinked = useCallback(() => {
    markPaired();
  }, [markPaired]);
  const onboardingLeftRailVisible = useHomeLeftRailVisible();
  const showLeftRail =
    dashboardMode === "dashboard" && onboardingLeftRailVisible;
  const board =
    dashboardMode === "loading" ? (
      <main className={HOME_MAIN_COLUMN_WITHOUT_LEFT_RAIL_CLASS}>
        <AppHero variant="plain">
          <p className="text-sm text-gray-500 dark:text-gray-400">
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
    <HomeLeftRailVisibilityProvider showLeftRail={showLeftRail}>
      {board}
      {below}
    </HomeLeftRailVisibilityProvider>
  );
}
