"use client";

import { useEffect, useMemo, useState } from "react";

import loadUserProjectsFromApi from "@/features/agent/hooks/loadUserProjectsFromApi";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

/** My published library items in other projects, grouped by project. */
const useAwcProjectLibraryAddFrom = (input: {
  readonly projectId: string;
  readonly capabilities: readonly PublishedCapabilityRecord[];
}): {
  readonly isLoading: boolean;
  readonly sourceProjects: readonly UserProjectRecord[];
  readonly itemsFor: (
    projectId: string,
  ) => readonly PublishedCapabilityRecord[];
} => {
  const { projectId, capabilities } = input;
  const [projects, setProjects] = useState<readonly UserProjectRecord[] | null>(
    null,
  );

  useEffect(() => {
    const controller = new AbortController();
    void loadUserProjectsFromApi("")
      .then((result) => (result.ok ? result.projects : []))
      .catch((): readonly UserProjectRecord[] => [])
      .then((loaded) => {
        if (!controller.signal.aborted) setProjects(loaded);
      });
    return () => {
      controller.abort();
    };
  }, []);

  const published = useMemo(
    () =>
      capabilities.filter(
        (capability) =>
          capability.status === CapabilityStatus.PUBLISHED &&
          typeof capability.projectId === "string" &&
          capability.projectId !== projectId,
      ),
    [capabilities, projectId],
  );
  const sourceProjects = useMemo(
    () =>
      (projects ?? []).filter(
        (project) =>
          project.id !== projectId &&
          published.some((capability) => capability.projectId === project.id),
      ),
    [projects, projectId, published],
  );

  return {
    isLoading: projects === null,
    sourceProjects,
    itemsFor: (sourceProjectId) =>
      published.filter(
        (capability) => capability.projectId === sourceProjectId,
      ),
  };
};

export default useAwcProjectLibraryAddFrom;
