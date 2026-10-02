"use client";

import { useEffect } from "react";

import {
  loadAwcProjectAccess,
  type AwcProjectAccessSnapshot,
} from "@/features/projects/access/hooks/loadAwcProjectAccess";

/** Mount / projectId change: full-panel load with spinner. */
export const useAwcProjectAccessInitialLoad = (input: {
  readonly projectId: string;
  readonly onSnapshot: (snapshot: AwcProjectAccessSnapshot) => void;
  readonly setIsLoading: (value: boolean) => void;
}): void => {
  const { projectId, onSnapshot, setIsLoading } = input;

  useEffect(() => {
    const controller = new AbortController();
    const load = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const snapshot = await loadAwcProjectAccess(projectId);
        if (!controller.signal.aborted) {
          onSnapshot(snapshot);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };
    void load();
    return () => {
      controller.abort();
    };
  }, [projectId, onSnapshot, setIsLoading]);
};
