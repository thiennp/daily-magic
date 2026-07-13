"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import AgentPairingTokenForm from "@/features/harness/AgentPairingTokenForm";
import { useAgentPairingToken } from "@/features/harness/hooks/useAgentPairingToken";
import type { UseAgentWitchHarnessSocketResult } from "@/features/harness/hooks/useAgentWitchHarnessSocket";
import { useOptionalPairedDeviceContext } from "@/features/home/PairedDeviceContext";
import {
  ConnectionStatusBadge,
  PairingStatusBadge,
} from "@/features/shell/ConnectionStatusBadge";

interface AgentPairingPanelProps {
  readonly harnessSocket: UseAgentWitchHarnessSocketResult;
}

export default function AgentPairingPanel({
  harnessSocket,
}: AgentPairingPanelProps) {
  const { pairingToken, setPairingToken, savePairingToken } =
    useAgentPairingToken();
  const pairedDeviceContext = useOptionalPairedDeviceContext();
  const hasPairedDevice = pairedDeviceContext?.hasPairedDevice ?? false;
  const { connectionStatus, pairLocalAgent, pairingStatus } = harnessSocket;
  const isPairDisabled =
    connectionStatus !== "connected" || pairingToken.trim().length === 0;
  const isBrowserPaired = pairingStatus === "paired";

  return (
    <AppPanel as="section" padding="compact" className="text-left">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
          Browser pairing (optional)
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <ConnectionStatusBadge status={connectionStatus} />
          <PairingStatusBadge pairingStatus={pairingStatus} />
        </div>
      </div>
      <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Only needed to edit harness rules, publish sharing snapshots, and sync
        files from this browser. Sending tasks from Agent works without this
        step once your Mac is connected.
      </p>

      {!hasPairedDevice ? (
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Connect your Mac first — the pairing token appears after install.
        </p>
      ) : null}

      {hasPairedDevice && !isBrowserPaired ? (
        <AgentPairingTokenForm
          pairingToken={pairingToken}
          isPairDisabled={isPairDisabled}
          connectionStatus={connectionStatus}
          onPairingTokenChange={setPairingToken}
          onSaveAndPair={() => {
            savePairingToken();
            pairLocalAgent(pairingToken.trim());
          }}
        />
      ) : null}

      {hasPairedDevice && isBrowserPaired ? (
        <p className="mt-3 text-sm text-success-700 dark:text-success-400">
          This browser is paired. You can update rules and sharing below.
        </p>
      ) : null}
    </AppPanel>
  );
}
