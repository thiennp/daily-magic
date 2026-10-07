"use client";

import { useCallback, useEffect, useState } from "react";

import {
  formatAssistantWakeHealth,
  type AssistantWakeHealth,
} from "@/features/projects/members/utils/formatAssistantWakeHealth";
import { fetchMemberGrokWebhookStatus } from "@/features/projects/access/utils/projectGrokWebhookApi";

type Loaded = {
  readonly key: string;
  readonly health: AssistantWakeHealth | null;
  readonly loadFailed: boolean;
};

export type AssistantWakeHealthState = {
  /** undefined = loading; null = the backend says no wake link is saved. */
  readonly health: AssistantWakeHealth | null | undefined;
  /** The status request failed: "Couldn't check the wake link" + Retry (never "Not connected"). */
  readonly loadFailed: boolean;
  readonly retry: () => void;
};

/**
 * Owner GET grok-webhook (`lastWakeAt` + `lastFailureReason`) → row health.
 * `reloadKey` bumps after a wake-link save; `retry` re-asks after a failure.
 */
export const useAssistantWakeHealth = (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly enabled: boolean;
  readonly reloadKey: number;
}): AssistantWakeHealthState => {
  const { projectId, membershipId, enabled, reloadKey } = input;
  const [attempt, setAttempt] = useState(0);
  const key = `${projectId}|${membershipId}|${reloadKey}|${attempt}`;
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    const settle = (health: AssistantWakeHealth | null, loadFailed: boolean): void => {
      if (!controller.signal.aborted) setLoaded({ key, health, loadFailed });
    };
    void fetchMemberGrokWebhookStatus(projectId, membershipId)
      .then((view) => {
        // An error body (ok:false / no flag) is a failed check, not "no wake link".
        if (view.ok !== true || typeof view.grokWebhookRegistered !== "boolean") {
          settle(null, true);
          return;
        }
        settle(
          view.grokWebhookRegistered
            ? formatAssistantWakeHealth({
                lastWakeAt: view.lastWakeAt ?? null,
                lastFailureReason: view.lastFailureReason ?? null,
              })
            : null,
          false,
        );
      })
      .catch(() => settle(null, true));
    return () => controller.abort();
  }, [enabled, key, projectId, membershipId]);

  if (!enabled) return { health: null, loadFailed: false, retry };
  if (loaded?.key !== key) return { health: undefined, loadFailed: false, retry };
  return { health: loaded.health, loadFailed: loaded.loadFailed, retry };
};
