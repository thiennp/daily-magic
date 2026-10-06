import { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchInstallBundleVersion";
import {
  buildConnectionScenarioDevices,
  shouldMockDevicesApiFail,
} from "@/lib/agentWitch/mock/buildConnectionScenarioDevices";
import type { ConnectionScenarioId } from "@/lib/agentWitch/mock/connectionScenario.types";

export const buildMockDevicesApiResponse = (
  scenarioId: ConnectionScenarioId,
):
  | Response
  | {
      readonly ok: true;
      readonly serverInstallBundleVersion: string;
      readonly devices: unknown;
    } => {
  if (shouldMockDevicesApiFail(scenarioId)) {
    return new Response(
      JSON.stringify({ error: "Mock devices API failure." }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const devices = buildConnectionScenarioDevices(scenarioId) ?? [];

  return {
    ok: true,
    serverInstallBundleVersion: AGENT_WITCH_INSTALL_BUNDLE_VERSION,
    devices: devices.map((device) => ({
      ...device,
      displayName: null,
      revokedAt: null,
      dispatchPolicy: null,
      installBundleVersion: null,
      wakePort: null,
    })),
  };
};
