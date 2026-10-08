"use client";

import { useMemo, useState } from "react";

import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import AgentRunInputContextSummary from "@/features/dispatch/AgentRunInputContextSummary";
import AgentRunInputQuestion from "@/features/dispatch/AgentRunInputQuestion";
import AgentRunInputQuickReplies from "@/features/dispatch/AgentRunInputQuickReplies";
import AgentRunPartialOutputPreview from "@/features/dispatch/AgentRunPartialOutputPreview";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/dispatchApprovalSocket";
import { resolveAgentRunInputQuickReplies } from "@/features/dispatch/utils/resolveAgentRunInputQuickReplies";
import { splitAgentRunInputQuestion } from "@/features/dispatch/utils/splitAgentRunInputQuestion";

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
  const questionParts = useMemo(
    () => splitAgentRunInputQuestion(request.question),
    [request.question],
  );
  const quickReplies = useMemo(
    () => resolveAgentRunInputQuickReplies(request.question),
    [request.question],
  );
  const trimmedResponse = response.trim();
  const canSubmit = trimmedResponse.length > 0;

  return (
    <Modal
      isOpen
      onClose={onDismiss}
      showCloseButton={false}
      className="max-w-xl p-6"
    >
      <h2 className="text-lg font-semibold text-awc-fg dark:text-white/90">
        Agent needs your input
      </h2>
      <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-400">
        Your computer paused this job until you answer. The run stays{" "}
        <span className="font-medium">running</span> in job history.
      </p>
      {request.context !== undefined ? (
        <AgentRunInputContextSummary context={request.context} />
      ) : null}
      <div className="mt-4 rounded-lg border border-awc-border bg-white p-3 dark:border-gray-700 dark:bg-gray-900/40">
        <p className="text-xs font-medium uppercase tracking-wide text-awc-fg-muted dark:text-gray-400">
          What we need from you
        </p>
        <AgentRunInputQuestion
          question={request.question}
          parts={questionParts}
        />
      </div>
      {request.partialOutput.length > 0 ? (
        <AgentRunPartialOutputPreview partialOutput={request.partialOutput} />
      ) : null}
      <AgentRunInputQuickReplies
        replies={quickReplies}
        selectedResponse={canSubmit ? trimmedResponse : null}
        onSelect={setResponse}
      />
      <label className="mt-4 block text-sm text-awc-fg dark:text-gray-300">
        Your answer
        <textarea
          value={response}
          onChange={(event) => {
            setResponse(event.target.value);
          }}
          rows={4}
          placeholder={
            quickReplies.length > 0
              ? "Pick a quick reply or type your own answer…"
              : "Type your answer…"
          }
          className="mt-2 w-full rounded-lg border border-awc-border px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
        />
      </label>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onDismiss}
          className="text-left text-sm text-awc-fg-muted hover:text-awc-fg dark:text-gray-400 dark:hover:text-gray-200"
        >
          <span className="font-medium">Remind me later</span>
          <span className="mt-0.5 block text-xs text-awc-fg-muted dark:text-gray-500">
            Job stays paused — answer from job history anytime.
          </span>
        </button>
        <Button
          disabled={!canSubmit}
          onClick={() => {
            onSubmit(trimmedResponse);
          }}
        >
          Send answer and continue
        </Button>
      </div>
    </Modal>
  );
}
