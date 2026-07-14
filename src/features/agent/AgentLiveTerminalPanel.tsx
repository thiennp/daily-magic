"use client";

import { useEffect, useRef, useState } from "react";

import { APP_SURFACE_BASH_TERMINAL_PRE_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import Button from "@/components/ui/button/Button";
import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";

const statusLabel: Record<AgentLiveTerminalStatus, string> = {
  idle: "Idle",
  starting: "Starting…",
  waiting_approval: "Waiting for approval",
  streaming: "Live",
  finished: "Finished",
};

interface AgentLiveTerminalPanelProps {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly pendingInput: AgentRunInputRequest | null;
  readonly onSubmitInput: (response: string) => void;
  readonly onDismissInput: () => void;
}

export default function AgentLiveTerminalPanel({
  output,
  status,
  pendingInput,
  onSubmitInput,
  onDismissInput,
}: AgentLiveTerminalPanelProps) {
  const outputRef = useRef<HTMLPreElement>(null);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const element = outputRef.current;
    if (element !== null) {
      element.scrollTop = element.scrollHeight;
    }
  }, [output]);

  const displayOutput =
    output.length > 0 ? output : "$ send a task to stream output from your Mac";

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
          Local Mac terminal
        </h2>
        <span className="rounded-full bg-zinc-800 px-2.5 py-1 font-mono text-[11px] text-zinc-200">
          {statusLabel[status]}
        </span>
      </div>
      <div className="mt-3 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-950 shadow-sm">
        <div className="border-b border-zinc-800 px-3 py-2 font-mono text-[11px] text-zinc-400">
          agent-witch@mac — bash — live stream
        </div>
        <pre
          ref={outputRef}
          className={`${APP_SURFACE_BASH_TERMINAL_PRE_CLASS} max-h-96 min-h-48 border-0 rounded-none`}
        >
          {displayOutput}
        </pre>
      </div>
      {pendingInput !== null ? (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            Your Mac agent needs input
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
              className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 font-mono text-sm dark:border-gray-700 dark:bg-gray-900"
            />
          </label>
          <div className="mt-3 flex flex-wrap justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                onDismissInput();
                setResponse("");
              }}
            >
              Later
            </Button>
            <Button
              disabled={response.trim().length === 0}
              onClick={() => {
                onSubmitInput(response);
                setResponse("");
              }}
            >
              Send answer
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
