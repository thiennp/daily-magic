"use client";

import { useCallback, useEffect, useState } from "react";

import type {
  AutoSkillAnswer,
  AutoSkillJudgePref,
  AutoSkillsOverview,
} from "@/features/project-auto-skills/internal/core/projectAutoSkills.type";

export interface AutoSkillsState {
  /** Null for non-owners and while loading. */
  readonly overview: AutoSkillsOverview | null;
  readonly busy: boolean;
  readonly setEnabled: (enabled: boolean) => Promise<void>;
  readonly setJudgePref: (pref: AutoSkillJudgePref) => Promise<void>;
  readonly answer: (id: string, answer: AutoSkillAnswer) => Promise<boolean>;
  readonly reload: () => void;
}

const base = (projectId: string): string =>
  `/api/projects/${encodeURIComponent(projectId)}/auto-skills`;

/** Owner-only Auto skills state for the Library strip. */
export const useAutoSkills = (projectId: string): AutoSkillsState => {
  const [overview, setOverview] = useState<AutoSkillsOverview | null>(null);
  const [busy, setBusy] = useState(false);
  const [nonce, setNonce] = useState(0);
  const reload = useCallback((): void => setNonce((n) => n + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      try {
        const response = await fetch(base(projectId), {
          signal: controller.signal,
          cache: "no-store",
        });
        const body = (await response.json()) as {
          overview?: AutoSkillsOverview;
        };
        setOverview(response.ok ? (body.overview ?? null) : null);
      } catch {
        // keep the previous state; the strip is optional chrome
      }
    })();
    return () => controller.abort();
  }, [projectId, nonce]);

  const send = useCallback(
    async (url: string, init: RequestInit): Promise<boolean> => {
      setBusy(true);
      try {
        const response = await fetch(url, {
          ...init,
          headers: { "Content-Type": "application/json" },
        });
        reload();
        return response.ok;
      } catch {
        return false;
      } finally {
        setBusy(false);
      }
    },
    [reload],
  );

  return {
    overview,
    busy,
    reload,
    setEnabled: async (enabled) => {
      await send(base(projectId), {
        method: "PATCH",
        body: JSON.stringify({ enabled }),
      });
    },
    setJudgePref: async (judgePref) => {
      await send(base(projectId), {
        method: "PATCH",
        body: JSON.stringify({ judgePref }),
      });
    },
    answer: (id, answer) =>
      send(`${base(projectId)}/suggestions/${encodeURIComponent(id)}`, {
        method: "POST",
        body: JSON.stringify({ answer }),
      }),
  };
};
