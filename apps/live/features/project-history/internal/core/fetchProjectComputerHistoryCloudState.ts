import type { AgentWitchCloudApiConfig } from "../../../projects/internal/core/agentWitchCloudApi";
import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "../../../projects/internal/core/agentWitchDeviceAuth.constant";

import type { LocalProjectHistoryState } from "./localProjectHistoryState";

export type ProjectComputerHistoryCloudStateRead =
  | { readonly kind: "known"; readonly state: LocalProjectHistoryState }
  | { readonly kind: "unknown"; readonly reason: string };

const KNOWN_STATES: readonly LocalProjectHistoryState[] = [
  "off",
  "on_configuring",
  "on_ready",
  "degraded",
];

/**
 * Device-auth GET of the project's cloud History state (AWC `computer_read`).
 * Never throws: any HTTP error, network error, or malformed body is `unknown`,
 * so callers can never mistake a failed read for a confirmed OFF.
 */
export const fetchProjectComputerHistoryCloudState = async (input: {
  readonly cloudApi: AgentWitchCloudApiConfig;
  readonly projectId: string;
}): Promise<ProjectComputerHistoryCloudStateRead> => {
  try {
    const response = await fetch(
      `${input.cloudApi.appOrigin}/api/agent-witch/projects/${encodeURIComponent(input.projectId)}/computer-history`,
      {
        method: "GET",
        headers: {
          [AGENT_WITCH_PAIRING_TOKEN_HEADER]: input.cloudApi.pairingToken,
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(30_000),
      },
    );
    if (!response.ok) {
      return { kind: "unknown", reason: `http_${response.status}` };
    }
    const body: unknown = await response.json();
    if (
      typeof body !== "object" ||
      body === null ||
      (body as { ok?: unknown }).ok !== true
    ) {
      return { kind: "unknown", reason: "malformed_body" };
    }
    const state = (body as { state?: unknown }).state;
    if (
      typeof state !== "string" ||
      !(KNOWN_STATES as readonly string[]).includes(state)
    ) {
      return { kind: "unknown", reason: "unknown_state" };
    }
    return { kind: "known", state: state as LocalProjectHistoryState };
  } catch {
    return { kind: "unknown", reason: "fetch_failed" };
  }
};
