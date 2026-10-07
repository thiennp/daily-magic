"use client";

import { useEffect, useState } from "react";

import { fetchHumanInvites } from "@/features/projects/access/humanInvites/humanInviteApi";

/**
 * DF-036 F5: waiting person invites for the main-column chip (the rail's People
 * section owns the full list). 0 while loading, on error or when disabled.
 */
export const useHumanInviteWaitingCount = (projectId: string, enabled: boolean): number => {
  const [loaded, setLoaded] = useState<{ readonly key: string; readonly count: number } | null>(null);
  const key = `${projectId}:${enabled ? "on" : "off"}`;
  useEffect(() => {
    if (!enabled) return;
    const cancelled = { current: false };
    void fetchHumanInvites(projectId)
      .then((result) => {
        if (!cancelled.current) setLoaded({ key, count: result.ok ? result.invites.length : 0 });
      })
      .catch(() => undefined);
    return () => {
      cancelled.current = true;
    };
  }, [enabled, key, projectId]);
  return enabled && loaded?.key === key ? loaded.count : 0;
};
