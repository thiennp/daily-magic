"use client";

interface AgentPairingTokenFormProps {
  readonly pairingToken: string;
  readonly isPairDisabled: boolean;
  readonly connectionStatus: string;
  readonly onPairingTokenChange: (value: string) => void;
  readonly onSaveAndPair: () => void;
}

export default function AgentPairingTokenForm({
  pairingToken,
  isPairDisabled,
  connectionStatus,
  onPairingTokenChange,
  onSaveAndPair,
}: AgentPairingTokenFormProps) {
  return (
    <>
      <label className="mt-4 block text-sm">
        <span className="font-medium text-gray-800 dark:text-white/90">
          Pairing token
        </span>
        <input
          type="password"
          value={pairingToken}
          onChange={(event) => {
            onPairingTokenChange(event.target.value);
          }}
          placeholder="Paste pairingToken from your Agent Witch config"
          className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        />
      </label>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSaveAndPair}
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
            ? "Waiting for server connection. Refresh this page if it stays disconnected."
            : "Paste your pairing token, then click Save and pair."}
        </p>
      ) : null}
    </>
  );
}
