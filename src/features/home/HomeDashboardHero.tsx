"use client";

import HomeNotLinkedConnectBlock from "@/features/home/HomeNotLinkedConnectBlock";
import HomeRunningJobsPanel from "@/features/home/HomeRunningJobsPanel";
import type { GlobalRoleValue } from "@/lib/auth/roles";

interface HomeDashboardHeroProps {
  readonly user: {
    readonly email: string;
    readonly name: string | null;
    readonly globalRole: GlobalRoleValue;
  };
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
}

/**
 * Post-greeting Home lead (title stays in HomePageHead).
 * HN-H2: one sand connect block (not linked / connecting / connected / failed)
 * with a single Pine primary + quiet secondary — no competing Get started /
 * settings slab CTAs beside it.
 */
export default function HomeDashboardHero({
  installCommand,
  isWebSocketSupported,
  host,
}: HomeDashboardHeroProps) {
  return (
    <section aria-label="Home actions" className="space-y-4">
      <HomeNotLinkedConnectBlock
        installCommand={installCommand}
        isWebSocketSupported={isWebSocketSupported}
        host={host}
      />
      <HomeRunningJobsPanel />
    </section>
  );
}
