"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const { status } = useSession();
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

  const loadGenerationRef = useRef(0);

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
      return;
    }

    if (status !== "authenticated") {
      setAutomations([]);
      setCapabilities([]);
      setLoadFailed(false);
      setIsLoading(false);
      return;
    }

    const generation = loadGenerationRef.current + 1;
    loadGenerationRef.current = generation;

    const isStale = (): boolean => loadGenerationRef.current !== generation;

    const loadPageData = async (): Promise<void> => {
      setIsLoading(true);
      setLoadFailed(false);
      try {
        const [automationsResponse, capabilitiesResponse] = await Promise.all([
          fetch("/api/automations"),
          fetch("/api/capabilities/mine"),
        ]);

        if (!automationsResponse.ok || !capabilitiesResponse.ok) {
          if (!isStale()) {
            setLoadFailed(true);
          }
          return;
        }

        const automationsData: unknown = await automationsResponse.json();
        const capabilitiesData: unknown = await capabilitiesResponse.json();

        if (isStale()) {
          return;
        }

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
        } else if (!isStale()) {
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
        } else if (!isStale()) {
          setLoadFailed(true);
        }
      } catch {
        if (!isStale()) {
          setLoadFailed(true);
        }
      } finally {
        if (!isStale()) {
          setIsLoading(false);
        }
      }
    };

    void loadPageData();
  }, [refreshKey, reloadNonce, status]);

  return {
    automations,
    capabilities,
    isLoading,
    loadFailed,
    reload,
  };
}
