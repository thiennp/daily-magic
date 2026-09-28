import { parseHarnessInstallBundle } from "@agent-witch/live-harness";
import type { HarnessInstallBundle } from "@agent-witch/live-harness/types";

import { AGENT_WITCH_PAIRING_TOKEN_HEADER } from "./agentWitchDeviceAuth.constant";
import type { AgentWitchCloudApiConfig } from "./agentWitchCloudApi";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const fetchBoundHarnessBundlesFromCloud = async (
  config: AgentWitchCloudApiConfig,
  projectId: string,
): Promise<readonly HarnessInstallBundle[] | null> => {
  try {
    const response = await fetch(
      `${config.appOrigin}/api/agent-witch/projects/${encodeURIComponent(projectId)}/bound-harness`,
      {
        method: "GET",
        headers: {
          [AGENT_WITCH_PAIRING_TOKEN_HEADER]: config.pairingToken,
        },
        signal: AbortSignal.timeout(15_000),
      },
    );

    if (!response.ok) {
      return null;
    }

    const body: unknown = await response.json();
    if (!isRecord(body) || body.ok !== true || !Array.isArray(body.bundles)) {
      return null;
    }

    return body.bundles.flatMap((bundle) => {
      const parsed = parseHarnessInstallBundle(bundle);
      return parsed === null ? [] : [parsed];
    });
  } catch {
    return null;
  }
};

export default fetchBoundHarnessBundlesFromCloud;
