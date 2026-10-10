"use client";

import { useState } from "react";

import LocalTerminalPre from "@/components/surfaces/LocalTerminalPre";
import Button from "@/components/ui/button/Button";
import { useAgentWitchDashboard } from "@/features/agent-witch/dashboard/public-api/presentation";
import { ConnectionStatusBadge } from "@/features/shell/ConnectionStatusBadge";
import { useAgentRunLiveTerminal } from "@/features/reports/hooks/public-api/presentation";

interface AgentRunLiveTerminalProps {
  readonly runId: string;
}

export default function AgentRunLiveTerminal({
  runId,
}: AgentRunLiveTerminalProps) {
  const { output, pendingInput, submitInput, dismissInput } =
    useAgentRunLiveTerminal(runId, true);
  const { connectionStatus } = useAgentWitchDashboard();
  const [response, setResponse] = useState("");
  const isLiveConnected = connectionStatus === "connected";
  const waitingLabel = isLiveConnected
    ? "Waiting for agent output…"
    : "Reconnecting to your computer… Live output resumes when AgentWitch connects.";

  return (
    <section className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-medium text-awc-fg dark:text-white/90">
          Live terminal
        </h2>
        <ConnectionStatusBadge status={connectionStatus} />
      </div>
      <LocalTerminalPre className="mt-2 max-h-80">
        {output.length > 0 ? output : waitingLabel}
      </LocalTerminalPre>
      {pendingInput !== null ? (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-awc-fg dark:text-white/90">
            Agent needs your input
          </p>
          <p className="mt-2 text-sm text-awc-fg dark:text-gray-300">
            {pendingInput.question}
          </p>
          <label className="mt-3 block text-sm text-awc-fg dark:text-gray-300">
            Your answer
            <textarea
              value={response}
              onChange={(event) => {
                setResponse(event.target.value);
              }}
              rows={3}
              className="mt-2 w-full rounded-lg border border-awc-border px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
            />
          </label>
          <div className="mt-3 flex flex-wrap justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                dismissInput();
                setResponse("");
              }}
            >
              Later
            </Button>
            <Button
              disabled={response.trim().length === 0}
              onClick={() => {
                submitInput(response);
                setResponse("");
              }}
            >
              Send answer and continue
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
