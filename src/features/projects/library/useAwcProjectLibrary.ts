"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useProjectSkills } from "@/features/project-skill-share/public-api/presentation";
import {
  mapProjectLibraryCapabilities,
  mapProjectLibrarySkills,
  type ProjectLibraryItem,
} from "@/features/projects/library/utils/buildProjectLibraryItems";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

export interface AwcProjectLibraryState {
  readonly items: readonly ProjectLibraryItem[];
  readonly skills: ReturnType<typeof useProjectSkills>;
  readonly isLoading: boolean;
  readonly loadFailed: boolean;
  readonly reload: () => void;
}

/** Project-scoped capabilities + skills. Add-from uses /mine separately. */
const useAwcProjectLibrary = (projectId: string): AwcProjectLibraryState => {
  const skills = useProjectSkills(projectId);
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
    const controller = new AbortController();
    const load = async (): Promise<void> => {
      setIsLoading(true);
      setLoadFailed(false);
      try {
        const response = await fetch(
          `/api/projects/${encodeURIComponent(projectId)}/library`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          setLoadFailed(true);
          return;
        }
        const data: unknown = await response.json();
        const list =
          typeof data === "object" &&
          data !== null &&
          "capabilities" in data &&
          Array.isArray((data as { capabilities: unknown }).capabilities)
            ? (data as { capabilities: PublishedCapabilityRecord[] })
                .capabilities
            : null;
        if (list === null) {
          setLoadFailed(true);
          return;
        }
        setCapabilities(list);
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setLoadFailed(true);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };
    void load();
    return () => {
      controller.abort();
    };
  }, [projectId, reloadNonce]);

  const items = useMemo(
    () =>
      [
        ...mapProjectLibraryCapabilities(capabilities, projectId),
        ...mapProjectLibrarySkills(skills.skills),
      ].toSorted(
        (left, right) =>
          Date.parse(right.updatedAt) - Date.parse(left.updatedAt),
      ),
    [capabilities, projectId, skills.skills],
  );
  return {
    items,
    skills,
    isLoading: isLoading || skills.isLoading,
    loadFailed,
    reload,
  };
};

export default useAwcProjectLibrary;
