"use client";

import { useEffect, useState } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import { POLL_INTERVAL_MS } from "@/features/reports/agentRunsPolling.constant";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export interface DispatchTargetCapability {
  readonly id: string;
  readonly ownerUserId: string;
  readonly type: string;
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly visibility: string;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
}

export interface DispatchTargetMember {
  readonly userId: string;
  readonly email: string;
  readonly name: string | null;
  readonly isPaired: boolean;
  readonly isOnline: boolean;
  readonly capabilities: readonly DispatchTargetCapability[];
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
  const demoPreview = useDemoPreview();
  const [groups, setGroups] = useState<readonly DispatchTargetGroup[]>(
    () => demoPreview?.dispatchGroups ?? [],
  );
  const [isLoading, setIsLoading] = useState(() => !demoPreview);

  useEffect(() => {
    if (demoPreview) {
      return;
    }

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
  }, [demoPreview]);

  return { groups, isLoading };
}
