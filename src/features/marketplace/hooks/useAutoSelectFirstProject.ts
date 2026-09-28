"use client";

import { useEffect } from "react";

import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export function useAutoSelectFirstProject(
  projects: readonly UserProjectRecord[],
  selectedProjectId: string,
  setSelectedProjectId: (id: string) => void,
): void {
  useEffect(() => {
    if (selectedProjectId.length > 0) {
      return;
    }

    const first = projects[0];
    if (first !== undefined) {
      setSelectedProjectId(first.id);
    }
  }, [projects, selectedProjectId, setSelectedProjectId]);
}
