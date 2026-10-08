"use client";

import { useCallback, useEffect, useState } from "react";

import type {
  AutoSkillAnswer,
  AutoSkillJudgePref,
  AutoSkillsOverview,
} from "@/features/project-auto-skills/internal/core/projectAutoSkills.type";
import {
  autoSkillsUrl,
  fetchAutoSkillsOverview,
  postAutoSkillAnswer,
} from "@/features/project-auto-skills/internal/presentation/autoSkillsApi";

export interface AutoSkillsState {
  /** Null for non-owners and while loading. */
  readonly overview: AutoSkillsOverview | null;
  readonly busy: boolean;
  readonly setEnabled: (enabled: boolean) => Promise<void>;
  readonly setJudgePref: (pref: AutoSkillJudgePref) => Promise<void>;
  readonly answer: (id: string, answer: AutoSkillAnswer) => Promise<boolean>;
  readonly reload: () => void;
}

/**
 * Owner-only Auto skills state, shared by the Library strip, the project
 * Overview, the One window feed. `enabled` false skips the request.
 */
export const useAutoSkills = (
  projectId: string,
  enabled = true,
): AutoSkillsState => {
  const [overview, setOverview] = useState<AutoSkillsOverview | null>(null);
  const [busy, setBusy] = useState(false);
  const [nonce, setNonce] = useState(0);
  const reload = useCallback((): void => setNonce((n) => n + 1), []);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const controller = new AbortController();
    void fetchAutoSkillsOverview(projectId, controller.signal)
      .then(setOverview)
      .catch(() => undefined); // keep the previous state; optional chrome
    return () => controller.abort();
  }, [projectId, nonce, enabled]);

  const patch = useCallback(
    async (body: Record<string, unknown>): Promise<void> => {
      setBusy(true);
      try {
        await fetch(autoSkillsUrl(projectId), {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch {
        // surfaced by the next reload
      } finally {
        setBusy(false);
        reload();
      }
    },
    [projectId, reload],
  );

  const answer = useCallback(
    async (id: string, value: AutoSkillAnswer): Promise<boolean> => {
      setBusy(true);
      const ok = await postAutoSkillAnswer(projectId, id, value);
      setBusy(false);
      reload();
      return ok;
    },
    [projectId, reload],
  );

  return {
    overview: enabled ? overview : null,
    busy,
    reload,
    setEnabled: (value) => patch({ enabled: value }),
    setJudgePref: (judgePref) => patch({ judgePref }),
    answer,
  };
};
