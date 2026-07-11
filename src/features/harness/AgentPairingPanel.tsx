"use client";

import { useAgentPairingToken } from "@/features/harness/hooks/useAgentPairingToken";
import type { UseAgentWitchHarnessSocketResult } from "@/features/harness/hooks/useAgentWitchHarnessSocket";

const PAIRING_STATUS_LABELS: Record<
  UseAgentWitchHarnessSocketResult["pairingStatus"],
  string
> = {
  not_connected: "Not connected",
  ready_to_pair: "Token saved, waiting for local agent",
  paired: "Paired",
  pairing_failed: "Pairing failed",
};

interface AgentPairingPanelProps {
  readonly harnessSocket: UseAgentWitchHarnessSocketResult;
}

export default function AgentPairingPanel({
  harnessSocket,
}: AgentPairingPanelProps) {
  const { pairingToken, setPairingToken, savePairingToken } =
    useAgentPairingToken();
  const { connectionStatus, pairLocalAgent, pairingStatus } = harnessSocket;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 text-left dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
        Local agent pairing
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        After installing the local agent, copy the pairing token from{" "}
        <code className="rounded bg-gray-100 px-1 py-0.5 text-xs dark:bg-gray-900">
          ~/.agent-witch/config.json
        </code>{" "}
        and save it here. Only your authenticated browser session can claim that
        token and send commands to your local agent.
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
          disabled={
            connectionStatus !== "connected" || pairingToken.trim().length === 0
          }
          className="inline-flex h-10 items-center justify-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save and pair
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Pairing status:{" "}
        <span className="font-medium text-gray-800 dark:text-gray-200">
          {PAIRING_STATUS_LABELS[pairingStatus]}
        </span>
      </p>
    </section>
  );
}
