"use client";

import AppHero from "@/components/surfaces/AppHero";
import HomeConnectComputerGuide from "@/features/home/HomeConnectComputerGuide";
import HomeDashboardHero from "@/features/home/HomeDashboardHero";
import { useHasPairedDevice } from "@/features/home/hooks/useHasPairedDevice";
import type { GlobalRoleValue } from "@/lib/auth/roles";

interface HomeDashboardSectionClientProps {
  readonly user: {
    readonly email: string;
    readonly name: string | null;
    readonly globalRole: GlobalRoleValue;
  };
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
}

export default function HomeDashboardSectionClient({
  user,
  installCommand,
  isWebSocketSupported,
  host,
}: HomeDashboardSectionClientProps) {
  const { hasPairedDevice, isLoading } = useHasPairedDevice();

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
    return <HomeDashboardHero user={user} />;
  }

  return (
    <HomeConnectComputerGuide
      installCommand={installCommand}
      isWebSocketSupported={isWebSocketSupported}
      host={host}
    />
  );
}
