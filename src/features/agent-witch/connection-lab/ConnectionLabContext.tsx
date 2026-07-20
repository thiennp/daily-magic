import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchInstallBundleVersion";
import {
  buildConnectionScenarioDevices,
  CONNECTION_SCENARIO_LABELS,
  shouldMockDevicesApiFail,
} from "@/lib/agentWitch/mock/buildConnectionScenarioDevices";
import type { ConnectionScenarioId } from "@/lib/agentWitch/mock/connectionScenario.types";

interface ConnectionLabContextValue {
  readonly scenarioId: ConnectionScenarioId;
  readonly setScenarioId: (scenarioId: ConnectionScenarioId) => void;
  readonly scenarioLabels: typeof CONNECTION_SCENARIO_LABELS;
  readonly mockDevices: readonly MyMacDevice[];
  readonly devicesApiFails: boolean;
  readonly serverInstallBundleVersion: string;
  readonly connectionStatus: WsTestConnectionStatus;
}

const ConnectionLabContext = createContext<ConnectionLabContextValue | null>(
  null,
);

const toMyMacDevices = (
  scenarioId: ConnectionScenarioId,
): readonly MyMacDevice[] => {
  const records = buildConnectionScenarioDevices(scenarioId);
  if (records === null) {
    return [];
  }

  return records.map((device) => ({
    id: device.id,
    deviceLabel: device.deviceLabel,
    displayName: null,
    claimedAt: device.claimedAt,
    lastSeenAt: device.lastSeenAt,
    isConnected: device.isOnline,
    isOnline: device.isOnline,
    lastHeartbeatAt: device.lastHeartbeatAt,
    installBundleVersion: null,
  }));
};

const resolveLabConnectionStatus = (
  scenarioId: ConnectionScenarioId,
): WsTestConnectionStatus => {
  if (scenarioId === "ws-disconnected") {
    return "disconnected";
  }

  return "connected";
};

export function ConnectionLabProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [scenarioId, setScenarioId] = useState<ConnectionScenarioId>("mixed");

  const mockDevices = useMemo(() => toMyMacDevices(scenarioId), [scenarioId]);

  const value = useMemo<ConnectionLabContextValue>(
    () => ({
      scenarioId,
      setScenarioId,
      scenarioLabels: CONNECTION_SCENARIO_LABELS,
      mockDevices,
      devicesApiFails: shouldMockDevicesApiFail(scenarioId),
      serverInstallBundleVersion: AGENT_WITCH_INSTALL_BUNDLE_VERSION,
      connectionStatus: resolveLabConnectionStatus(scenarioId),
    }),
    [mockDevices, scenarioId],
  );

  return (
    <ConnectionLabContext.Provider value={value}>
      {children}
    </ConnectionLabContext.Provider>
  );
}

export const useConnectionLab = (): ConnectionLabContextValue | null =>
  useContext(ConnectionLabContext);

export const useConnectionLabScenario = (): {
  readonly scenarioId: ConnectionScenarioId;
  readonly setScenarioId: (scenarioId: ConnectionScenarioId) => void;
  readonly scenarioLabels: typeof CONNECTION_SCENARIO_LABELS;
} => {
  const lab = useConnectionLab();
  const setScenarioId = useCallback(
    (scenarioId: ConnectionScenarioId) => {
      lab?.setScenarioId(scenarioId);
    },
    [lab],
  );

  return {
    scenarioId: lab?.scenarioId ?? "mixed",
    setScenarioId,
    scenarioLabels: lab?.scenarioLabels ?? CONNECTION_SCENARIO_LABELS,
  };
};
