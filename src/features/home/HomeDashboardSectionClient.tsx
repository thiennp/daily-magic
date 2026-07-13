"use client";

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
      <section className="rounded-3xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-white/[0.03]">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Checking your computer connection…
        </p>
      </section>
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
