"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";

import type AgentAutomationRecord from "@/lib/automations/types/AgentAutomationRecord.type";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

const NO_AUTOMATIONS: readonly AgentAutomationRecord[] = [];
const NO_CAPABILITIES: readonly PublishedCapabilityRecord[] = [];

const toRequestKey = (refreshKey: number, reloadNonce: number): string =>
  `${refreshKey}:${reloadNonce}`;

export function useAutomationsPageData(refreshKey = 0): {
  readonly automations: readonly AgentAutomationRecord[];
  readonly capabilities: readonly PublishedCapabilityRecord[];
  readonly isLoading: boolean;
  readonly loadFailed: boolean;
  readonly reload: () => void;
} {
  const { status } = useSession();
  const [automations, setAutomations] =
    useState<readonly AgentAutomationRecord[]>(NO_AUTOMATIONS);
  const [capabilities, setCapabilities] =
    useState<readonly PublishedCapabilityRecord[]>(NO_CAPABILITIES);
  const [loadFailed, setLoadFailed] = useState(false);
  /** Request key of the last settled authenticated load (set only after await). */
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState(0);

  const reload = useCallback((): void => {
    setReloadNonce((nonce) => nonce + 1);
  }, []);

  const loadGenerationRef = useRef(0);

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    const requestKey = toRequestKey(refreshKey, reloadNonce);
    const generation = loadGenerationRef.current + 1;
    loadGenerationRef.current = generation;

    const isStale = (): boolean => loadGenerationRef.current !== generation;

    const loadPageData = async (): Promise<void> => {
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
          setLoadFailed(false);
        } else {
          setLoadFailed(true);
        }
      } catch {
        if (!isStale()) {
          setLoadFailed(true);
        }
      } finally {
        if (!isStale()) {
          setLoadedKey(requestKey);
        }
      }
    };

    void loadPageData();
  }, [refreshKey, reloadNonce, status]);

  const isAuthenticated = status === "authenticated";
  const hasSettled =
    isAuthenticated && loadedKey === toRequestKey(refreshKey, reloadNonce);

  return {
    automations: isAuthenticated ? automations : NO_AUTOMATIONS,
    capabilities: isAuthenticated ? capabilities : NO_CAPABILITIES,
    isLoading: status === "loading" || (isAuthenticated && !hasSettled),
    loadFailed: hasSettled && loadFailed,
    reload,
  };
}
