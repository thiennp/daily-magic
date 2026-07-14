"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";

interface AgentLiveTerminalInputFormProps {
  readonly request: AgentRunInputRequest;
  readonly onSubmitInput: (response: string) => void;
  readonly onDismissInput: () => void;
}

export default function AgentLiveTerminalInputForm({
  request,
  onSubmitInput,
  onDismissInput,
}: AgentLiveTerminalInputFormProps) {
  const [response, setResponse] = useState("");

  return (
    <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
        Your Mac agent needs input
      </p>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
        {request.question}
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
  );
}
