"use client";

import { useEffect, useState } from "react";

import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

export function useAutomationsPageData(refreshKey = 0): {
  readonly automations: readonly AgentAutomationRecord[];
  readonly capabilities: readonly PublishedCapabilityRecord[];
  readonly isLoading: boolean;
} {
  const [automations, setAutomations] = useState<
    readonly AgentAutomationRecord[]
  >([]);
  const [capabilities, setCapabilities] = useState<
    readonly PublishedCapabilityRecord[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPageData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const [automationsResponse, capabilitiesResponse] = await Promise.all([
          fetch("/api/automations"),
          fetch("/api/capabilities/mine"),
        ]);
        const automationsData: unknown = await automationsResponse.json();
        const capabilitiesData: unknown = await capabilitiesResponse.json();

        if (
          typeof automationsData === "object" &&
          automationsData !== null &&
          Array.isArray(
            (automationsData as { automations?: unknown }).automations,
          )
        ) {
          setAutomations(
            (automationsData as { automations: AgentAutomationRecord[] })
              .automations,
          );
        }

        if (
          typeof capabilitiesData === "object" &&
          capabilitiesData !== null &&
          Array.isArray(
            (capabilitiesData as { capabilities?: unknown }).capabilities,
          )
        ) {
          const allCapabilities = (
            capabilitiesData as { capabilities: PublishedCapabilityRecord[] }
          ).capabilities;
          setCapabilities(
            allCapabilities.filter(
              (item) => item.type === CapabilityType.WORKFLOW,
            ),
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadPageData();
  }, [refreshKey]);

  return { automations, capabilities, isLoading };
}
