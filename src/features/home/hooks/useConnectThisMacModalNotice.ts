"use client";

import { useCallback, useEffect, useState } from "react";

import { refreshLocalAgentWitchIdentity } from "@/features/agent-witch/localAgentWitchIdentityResource";
import { refreshPairedDevices } from "@/features/agent-witch/pairedDevicesResource";
import useHomeConnectedMacs from "@/features/home/hooks/useHomeConnectedMacs";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import type { ConnectThisMacModalNotice } from "@/features/home/utils/ConnectThisMacModalNotice.type";
import { resolveConnectThisMacModalNotice } from "@/features/home/utils/resolveConnectThisMacModalNotice";
import { resolveHomeThisMacDeviceIdentity } from "@/features/home/utils/resolveHomeThisMacDeviceIdentity";
import { fetchAgentWitchInstallConnection } from "@/lib/agentWitch/fetchAgentWitchInstallConnection";
import type { AgentWitchLocalTooOldRefusal } from "@/lib/agentWitch/types/AgentWitchLocalTooOldRefusal.type";

const probeTooOldRefusal =
  async (): Promise<AgentWitchLocalTooOldRefusal | null> => {
    const status = await fetchAgentWitchInstallConnection().catch(() => null);
    return status?.tooOldRefusal ?? null;
  };

/**
 * Connect modal state (version-too-old / not running / retry / download).
 * Probes the install-connection endpoint on open so a server Connect refuse
 * (409 `agent_witch_local_too_old`) is surfaced instead of failing silently.
 */
const useConnectThisMacModalNotice = (input: {
  readonly isModalOpen: boolean;
}): {
  readonly notice: ConnectThisMacModalNotice | null;
  readonly isRetrying: boolean;
  readonly retry: () => void;
} => {
  const { isModalOpen } = input;
  const { devices } = useHomeConnectedMacs();
  const { localTokenHash, isWakeServerReachable } = useLocalMacBrowserContext();
  const [tooOldRefusal, setTooOldRefusal] =
    useState<AgentWitchLocalTooOldRefusal | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const cancelledRef = { current: false };
    void probeTooOldRefusal().then((refusal) => {
      if (!cancelledRef.current) {
        setTooOldRefusal(refusal);
      }
    });

    return () => {
      cancelledRef.current = true;
    };
  }, [isModalOpen]);

  const retry = useCallback(() => {
    setIsRetrying(true);
    void Promise.all([
      probeTooOldRefusal(),
      refreshPairedDevices().catch(() => null),
      refreshLocalAgentWitchIdentity().catch(() => null),
    ])
      .then(([refusal]) => {
        setTooOldRefusal(refusal);
      })
      .finally(() => {
        setIsRetrying(false);
      });
  }, []);

  const identity = resolveHomeThisMacDeviceIdentity({
    localTokenHash,
    devices,
  });
  const thisMacDevice =
    devices.find((device) => device.id === identity.thisMacDeviceId) ?? null;

  return {
    notice: resolveConnectThisMacModalNotice({
      tooOldRefusal,
      thisMacDevice,
      isThisMacReachable: identity.isReachable,
      isWakeServerReachable,
    }),
    isRetrying,
    retry,
  };
};

export default useConnectThisMacModalNotice;
