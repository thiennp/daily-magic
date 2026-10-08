"use client";

import { useEffect, useState } from "react";

import type { ProjectKnowledgeImpactView } from "@/lib/knowledge/buildProjectKnowledgeImpactView";

export interface AwcProjectKnowledgeImpactState {
  readonly impact: ProjectKnowledgeImpactView | null;
  readonly isLoading: boolean;
  readonly loadFailed: boolean;
}

/** `/api/projects/:id/knowledge-impact` for the Reports tab block. */
const useAwcProjectKnowledgeImpact = (
  projectId: string,
): AwcProjectKnowledgeImpactState => {
  const [state, setState] = useState<AwcProjectKnowledgeImpactState>({
    impact: null,
    isLoading: true,
    loadFailed: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    const load = async (): Promise<void> => {
      try {
        const response = await fetch(
          `/api/projects/${encodeURIComponent(projectId)}/knowledge-impact`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          setState({ impact: null, isLoading: false, loadFailed: true });
          return;
        }
        const data = (await response.json()) as {
          impact?: ProjectKnowledgeImpactView;
        };
        setState({
          impact: data.impact ?? null,
          isLoading: false,
          loadFailed: data.impact === undefined,
        });
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setState({ impact: null, isLoading: false, loadFailed: true });
      }
    };
    void load();
    return () => {
      controller.abort();
    };
  }, [projectId]);

  return state;
};

export default useAwcProjectKnowledgeImpact;
