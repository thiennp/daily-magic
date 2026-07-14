import type {
  ConnectionScenarioId,
  MockMacDeviceRecord,
} from "@/lib/agentWitch/mock/connectionScenario.types";

const MOCK_TIMESTAMP = "2026-07-14T12:00:00.000Z";

const onlineMac: MockMacDeviceRecord = {
  id: "mock-device-online",
  deviceLabel: "Studio Mac",
  claimedAt: MOCK_TIMESTAMP,
  lastSeenAt: MOCK_TIMESTAMP,
  isActive: true,
  isOnline: true,
  lastHeartbeatAt: MOCK_TIMESTAMP,
};

const offlineMac: MockMacDeviceRecord = {
  id: "mock-device-offline",
  deviceLabel: "Travel MacBook",
  claimedAt: MOCK_TIMESTAMP,
  lastSeenAt: MOCK_TIMESTAMP,
  isActive: true,
  isOnline: false,
  lastHeartbeatAt: null,
};

export const CONNECTION_SCENARIO_LABELS: Readonly<
  Record<ConnectionScenarioId, string>
> = {
  "all-online": "All Macs online",
  "all-offline": "All Macs offline",
  mixed: "One online, one offline",
  "no-devices": "No paired Macs",
  "api-error": "Devices API error",
  "ws-disconnected": "Server WebSocket down",
};

export const buildConnectionScenarioDevices = (
  scenarioId: ConnectionScenarioId,
): readonly MockMacDeviceRecord[] | null => {
  switch (scenarioId) {
    case "all-online":
      return [
        onlineMac,
        {
          ...offlineMac,
          id: "mock-device-online-2",
          isOnline: true,
          lastHeartbeatAt: MOCK_TIMESTAMP,
        },
      ];
    case "all-offline":
      return [
        offlineMac,
        { ...onlineMac, isOnline: false, lastHeartbeatAt: null },
      ];
    case "mixed":
      return [onlineMac, offlineMac];
    case "no-devices":
      return [];
    case "api-error":
    case "ws-disconnected":
      return [onlineMac, offlineMac];
    default:
      return [];
  }
};

export const shouldMockDevicesApiFail = (
  scenarioId: ConnectionScenarioId,
): boolean => scenarioId === "api-error";
