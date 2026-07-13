"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { useAgentPairingToken } from "@/features/harness/hooks/useAgentPairingToken";
import type { UseAgentWitchHarnessSocketResult } from "@/features/harness/hooks/useAgentWitchHarnessSocket";
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
  const { connectionStatus, pairLocalAgent, pairingStatus } = harnessSocket;
  const isPairDisabled =
    connectionStatus !== "connected" || pairingToken.trim().length === 0;

  return (
    <AppPanel as="section" padding="compact" className="text-left">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
          Connect this browser
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <ConnectionStatusBadge status={connectionStatus} />
          <PairingStatusBadge pairingStatus={pairingStatus} />
        </div>
      </div>
      <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        After installing the local agent, copy the pairing token from{" "}
        <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-gray-900">
          ~/.agent-witch/config.json
        </code>{" "}
        and save it here once. Your browser will auto-pair on future logins.
      </p>

      <label className="mt-4 block text-sm">
        <span className="font-medium text-gray-800 dark:text-white/90">
          Pairing token
        </span>
        <input
          type="password"
          value={pairingToken}
          onChange={(event) => {
            setPairingToken(event.target.value);
          }}
          placeholder="Paste pairing token from install output"
          className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
      </label>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            savePairingToken();
            pairLocalAgent(pairingToken.trim());
          }}
          disabled={isPairDisabled}
          aria-describedby={
            isPairDisabled ? "agent-pairing-disabled-hint" : undefined
          }
          className="inline-flex h-10 items-center justify-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save and pair
        </button>
      </div>

      {isPairDisabled ? (
        <p
          id="agent-pairing-disabled-hint"
          className="mt-3 text-sm text-gray-500 dark:text-gray-400"
        >
          {connectionStatus !== "connected"
            ? "Waiting for server connection. If you just installed the client, wait a few seconds and refresh."
            : "Paste your pairing token to continue."}
        </p>
      ) : null}
    </AppPanel>
  );
}
