"use client";

import { useCallback, useEffect, useState } from "react";

export type ProjectSkillBodyState =
  | { readonly status: "loading" }
  | { readonly status: "ready"; readonly body: string }
  | { readonly status: "error" };

const readBody = (payload: unknown): string | null => {
  if (typeof payload !== "object" || payload === null) return null;
  const skill = (payload as { skill?: unknown }).skill;
  if (typeof skill !== "object" || skill === null) return null;
  const body = (skill as { body?: unknown }).body;
  return typeof body === "string" ? body : null;
};

/** Full skill text (GET /skills/:skillId); refetches when `updatedAt` changes. */
const useProjectSkillBody = (
  projectId: string,
  skillId: string,
  updatedAt: string,
): { readonly state: ProjectSkillBodyState; readonly retry: () => void } => {
  const [state, setState] = useState<ProjectSkillBodyState>({
    status: "loading",
  });
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback((): void => {
    setAttempt((count) => count + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const load = async (): Promise<void> => {
      setState({ status: "loading" });
      try {
        const response = await fetch(
          `/api/projects/${encodeURIComponent(projectId)}/skills/${encodeURIComponent(skillId)}`,
          { cache: "no-store", signal: controller.signal },
        );
        const body = response.ok ? readBody(await response.json()) : null;
        setState(
          body === null ? { status: "error" } : { status: "ready", body },
        );
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setState({ status: "error" });
      }
    };
    void load();
    return () => {
      controller.abort();
    };
  }, [projectId, skillId, updatedAt, attempt]);

  return { state, retry };
};

export default useProjectSkillBody;
