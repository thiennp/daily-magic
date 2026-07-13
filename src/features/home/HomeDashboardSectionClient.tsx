"use client";

import AppHero from "@/components/surfaces/AppHero";
import HomeConnectComputerGuide from "@/features/home/HomeConnectComputerGuide";
import HomeOnboardingMainPanel from "@/features/home/HomeOnboardingMainPanel";
import { useHasPairedDevice } from "@/features/home/hooks/useHasPairedDevice";
import type { GlobalRoleValue } from "@/lib/auth/roles";

interface HomeDashboardSectionClientProps {
  readonly user: {
    readonly email: string;
    readonly name: string | null;
    readonly globalRole: GlobalRoleValue;
  };
  readonly appOrigin: string;
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
}

export default function HomeDashboardSectionClient({
  user,
  appOrigin,
  installCommand,
  isWebSocketSupported,
  host,
}: HomeDashboardSectionClientProps) {
  const { hasPairedDevice, isLoading, markPaired } = useHasPairedDevice();

  if (isLoading) {
    return (
      <AppHero variant="plain">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Checking your computer connection…
        </p>
      </AppHero>
    );
  }

  if (hasPairedDevice) {
    return <HomeOnboardingMainPanel user={user} />;
  }

  return (
    <HomeConnectComputerGuide
      appOrigin={appOrigin}
      installCommand={installCommand}
      isWebSocketSupported={isWebSocketSupported}
      host={host}
      onLinked={() => {
        markPaired();
      }}
    />
  );
}
