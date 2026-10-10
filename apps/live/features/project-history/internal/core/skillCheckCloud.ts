import type { AgentWitchCloudApiConfig } from "../../../projects/internal/core/agentWitchCloudApi";
import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "../../../projects/internal/core/agentWitchDeviceAuth.constant";

import type { DueSkillCheck } from "./skillCheck.types";

const url = (api: AgentWitchCloudApiConfig, projectId: string): string =>
  `${api.appOrigin}/api/agent-witch/projects/${encodeURIComponent(projectId)}/skill-checks`;

const headers = (api: AgentWitchCloudApiConfig): Record<string, string> => ({
  [AGENT_WITCH_PAIRING_TOKEN_HEADER]: api.pairingToken,
  "Content-Type": "application/json",
});

/** Skill checks waiting for this computer to judge. Throws on http errors. */
export const fetchDueSkillChecks = async (
  api: AgentWitchCloudApiConfig,
  projectId: string,
): Promise<readonly DueSkillCheck[]> => {
  const response = await fetch(url(api, projectId), {
    headers: headers(api),
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) {
    throw new Error(`skill-checks get http ${response.status}`);
  }
  const body = (await response.json()) as { checks?: DueSkillCheck[] };
  return Array.isArray(body.checks) ? body.checks : [];
};

/** Send one judged check back. False when the cloud refused it. */
export const postSkillCheckResult = async (
  api: AgentWitchCloudApiConfig,
  projectId: string,
  result: {
    readonly checkId: number;
    readonly verdict: "fine" | "improve";
    readonly note: string;
    readonly proposedBody?: string;
  },
): Promise<boolean> => {
  const response = await fetch(url(api, projectId), {
    method: "POST",
    headers: headers(api),
    body: JSON.stringify(result),
    signal: AbortSignal.timeout(20_000),
  });
  return response.ok;
};
