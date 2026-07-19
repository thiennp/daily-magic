"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import AgentRunPartialOutputPreview from "@/features/dispatch/AgentRunPartialOutputPreview";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/dispatchApprovalSocket";

interface AgentRunInputModalProps {
  readonly request: AgentRunInputRequest;
  readonly onSubmit: (response: string) => void;
  readonly onDismiss: () => void;
}

export default function AgentRunInputModal({
  request,
  onSubmit,
  onDismiss,
}: AgentRunInputModalProps) {
  const [response, setResponse] = useState("");

  return (
    <Modal
      isOpen
      onClose={onDismiss}
      showCloseButton={false}
      className="max-w-lg p-6"
    >
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Agent needs your input
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Your Mac paused this job until you answer. The run stays{" "}
        <span className="font-medium">running</span> in job history.
      </p>
      <p className="mt-4 text-sm font-medium text-gray-800 dark:text-white/90">
        {request.question}
      </p>
      {request.partialOutput.length > 0 ? (
        <AgentRunPartialOutputPreview partialOutput={request.partialOutput} />
      ) : null}
      <label className="mt-4 block text-sm text-gray-700 dark:text-gray-300">
        Your answer
        <textarea
          value={response}
          onChange={(event) => {
            setResponse(event.target.value);
          }}
          rows={4}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
        />
      </label>
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <Button variant="outline" onClick={onDismiss}>
          Later
        </Button>
        <Button
          disabled={response.trim().length === 0}
          onClick={() => {
            onSubmit(response);
          }}
        >
          Send answer and continue
        </Button>
      </div>
    </Modal>
  );
}
