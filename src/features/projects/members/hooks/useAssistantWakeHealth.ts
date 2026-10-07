"use client";

import { useEffect, useState } from "react";

import {
  formatAssistantWakeHealth,
  type AssistantWakeHealth,
} from "@/features/projects/members/utils/formatAssistantWakeHealth";
import { fetchMemberGrokWebhookStatus } from "@/features/projects/access/utils/projectGrokWebhookApi";

type Loaded = { readonly key: string; readonly health: AssistantWakeHealth | null };

/**
 * P1-S1b: owner GET grok-webhook (`lastWakeAt` + `lastFailureReason`) → row
 * health. undefined = loading; null = not registered / could not load.
 * `reloadKey` bumps after a wake-link save.
 */
export const useAssistantWakeHealth = (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly enabled: boolean;
  readonly reloadKey: number;
}): AssistantWakeHealth | null | undefined => {
  const { projectId, membershipId, enabled, reloadKey } = input;
  const key = `${projectId}|${membershipId}|${reloadKey}`;
  const [loaded, setLoaded] = useState<Loaded | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    const settle = (health: AssistantWakeHealth | null): void => {
      if (!controller.signal.aborted) setLoaded({ key, health });
    };
    void fetchMemberGrokWebhookStatus(projectId, membershipId)
      .then((view) =>
        settle(
          view.grokWebhookRegistered === true
            ? formatAssistantWakeHealth({
                lastWakeAt: view.lastWakeAt ?? null,
                lastFailureReason: view.lastFailureReason ?? null,
              })
            : null,
        ),
      )
      .catch(() => settle(null));
    return () => controller.abort();
  }, [enabled, key, projectId, membershipId]);

  if (!enabled) return null;
  return loaded?.key === key ? loaded.health : undefined;
};
