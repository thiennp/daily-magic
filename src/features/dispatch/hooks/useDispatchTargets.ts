"use client";

import { useEffect, useState } from "react";

export interface DispatchTargetMember {
  readonly userId: string;
  readonly email: string;
  readonly name: string | null;
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
    void (async () => {
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
    })();
  }, []);

  return { groups, isLoading };
}
