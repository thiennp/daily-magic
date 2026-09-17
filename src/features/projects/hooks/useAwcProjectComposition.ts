"use client";

import { useEffect, useState } from "react";

import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";
import type ProjectCompositionItem from "@/lib/projects/types/ProjectCompositionItem.type";

const useAwcProjectComposition = (
  projectId: string,
): {
  readonly counts: ProjectCompositionCounts;
  readonly items: readonly ProjectCompositionItem[];
  readonly isLoading: boolean;
} => {
  const [counts, setCounts] = useState<ProjectCompositionCounts>({
    harness: 0,
    workflow: 0,
    agent: 0,
  });
  const [items, setItems] = useState<readonly ProjectCompositionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const load = async (): Promise<void> => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/projects/${encodeURIComponent(projectId)}/composition`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          return;
        }

        const data: unknown = await response.json();
        if (
          typeof data === "object" &&
          data !== null &&
          (data as { ok?: unknown }).ok === true
        ) {
          const record = data as {
            counts: ProjectCompositionCounts;
            items: ProjectCompositionItem[];
          };
          setCounts(record.counts);
          setItems(record.items);
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
  }, [projectId]);

  return { counts, items, isLoading };
};

export default useAwcProjectComposition;
