import { parseProjectPitfallList } from "@agent-witch/shared/pitfalls";

import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "../agentWitchDeviceAuth.constant";
import type { AgentWitchCloudApiConfig } from "../agentWitchCloudApi";
import type { AgentWitchProjectPitfallsStore } from "./agentWitchProjectPitfallsStore.type";

const LIST_TIMEOUT_MS = 10_000;
const UPSERT_TIMEOUT_MS = 15_000;

export const buildAgentWitchProjectPitfallsUrl = (
  appOrigin: string,
  projectId: string,
  pitfallId?: string,
): string => {
  const base = `${appOrigin.replace(/\/$/, "")}/api/agent-witch/projects/${encodeURIComponent(projectId)}/pitfalls`;
  return pitfallId === undefined
    ? base
    : `${base}/${encodeURIComponent(pitfallId)}`;
};

const isLimitExceededBody = (body: unknown): boolean => {
  if (typeof body !== "object" || body === null) {
    return false;
  }
  const record = body as { errorMessage?: unknown; code?: unknown };
  return (
    record.errorMessage === "limit_exceeded" || record.code === "limit_exceeded"
  );
};

/**
 * Cloud SoT client for NRG pitfall routes. Upsert is collection PUT/POST with
 * full content (id in body). Cap overflow is HTTP 409 `limit_exceeded`.
 */
const createCloudAgentWitchProjectPitfallsStore = (
  config: AgentWitchCloudApiConfig,
  fetchImpl: typeof fetch = fetch,
): AgentWitchProjectPitfallsStore => ({
  listPitfalls: async (projectId, options) => {
    try {
      const url = new URL(
        buildAgentWitchProjectPitfallsUrl(config.appOrigin, projectId),
      );
      url.searchParams.set(
        "includeRetired",
        options.includeRetired ? "1" : "0",
      );
      const response = await fetchImpl(url.toString(), {
        method: "GET",
        headers: { [AGENT_WITCH_PAIRING_TOKEN_HEADER]: config.pairingToken },
        signal: AbortSignal.timeout(LIST_TIMEOUT_MS),
      });
      if (!response.ok) {
        return { ok: false, reason: "unavailable" };
      }
      const parsed = parseProjectPitfallList(await response.json());
      return parsed === null
        ? { ok: false, reason: "unavailable" }
        : { ok: true, items: parsed.items, syncedAt: parsed.syncedAt };
    } catch {
      return { ok: false, reason: "unavailable" };
    }
  },
  upsertPitfall: async (projectId, pitfall) => {
    try {
      const response = await fetchImpl(
        buildAgentWitchProjectPitfallsUrl(config.appOrigin, projectId),
        {
          method: "PUT",
          headers: {
            [AGENT_WITCH_PAIRING_TOKEN_HEADER]: config.pairingToken,
            "content-type": "application/json",
          },
          body: JSON.stringify(pitfall),
          signal: AbortSignal.timeout(UPSERT_TIMEOUT_MS),
        },
      );
      if (response.ok) {
        return { ok: true };
      }
      if (response.status === 409) {
        const body: unknown = await response.json().catch(() => null);
        return {
          ok: false,
          reason: isLimitExceededBody(body) ? "active_limit" : "rejected",
        };
      }
      if (response.status === 400) {
        return { ok: false, reason: "rejected" };
      }
      return {
        ok: false,
        reason: response.status >= 500 ? "unavailable" : "rejected",
      };
    } catch {
      return { ok: false, reason: "unavailable" };
    }
  },
});

export default createCloudAgentWitchProjectPitfallsStore;
