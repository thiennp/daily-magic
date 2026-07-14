import {
  buildConnectionScenarioDevices,
  shouldMockDevicesApiFail,
} from "@/lib/agentWitch/mock/buildConnectionScenarioDevices";
import type { ConnectionScenarioId } from "@/lib/agentWitch/mock/connectionScenario.types";

export const buildMockDevicesApiResponse = (
  scenarioId: ConnectionScenarioId,
): Response | { readonly ok: true; readonly devices: unknown } => {
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
    devices: devices.map((device) => ({
      ...device,
      displayName: null,
      revokedAt: null,
      dispatchPolicy: null,
    })),
  };
};
