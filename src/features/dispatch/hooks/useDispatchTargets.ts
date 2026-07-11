"use client";

import { useEffect, useState } from "react";

import { POLL_INTERVAL_MS } from "@/features/reports/agentRunsPolling.constant";

export interface DispatchTargetMember {
  readonly userId: string;
  readonly email: string;
  readonly name: string | null;
  readonly isPaired: boolean;
  readonly isOnline: boolean;
}

export interface DispatchTargetGroup {
  readonly groupId: string;
  readonly groupName: string;
  readonly dispatchPolicy: string;
  readonly members: readonly DispatchTargetMember[];
}

export function useDispatchTargets(): {
  readonly groups: readonly DispatchTargetGroup[];
  readonly isLoading: boolean;
} {
  const [groups, setGroups] = useState<readonly DispatchTargetGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTargets = async (): Promise<void> => {
      try {
        const response = await fetch("/api/dispatch/targets");
        if (!response.ok) {
          return;
        }

        const data: unknown = await response.json();
        if (
          typeof data === "object" &&
          data !== null &&
          "groups" in data &&
          Array.isArray((data as { groups: unknown }).groups)
        ) {
          setGroups((data as { groups: DispatchTargetGroup[] }).groups);
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadTargets();
    const timer = setInterval(() => {
      void loadTargets();
    }, POLL_INTERVAL_MS);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return { groups, isLoading };
}
