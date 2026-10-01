"use client";

import { useCallback, useEffect, useState } from "react";

import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

export function useAutomationsPageData(refreshKey = 0): {
  readonly automations: readonly AgentAutomationRecord[];
  readonly capabilities: readonly PublishedCapabilityRecord[];
  readonly isLoading: boolean;
  readonly loadFailed: boolean;
  readonly reload: () => void;
} {
  const [automations, setAutomations] = useState<
    readonly AgentAutomationRecord[]
  >([]);
  const [capabilities, setCapabilities] = useState<
    readonly PublishedCapabilityRecord[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [reloadNonce, setReloadNonce] = useState(0);

  const reload = useCallback((): void => {
    setReloadNonce((nonce) => nonce + 1);
  }, []);

  useEffect(() => {
    const loadPageData = async (): Promise<void> => {
      setIsLoading(true);
      setLoadFailed(false);
      try {
        const [automationsResponse, capabilitiesResponse] = await Promise.all([
          fetch("/api/automations"),
          fetch("/api/capabilities/mine"),
        ]);

        if (!automationsResponse.ok || !capabilitiesResponse.ok) {
          setLoadFailed(true);
          return;
        }

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
        } else {
          setLoadFailed(true);
          return;
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
        } else {
          setLoadFailed(true);
        }
      } catch {
        setLoadFailed(true);
      } finally {
        setIsLoading(false);
      }
    };

    void loadPageData();
  }, [refreshKey, reloadNonce]);

  return {
    automations,
    capabilities,
    isLoading,
    loadFailed,
    reload,
  };
}
