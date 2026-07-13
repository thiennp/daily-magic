"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import AgentPairingTokenForm from "@/features/harness/AgentPairingTokenForm";
import { useAgentPairingToken } from "@/features/harness/hooks/useAgentPairingToken";
import type { UseAgentWitchHarnessSocketResult } from "@/features/harness/hooks/useAgentWitchHarnessSocket";
import { useOptionalPairedDeviceContext } from "@/features/home/PairedDeviceContext";
import buildHomeSetupNextStep from "@/features/home/utils/buildHomeSetupNextStep";
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
  const nextStep = buildHomeSetupNextStep({ hasPairedDevice, pairingStatus });
  const showPairingForm = nextStep.activeStep === "pair-browser";

  return (
    <AppPanel as="section" padding="compact" className="text-left">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
          Pair this browser
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <ConnectionStatusBadge status={connectionStatus} />
          <PairingStatusBadge pairingStatus={pairingStatus} />
        </div>
      </div>
      <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Linking your Mac on Home registers the computer with your account.
        Pairing this browser lets you edit rules, publish sharing snapshots, and
        sync harness files. Look for{" "}
        <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-gray-900">
          pairingToken
        </code>{" "}
        in{" "}
        <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-gray-900">
          ~/.agent-witch/profiles/&lt;your-email&gt;/config.json
        </code>{" "}
        after account link, or in legacy{" "}
        <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-gray-900">
          ~/.agent-witch/config.json
        </code>
        .
      </p>

      {!hasPairedDevice ? (
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Finish Mac install and account link first — the pairing token appears
          after that step.
        </p>
      ) : null}

      {showPairingForm ? (
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
      ) : (
        <p className="mt-3 text-sm text-success-700 dark:text-success-400">
          Browser pairing is complete. You can update rules and sharing below.
        </p>
      )}
    </AppPanel>
  );
}
