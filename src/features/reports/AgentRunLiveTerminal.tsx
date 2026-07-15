"use client";

import { useState } from "react";

import LocalTerminalPre from "@/components/surfaces/LocalTerminalPre";
import Button from "@/components/ui/button/Button";
import { useAgentRunLiveTerminal } from "@/features/reports/hooks/useAgentRunLiveTerminal";

interface AgentRunLiveTerminalProps {
  readonly runId: string;
}

export default function AgentRunLiveTerminal({
  runId,
}: AgentRunLiveTerminalProps) {
  const { output, pendingInput, submitInput, dismissInput } =
    useAgentRunLiveTerminal(runId, true);
  const [response, setResponse] = useState("");

  return (
    <section className="mt-6">
      <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
        Live terminal
      </h2>
      <LocalTerminalPre className="mt-2 max-h-80">
        {output.length > 0 ? output : "Waiting for agent output…"}
      </LocalTerminalPre>
      {pendingInput !== null ? (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            Agent needs your input
          </p>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {pendingInput.question}
          </p>
          <label className="mt-3 block text-sm text-gray-700 dark:text-gray-300">
            Your answer
            <textarea
              value={response}
              onChange={(event) => {
                setResponse(event.target.value);
              }}
              rows={3}
              className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
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
