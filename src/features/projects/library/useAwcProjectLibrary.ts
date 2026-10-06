"use client";

import { useMemo } from "react";

import { useLibraryCapabilities } from "@/features/library/hooks/useLibraryCapabilities";
import { useProjectSkills } from "@/features/project-skill-share/public-api/presentation";
import {
  mapProjectLibraryCapabilities,
  mapProjectLibrarySkills,
  type ProjectLibraryItem,
} from "@/features/projects/library/utils/buildProjectLibraryItems";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

export interface AwcProjectLibraryState {
  readonly items: readonly ProjectLibraryItem[];
  /** All of my library items (any project) — source for Add from another project. */
  readonly capabilities: readonly PublishedCapabilityRecord[];
  readonly skills: ReturnType<typeof useProjectSkills>;
  readonly isLoading: boolean;
  readonly loadFailed: boolean;
  readonly reload: () => void;
}

/**
 * Library for one project: my library items scoped by `projectId` + this
 * project's shared skills (owner / member ACL from the skills API).
 */
const useAwcProjectLibrary = (projectId: string): AwcProjectLibraryState => {
  const library = useLibraryCapabilities();
  const skills = useProjectSkills(projectId);
  const items = useMemo(
    () =>
      [
        ...mapProjectLibraryCapabilities(library.capabilities, projectId),
        ...mapProjectLibrarySkills(skills.skills),
      ].toSorted(
        (left, right) =>
          Date.parse(right.updatedAt) - Date.parse(left.updatedAt),
      ),
    [library.capabilities, projectId, skills.skills],
  );
  return {
    items,
    capabilities: library.capabilities,
    skills,
    isLoading: library.isLoading || skills.isLoading,
    loadFailed: library.loadFailed,
    reload: library.reload,
  };
};

export default useAwcProjectLibrary;
